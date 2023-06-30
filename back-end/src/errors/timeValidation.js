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
function closedTime(inputTime) {
	const time = inputTime.split(":");
	if (time[0] < 10 || (time[0] == 10 && time[1] < 30)) {
		return true;
	} else if (time[0] > 21 || (time[0] == 21 && time[1] > 30)) {
		return true;
	} else {
		return false;
	}
}
function timeValidation(req, res, next) {
	const time = req.body.data.reservation_time;
	const splittedTime = time.split(":");
	if (!validTime(time)) {
		const error = new Error(
			`Property 'reservation_time' must be a valid time.`
		);
		error.status = 400;
		throw error;
	}
	if (closedTime(time)) {
		const error = new Error(
			`Property 'reservation_time' must be between 10:30AM and 9:30PM.`
		);
		error.status = 400;
		throw error;
	}
	next();
}

console.log(closedTime("21:31"));
module.exports = timeValidation;
