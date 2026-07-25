const Filter = ({ value, onChange }) => {
	return (
		<>
			find: <input value={value} onChange={onChange} />
		</>
	);
};

export default Filter;
