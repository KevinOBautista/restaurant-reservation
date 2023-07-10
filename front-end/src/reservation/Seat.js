import React, { useEffect, useState } from "react";
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservation } from "../utils/api";
function Seat() {
	const initialFormData = {
		table_id: "1",
	};
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
	const [formData, setFormData] = useState(initialFormData);
	const history = useHistory();
	const params = useParams();
	useEffect(loadTables, []);
	const optionsMapped = tables.map((table) => {
		return (
			<option key={table.table_id} value={table.table_id}>
				{table.table_name} - {table.capacity}
			</option>
		);
	});
	function loadTables() {
		const abortController = new AbortController();
		setTablesError(null);
		listTables(abortController.signal).then(setTables).catch(setTablesError);
		return () => abortController.abort();
	}
	function cancelHandler(event) {
		history.goBack();
	}
	async function submitHandler(event) {
		event.preventDefault();
		setTablesError(null);
		try {
			formData.table_id = Number(formData.table_id);
			console.log("Submitted with: ", formData);
			await updateReservation(params.reservation_id, formData.table_id);
			setFormData({ ...initialFormData });
			history.push("/dashboard");
		} catch (error) {
			setTablesError(error);
		}
	}
	function handleChange({ target }) {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	}
	return (
		<main>
			<h1>Seat Reservation: {params.reservation_id}</h1>
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label htmlFor="table_id">Table Number: </label>
					<select
						id="table_id"
						name="table_id"
						onChange={handleChange}
						value={formData.table_id}
					>
						{optionsMapped}
					</select>
				</div>
				<button onClick={cancelHandler} className="btn btn-secondary mr-2">
					Cancel
				</button>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
			<ErrorAlert error={tablesError} />
		</main>
	);
}

export default Seat;
