function dateValidation(inputDate, time) {
	const now = new Date();
	const pastDate = new Date(`${inputDate}T${time}:00`);

	if (now > pastDate) {
		return true;
	} else {
		return false;
	}
}
function pastReservation(req, res, next) {
	const date = req.body.data.reservation_date;
	const time = req.body.data.reservation_time;
	const error = new Error(
		`'reservation_date' and 'reservation_time' must be in the future.`
	);
	error.status = 400;
	if (dateValidation(date, time)) {
		throw error;
	}
	next();
}

module.exports = pastReservation;
