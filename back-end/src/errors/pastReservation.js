function asDateString(date) {
	return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
		.toString(10)
		.padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}
function pastReservation(req, res, next) {
	const date = req.body.data.reservation_date.split("-");
	const todays = asDateString(new Date()).split("-");
	const error = new Error(`'reservation_date' must be in the future.`);
	error.status = 400;
	const dateTest = new Date();
	console.log("DateTest: ", dateTest);
	date.forEach((section, index) => {
		if (section < todays[index]) {
			throw error;
		}
	});
	next();
}

module.exports = pastReservation;
