import React from "react";
import Table from "./Table";

function TableList({ tables }) {
	const mappedTables = tables.map((table, index) => (
		<Table table={table} key={index} />
	));

	return (
		<div className="tables row ">
			{mappedTables.length > 0 && mappedTables}
			{mappedTables.length === 0 && "No Tables"}
		</div>
	);
}

export default TableList;