/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
	"first_name",
	"last_name",
	"mobile_number",
	"reservation_date",
	"reservation_time",
	"people"
);
const checkProperty = require("../errors/checkProperty");
const hasCheckedProperties = checkProperty(
	["date", "number"],
	["reservation_date", "people"]
);
const timeValidation = require("../errors/timeValidation");

async function list(req, res) {
	if (req.query.date) {
		const data = await service.listWithQuery(req.query.date);
		res.json({ data });
	} else {
		const data = await service.list();
		res.json({ data });
	}
}

async function create(req, res) {
	const createdReservation = await service.create(req.body.data);
	res.status(201).json({ data: createdReservation });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(hasCheckedProperties),
		asyncErrorBoundary(timeValidation),
		asyncErrorBoundary(create),
	],
};
