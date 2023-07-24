import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchPhoneNumber } from "../utils/api";
import ReservationList from "../reservation/ReservationList";

function Search() {
	const initialFormData = {
		mobile_number: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [searched, setSearched] = useState(false);

	function submitHandler(event) {
		setReservationsError(null);
		event.preventDefault();
		searchPhoneNumber(formData.mobile_number)
			.then(setReservations)
			.catch(setReservationsError);
		setSearched(true);
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}
	return (
		<main className="text-center">
			<h1>Search</h1>
			<form
				onSubmit={submitHandler}
				className="row mb-3 justify-content-center"
			>
				<div className="mb-3 col-6">
					<label htmlFor="mobile_number">Mobile Number</label>
					<input
						className="form-control"
						id="mobile_number"
						name="mobile_number"
						type="tel"
						onChange={handleChange}
						value={formData.mobile_number}
						placeholder="Enter a customer's phone number"
					/>
				</div>
				<button type="submit" className="btn btn-primary col-2 my-3">
					<span className="oi oi-magnifying-glass" />
					Find
				</button>
			</form>
			{searched && <ReservationList reservations={reservations} />}
			<ErrorAlert error={reservationsError} />
		</main>
	);
}

export default Search;
