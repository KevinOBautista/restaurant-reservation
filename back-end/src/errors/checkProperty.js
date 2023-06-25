function checkProperty(...properties) {
	return function (res, req, next) {
		const { data = {} } = res.body;
		try {
			properties.forEach((property) => {
				const value = data[property];
			});
		} catch (error) {
			next(error);
		}
	};
}

module.exports = checkProperty;
