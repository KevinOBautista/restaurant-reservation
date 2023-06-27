function validTime(inputStr) {
	if (!inputStr || inputStr.length < 1) {
		return false;
	}
	var time = inputStr.split(":");
	return (
		time.length === 2 &&
		parseInt(time[0], 10) >= 0 &&
		parseInt(time[0], 10) <= 23 &&
		parseInt(time[1], 10) >= 0 &&
		parseInt(time[1], 10) <= 59
	);
}
function timeValidation(req, res, next) {
	const time = req.body.data.reservation_time;
	if (!validTime(time)) {
		const error = new Error(
			`Property 'reservation_time' must be a valid time.`
		);
		error.status = 400;
		throw error;
	}
	next();
}

module.exports = timeValidation;
