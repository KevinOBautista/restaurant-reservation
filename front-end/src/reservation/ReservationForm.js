import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
	const initialFormData = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [reservationsError, setReservationsError] = useState(null);
	const history = useHistory();

	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}
	function cancelHandler(event) {
		history.goBack();
	}
	async function submitHandler(event) {
		setReservationsError(null);
		event.preventDefault();
		try {
			const date = formData.reservation_date;
			formData.people = Number(formData.people);
			await createReservation(formData);
			setFormData({ ...initialFormData });
			history.push(`/dashboard?date=${date}`);
		} catch (error) {
			setReservationsError(error);
		}
	}
	return (
		<div className="createReservation">
			<h1>New Reservation</h1>
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label htmlFor="first_name">First Name</label>
					<input
						className="form-control"
						id="first_name"
						name="first_name"
						type="text"
						onChange={handleChange}
						value={formData.first_name}
						placeholder="Ex: John"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="last_name">Last Name</label>
					<input
						className="form-control"
						id="last_name"
						name="last_name"
						type="text"
						onChange={handleChange}
						value={formData.last_name}
						placeholder="Ex: Doe"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="mobile_number">Mobile Number</label>
					<input
						className="form-control"
						id="mobile_number"
						name="mobile_number"
						type="tel"
						onChange={handleChange}
						value={formData.mobile_number}
						placeholder="XXX-XXX-XXXX"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="reservation_date">Reservation Date</label>
					<input
						className="form-control"
						id="reservation_date"
						name="reservation_date"
						type="date"
						onChange={handleChange}
						value={formData.reservation_date}
						placeholder="YYYY-MM-DD"
						pattern="\d{4}-\d{2}-\d{2}"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="reservation_time">Reservation Time</label>
					<input
						className="form-control"
						id="reservation_time"
						name="reservation_time"
						type="time"
						onChange={handleChange}
						value={formData.reservation_time}
						placeholder="HH:MM"
						pattern="[0-9]{2}:[0-9]{2}"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="people">People</label>
					<input
						className="form-control"
						id="people"
						name="people"
						type="number"
						onChange={handleChange}
						value={formData.people}
						placeholder="Ex: 3"
					/>
				</div>
				<ErrorAlert error={reservationsError} />
				<button onClick={cancelHandler} className="btn btn-secondary mr-2">
					Cancel
				</button>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default ReservationForm;
