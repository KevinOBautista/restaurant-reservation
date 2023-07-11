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
const pastReservation = require("../errors/pastReservation");
const tuesdayVal = require("../errors/tuesdayVal");

async function reservationExists(req, res, next) {
	const { reservation_id } = req.params;
	let reservation = await service.read(reservation_id);
	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	return next({ status: 404, message: `Reservation cannot be found.` });
}

function read(req, res) {
	res.json({ data: res.locals.reservation });
}

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
	const newReservation = ({
		first_name,
		last_name,
		mobile_number,
		reservation_date,
		reservation_time,
		people,
	} = req.body.data);
	const createdReservation = await service.create(req.body.data);
	res.status(201).json({ data: createdReservation });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(hasCheckedProperties),
		asyncErrorBoundary(timeValidation),
		asyncErrorBoundary(tuesdayVal),
		asyncErrorBoundary(pastReservation),
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
