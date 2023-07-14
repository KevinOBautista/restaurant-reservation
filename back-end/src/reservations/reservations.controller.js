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
const hasStatus = hasProperties("status");

async function reservationExists(req, res, next) {
	const { reservation_id } = req.params;
	let reservation = await service.read(reservation_id);
	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	return next({
		status: 404,
		message: `Reservation ${reservation_id} cannot be found.`,
	});
}

function createStatusVal(req, res, next) {
	const { status } = req.body.data;
	if (status) {
		if (status !== "booked") {
			const error = new Error(
				`${status} is not allowed, status must be only 'booked'`
			);
			error.status = 400;
			throw error;
		}
	}
	next();
}

function statusVal2(req, res, next) {
	const status = req.body.data.status;
	const reservation = res.locals.reservation;
	if (reservation.status === "finished") {
		const error = new Error(`Reservation is '${reservation.status}'`);
		error.status = 400;
		throw error;
	}
	if (status == "booked" || status == "seated" || status == "finished") {
		next();
	} else {
		const error = new Error(
			`${status} is not allowed change to either 'booked' or 'seated'`
		);
		error.status = 400;
		throw error;
	}
}

function read(req, res) {
	res.json({ data: res.locals.reservation });
}

async function list(req, res) {
	if (req.query.date) {
		const data = await service.listWithQuery(req.query.date);
		res.json({ data });
	} else if (req.query.mobile_number) {
		const data = await service.search(req.query.mobile_number);
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

async function update(req, res) {
	const updatedReservation = {
		...res.locals.reservation,
		...req.body.data,
	};
	let data = await service.update(updatedReservation);
	data = data[0];
	res.json({ data });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(hasCheckedProperties),
		asyncErrorBoundary(timeValidation),
		asyncErrorBoundary(tuesdayVal),
		asyncErrorBoundary(pastReservation),
		asyncErrorBoundary(createStatusVal),
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
	update: [
		asyncErrorBoundary(hasStatus),
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(statusVal2),
		asyncErrorBoundary(update),
	],
};
