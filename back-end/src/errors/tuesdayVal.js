function tuesdayVal(req, res, next) {
	const date = new Date(req.body.data.reservation_date);
	const dayOfWeek = date.getDay();
	if (dayOfWeek === 1) {
		const error = new Error(`We are closed on tuesdays.`);
		error.status = 400;
		throw error;
	}
	next();
}

module.exports = tuesdayVal;
