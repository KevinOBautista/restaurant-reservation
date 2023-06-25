const knex = require("../db/connection");

function list() {
	return knex("reservations as r").select("*").orderBy("r.reservation_date");
}

function listWithQuery(date) {
	return knex("reservations as r")
		.select("*")
		.where({ "r.reservation_date": date })
		.orderBy("r.reservation_time");
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation, "*")
		.then((createdRecords) => createdRecords[0]);
}
module.exports = {
	list,
	create,
	listWithQuery,
};
