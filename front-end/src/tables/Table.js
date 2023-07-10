import React from "react";

function Table({ table }) {
	const { table_id, table_name, capacity } = table;
	return (
		<div className="card text-center col-md-6" id={table_id} key={table_id}>
			<div className="card-header">
				<h4>{table_name}</h4>
			</div>
			<div className="card-body">
				<h5 className="card-title">{capacity}</h5>
				<h5 data-table-id-status={table.table_id}>
					{table.reservation_id && "Occupied"}
					{!table.reservation_id && "Free"}
				</h5>
			</div>
		</div>
	);
}

export default Table;
