import React from "react";
import Reservation from "./Reservation";

function ReservationList({ reservations, onCancel }) {
	const mappedReservations = reservations.map((currentReservation, index) => (
		<Reservation
			reservation={currentReservation}
			key={index}
			onCancel={onCancel}
		/>
	));
	return (
		<div className="reservations row">
			{reservations.length > 0 && mappedReservations}
			{reservations.length === 0 && "No reservations found"}
		</div>
	);
}

export default ReservationList;
