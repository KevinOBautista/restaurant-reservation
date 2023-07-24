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
				<h5>{table_name}</h5>
			</div>
			<div className="card-body row justify-content-between">
				<h5 className="card-title col">Capacity: {capacity}</h5>
				<div className="col">
					{reservation_id && (
						<h5 className="text-danger" data-table-id-status={table_id}>
							occupied
						</h5>
					)}
					{!reservation_id && (
						<h5 className="text-success" data-table-id-status={table_id}>
							free
						</h5>
					)}
				</div>
			</div>
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
	);
}

export default Table;
