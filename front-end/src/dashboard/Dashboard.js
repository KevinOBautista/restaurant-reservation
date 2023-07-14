import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
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
	function onFinish(table_id) {
		finishTable(table_id).then(loadDashboard).catch(setTablesError);
	}
	return (
		<main>
			<h1>Dashboard</h1>
			<div className="row">
				<div className="col">
					<div className="d-md-flex mb-3">
						<h4 className="box-title mb-0">Reservations for {date}</h4>
					</div>
					<ErrorAlert error={reservationsError} />
					<DateButtons
						previous={`/dashboard?date=${previous(date)}`}
						today={`/dashboard?date=${today()}`}
						next={`/dashboard?date=${next(date)}`}
					/>
					<ReservationList reservations={reservations} />
				</div>
				<div className="col-md-6">
					<TableList onFinish={onFinish} tables={tables} />
					<ErrorAlert error={tablesError} />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
