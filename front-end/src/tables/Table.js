import React from "react";

function Table({ table, onFinish }) {
	const { table_id, table_name, capacity, reservation_id } = table;
	function finish() {
		const result = window.confirm(
			"Is this table ready to seat new guests?This cannot be undone."
		);
		if (result) {
			onFinish(table_id);
		}
	}
	return (
		<div className="card text-center col-md-6" id={table_id} key={table_id}>
			<div className="card-header">
				<h4>{table_name}</h4>
			</div>
			<div className="card-body">
				<h5 className="card-title">Size: {capacity}</h5>
				<h5 data-table-id-status={table_id}>
					{reservation_id && "occupied"}
					{!reservation_id && "free"}
				</h5>
				{reservation_id && (
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
