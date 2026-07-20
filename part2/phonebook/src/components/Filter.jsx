const Filter = ({ newFilter, handleFilterChange }) => {
	return (
		<div>
			find people:{" "}
			<input value={newFilter} onChange={handleFilterChange} />
		</div>
	);
};

export default Filter;
