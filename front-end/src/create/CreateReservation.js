import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ReservationForm from "../reservation/ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
	const initialFormData = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
		status: "booked",
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
		<main>
			<h1 className="text-center">New Reservation</h1>
			<ReservationForm
				formData={formData}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/>
			<ErrorAlert error={reservationsError} />
		</main>
	);
}

export default CreateReservation;
