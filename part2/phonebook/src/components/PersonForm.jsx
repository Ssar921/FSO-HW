const PersonForm = ({
	onSubmit,
	nameValue,
	handleNameChange,
	newNumber,
	handleNumberChange,
}) => {
	return (
		<>
			<form onSubmit={onSubmit}>
				<h2>Add</h2>
				<div>
					name:{" "}
					<input value={nameValue} onChange={handleNameChange} />
					<div>
						number:{" "}
						<input
							value={newNumber}
							onChange={handleNumberChange}
						/>
					</div>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
