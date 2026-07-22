import personServices from "../services/persons";

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

	const clearInputs = () => {
		setNewName("");
		setNewNumber("");
	};

	const addPerson = (event) => {
		event.preventDefault();

		const existingPerson = persons.find(
			(person) => person.name === newName,
		);

		const newPerson = { name: newName, number: newNumber };

		const confirmPrompt = `${newName} is already added to phonebook, replace the old number with a new one?`;

		if (existingPerson) {
			if (window.confirm(confirmPrompt)) {
				personServices
					.update(existingPerson.id, newPerson)
					.then((response) =>
						setPersons(
							persons.map((person) =>
								person.id === response.id ? response : person,
							),
						),
					);
			}
			clearInputs();
			return;
		}

		personServices.create(newPerson).then((newPersons) => {
			setPersons(persons.concat(newPersons));
			clearInputs();
		});
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
