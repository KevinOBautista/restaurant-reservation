import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import TableForm from "../tables/TableForm";
import Seat from "../reservation/Seat";
import Search from "../search/Search";
import EditReservation from "../edit/EditReservation";
import CreateReservation from "../create/CreateReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	const query = useQuery();
	return (
		<Switch>
			<Route exact={true} path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route path="/tables/new">
				<TableForm />
			</Route>
			<Route path="/reservations/:reservation_id/edit">
				<EditReservation />
			</Route>
			<Route path="/reservations/:reservation_id/seat">
				<Seat />
			</Route>
			<Route path="/reservations/new">
				<CreateReservation />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route exact={true} path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route path="/dashboard">
				<Dashboard date={query.get("date") || today()} />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
