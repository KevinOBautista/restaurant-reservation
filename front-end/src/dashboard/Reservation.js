import React from "react";

function Reservation({ reservation }) {
	const {
		reservation_id,
		first_name,
		last_name,
		mobile_number,
		reservation_time,
		people,
	} = reservation;
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
			</div>
		</div>
	);
}

export default Reservation;
