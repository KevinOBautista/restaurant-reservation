/**
 * List handler for tables resources
 */

const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasReservationProp = hasProperties("reservation_id");
const checkProperty = require("../errors/checkProperty");
const hasCheckedProperties = checkProperty(["number"], ["capacity"]);

function tableVal(req, res, next) {
	const { table_name, capacity } = req.body.data;
	if (table_name.length < 2) {
		const error = new Error(`'table_name' length must be greater than 2`);
		error.status = 400;
		throw error;
	}
	if (capacity < 1) {
		const error = new Error(`'capacity' must be greater than 1`);
		error.status = 400;
		throw error;
	}
	next();
}

async function checkTable(req, res, next) {
	const reservation_id = req.body.data.reservation_id;
	const reservation = await service.readReservation(reservation_id);
	console.log("Reservation: ", reservation);
	if (!reservation) {
		return next({
			status: 404,
			message: `Reservation ${reservation_id} cannot be found.`,
		});
	}
	const table = res.locals.table;
	if (table.capacity < reservation.people) {
		const error = new Error(
			`table capacity is ${table.capacity} cannot seat ${reservation.people} people.`
		);
		error.status = 400;
		throw error;
	}
	if (table.occupied) {
		const error = new Error(`Table is occupied`);
		error.status = 400;
		throw error;
	}
	next();
}

async function tableExists(req, res, next) {
	const { table_id } = req.params;
	let table = await service.read(table_id);
	if (table) {
		res.locals.table = table;
		return next();
	}
	return next({ status: 404, message: `Table cannot be found.` });
}

async function read(req, res) {
	res.json({ data: res.locals.table });
}

async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res) {
	const createdTable = await service.create(req.body.data);
	res.status(201).json({ data: createdTable });
}

async function update(req, res) {
	const updatedTable = {
		...res.locals.table,
		...req.body.data,
		occupied: true,
	};
	const data = await service.update(updatedTable);
	res.json({ data });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(hasCheckedProperties),
		asyncErrorBoundary(tableVal),
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(hasReservationProp),
		asyncErrorBoundary(tableExists),
		asyncErrorBoundary(checkTable),
		asyncErrorBoundary(update),
	],
	read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
