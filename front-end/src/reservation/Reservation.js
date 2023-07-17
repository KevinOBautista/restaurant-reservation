import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Reservation({ reservation, onCancel }) {
	const {
		reservation_id,
		first_name,
		last_name,
		mobile_number,
		reservation_time,
		people,
		status,
	} = reservation;
	function cancel() {
		const result = window.confirm(
			"Do you want to cancel this reservation? This cannot be undone."
		);
		if (result) {
			onCancel(reservation_id);
		}
	}
	return (
		<div
			className="card text-center col-md-6"
			id={reservation_id}
			key={reservation_id}
		>
			<div className="card-header">
				<h4>
					{first_name} {last_name}
				</h4>
			</div>
			<div className="card-body">
				<h5 className="card-title">{reservation_time}</h5>
				<p className="card-text">Party Size: {people}</p>
				<p className="card-text">{mobile_number}</p>
				<h4 data-reservation-id-status={reservation_id}>{status}</h4>
			</div>
			{status !== "cancelled" && (
				<button
					className="btn btn-danger mb-2"
					onClick={cancel}
					data-reservation-id-cancel={reservation_id}
				>
					Cancel
				</button>
			)}

			<Link
				className="btn btn-secondary mb-2"
				to={`/reservations/${reservation_id}/edit`}
			>
				Edit
			</Link>
			{status === "booked" && (
				<Link
					className="btn btn-primary mb-2"
					to={`/reservations/${reservation_id}/seat`}
				>
					Seat
				</Link>
			)}
		</div>
	);
}

export default Reservation;
