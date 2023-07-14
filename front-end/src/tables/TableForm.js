import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm() {
	const initialFormData = {
		table_name: "",
		capacity: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [reservationsError, setReservationsError] = useState(null);
	const history = useHistory();

	function cancelHandler(event) {
		history.goBack();
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}

	async function submitHandler(event) {
		setReservationsError(null);
		event.preventDefault();
		try {
			formData.capacity = Number(formData.capacity);
			await createTable(formData);
			setFormData({ ...initialFormData });
			history.push("/dashboard");
		} catch (error) {
			setReservationsError(error);
		}
	}
	return (
		<main>
			<h1>New Table</h1>
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label htmlFor="table_name">Table Name</label>
					<input
						className="form-control"
						id="table_name"
						name="table_name"
						type="text"
						onChange={handleChange}
						value={formData.table_name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="capacity">Capacity</label>
					<input
						className="form-control"
						id="capacity"
						name="capacity"
						type="number"
						onChange={handleChange}
						value={formData.capacity}
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
		</main>
	);
}
export default TableForm;
