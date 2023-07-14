import React from "react";
import Reservation from "./Reservation";

function ReservationList({ reservations }) {
	const mappedReservations = reservations.map((currentReservation, index) => (
		<Reservation reservation={currentReservation} key={index} />
	));
	return (
		<div className="reservations row">
			{reservations.length > 0 && mappedReservations}
			{reservations.length === 0 && "No reservations"}
		</div>
	);
}

export default ReservationList;
