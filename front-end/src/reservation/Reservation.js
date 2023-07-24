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
			className="card col-md-6 text-center"
			id={reservation_id}
			key={reservation_id}
		>
			<div className="card-header text-center">
				<h4>
					{first_name} {last_name}
				</h4>
			</div>
			<div className="card-body">
				<div>
					<h5 className="card-title">
						<span className="oi oi-clock" /> {reservation_time}
					</h5>
				</div>
				<p className="card-text">Party Size: {people}</p>
				<p className="card-text">
					<span className="oi oi-phone" /> {mobile_number}
				</p>
				<div>
					{status === "booked" && (
						<h4
							className="text-primary"
							data-reservation-id-status={reservation_id}
						>
							{status}
						</h4>
					)}
					{status === "seated" && (
						<h4
							className="text-success"
							data-reservation-id-status={reservation_id}
						>
							{status}
						</h4>
					)}
					{status === "cancelled" && (
						<h4
							className="text-danger"
							data-reservation-id-status={reservation_id}
						>
							{status}
						</h4>
					)}
					{status === "finished" && (
						<h4
							className="text-secondary"
							data-reservation-id-status={reservation_id}
						>
							{status}
						</h4>
					)}
				</div>
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
