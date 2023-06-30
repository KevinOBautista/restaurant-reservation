function checkProperty(types, properties) {
	return function (res, req, next) {
		const { data = {} } = res.body;
		try {
			properties.forEach((property, index) => {
				let value = data[property];
				if (types[index] === "number") {
					if (typeof value !== "number") {
						const error = new Error(`Property '${property}' must be a number.`);
						error.status = 400;
						throw error;
					}
				} else if (types[index] === "date") {
					const isDateValid = !isNaN(Date.parse(value));
					if (!isDateValid) {
						const error = new Error(
							`Property '${property}' must be a valid date.`
						);
						error.status = 400;
						throw error;
					}
				}
			});
			next();
		} catch (error) {
			next(error);
		}
	};
}

module.exports = checkProperty;
