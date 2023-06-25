const knex = require("../db/connection");

function list() {
	return knex("reservations").select("*");
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation, "*")
		.then((createdRecords) => createdRecords[0]);
}
module.exports = {
	list,
	create,
};
