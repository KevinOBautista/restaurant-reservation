import React from "react";

function Table({ table, onFinish }) {
	const { table_id, table_name, capacity, occupied, reservation_id } = table;
	function finish() {
		const result = window.confirm(
			"Is this table ready to seat new guests? \n This cannot be undone."
		);
		if (result) {
			onFinish(table_id, reservation_id);
		}
	}
	return (
		<div className="card text-center col-md-6" id={table_id} key={table_id}>
			<div className="card-header">
				<h4>{table_name}</h4>
			</div>
			<div className="card-body">
				<h5 className="card-title">{capacity}</h5>
				<h5 data-table-id-status={table_id}>
					{occupied && "occupied"}
					{!occupied && "free"}
				</h5>
				{occupied && (
					<button
						type="button"
						className="btn btn-primary"
						data-table-id-finish={table_id}
						onClick={finish}
					>
						Finish
					</button>
				)}
			</div>
		</div>
	);
}

export default Table;
