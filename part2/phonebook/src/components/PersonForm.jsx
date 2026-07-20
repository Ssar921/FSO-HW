const PersonForm = ({
	newName,
	newNumber,
	setNewName,
	setNewNumber,
	setPersons,
	persons,
}) => {
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();

		const existingPerson = persons.find(
			(person) => person.name === newName,
		);

		if (existingPerson) {
			window.alert(`${newName} is already added to phonebook`);
			return;
		}
		const newPerson = { name: newName, number: newNumber };
		setPersons(persons.concat(newPerson));
		setNewName("");
	};

	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
