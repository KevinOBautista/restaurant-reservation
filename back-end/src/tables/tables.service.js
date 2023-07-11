const knex = require("../db/connection");

function read(tableId) {
	return knex("tables").select("*").where({ table_id: tableId }).first();
}

function list() {
	return knex("tables as t").select("*").orderBy("t.table_name");
}

function create(table) {
	return knex("tables")
		.insert(table, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(table) {
	return knex("tables").where({ table_id: table.table_id }).update(table, "*");
}

function readReservation(reservationId) {
	return knex("reservations").where({ reservation_id: reservationId }).first();
}
module.exports = {
	list,
	create,
	update,
	read,
	readReservation,
};
