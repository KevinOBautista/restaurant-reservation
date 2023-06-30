function asDateString(date) {
	return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
		.toString(10)
		.padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}
function dateValidation(inputDate) {
	const date = inputDate.split("-");
	const todays = asDateString(new Date()).split("-");

	if (date[0] < todays[0]) {
		return true;
	} else if (date[1] < todays[1]) {
		return true;
	} else if (date[1] == todays[1]) {
		if (date[2] < todays[2]) {
			return true;
		}
	} else {
		return false;
	}
}
function pastReservation(req, res, next) {
	const date = req.body.data.reservation_date;
	const error = new Error(`'reservation_date' must be in the future.`);
	error.status = 400;
	if (dateValidation(date)) {
		throw error;
	}
	next();
}

module.exports = pastReservation;
