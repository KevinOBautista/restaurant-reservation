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

// function checkProperty(req, res, next) {
// 	const { data = {} } = req.body;
// 	console.log("***************", typeof data[people], "***************");
// 	try {
// 		if (typeof data[people] !== "number") {
// 			const error = new Error(`Property people is not a number`);
// 			error.status = 400;
// 			throw error;
// 		}
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// 	// if(typeof propertyName !== type){
// 	//   const error = new Error(`${propertyName} is not type ${type}`)
// 	//   error.status = 400
// 	//   throw error
// 	// }
// }

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
	create: [hasRequiredProperties, asyncErrorBoundary(create)],
};
