const knex = require("../db/connection");

function read(reservationId) {
	return knex("reservations").where({ reservation_id: reservationId }).first();
}

function list() {
	return knex("reservations as r")
		.whereNot("status", "finished")
		.orderBy("r.reservation_date");
}

function listWithQuery(date) {
	return knex("reservations as r")
		.select("*")
		.where({ "r.reservation_date": date })
		.andWhereNot("status", "finished")
		.orderBy("r.reservation_time");
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(reservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: reservation.reservation_id })
		.update(reservation, "*");
}
module.exports = {
	list,
	create,
	listWithQuery,
	read,
	update,
};
