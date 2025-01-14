import React, { useEffect, useState } from "react";
import {
	listReservations,
	listTables,
	finishTable,
	updateReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";
import ReservationList from "../reservation/ReservationList";
import DateButtons from "./DateButtons";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tablesError, setTablesError] = useState(null);
	const [tables, setTables] = useState([]);
	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		setTablesError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		listTables(abortController.signal).then(setTables).catch(setTablesError);
		return () => abortController.abort();
	}

	function onCancel(reservation_id) {
		const abortController = new AbortController();
		updateReservation(reservation_id, "cancelled", abortController.signal)
			.then(loadDashboard)
			.catch(setReservationsError);

		return () => abortController.abort();
	}

	function onFinish(table_id) {
		finishTable(table_id).then(loadDashboard).catch(setTablesError);
	}
	return (
		<main>
			<div className="header text-center">
				<h1 className="">Dashboard</h1>
				<DateButtons
					previous={`/dashboard?date=${previous(date)}`}
					today={`/dashboard?date=${today()}`}
					next={`/dashboard?date=${next(date)}`}
				/>
			</div>
			<div className="row">
				<div className="col">
					<h4 className="box-title mb-0 text-center">
						Reservations for: {date}
					</h4>
					<ErrorAlert error={reservationsError} />
					<ReservationList reservations={reservations} onCancel={onCancel} />
				</div>
				<div className="col-md-6">
					<h4 className="box-title mb-0 text-center">Tables</h4>
					<TableList onFinish={onFinish} tables={tables} />
					<ErrorAlert error={tablesError} />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
