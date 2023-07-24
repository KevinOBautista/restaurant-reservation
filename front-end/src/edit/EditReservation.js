import React, { useEffect, useState } from "react";
import ReservationForm from "../reservation/ReservationForm";
import {
	useParams,
	useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { readReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
	const initialFormData = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
		status: "booked",
	};
	const [reservation, setReservation] = useState(initialFormData);
	const [reservationsError, setReservationsError] = useState(null);
	const { reservation_id } = useParams();
	const history = useHistory();
	useEffect(loadReservation, [reservation_id]);

	function loadReservation() {
		const abortController = new AbortController();
		setReservationsError(null);
		readReservation(reservation_id)
			.then(setReservation)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	function handleChange({ target }) {
		setReservation({
			...reservation,
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
			const date = reservation.reservation_date.substring(0, 10);
			reservation.people = Number(reservation.people);
			reservation.reservation_time = reservation.reservation_time.substring(
				0,
				5
			);
			await editReservation(reservation);
			history.push(`/dashboard?date=${date}`);
		} catch (error) {
			setReservationsError(error);
		}
	}
	return (
		<main>
			<h1 className="text-center">Edit Reservation</h1>
			<ReservationForm
				formData={reservation}
				handleChange={handleChange}
				submitHandler={submitHandler}
				cancelHandler={cancelHandler}
			/>
			<ErrorAlert error={reservationsError} />
		</main>
	);
}

export default EditReservation;
