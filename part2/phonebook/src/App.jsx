import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServices from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [message, setMessage] = useState(null);
	const [messageType, setMessageType] = useState("success");

	useEffect(() => {
		personServices.getAll().then((response) => setPersons(response));
	}, []);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();

		const existingPerson = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase(),
		);

		const confirmPrompt = `${newName} is already added to phonebook, replace the old number with a new one?`;

		if (existingPerson) {
			if (window.confirm(confirmPrompt)) {
				const editedPerson = { name: newName, number: newNumber };
				setPersons(
					persons.map((person) =>
						person.id === existingPerson.id ? editedPerson : person,
					),
				);
				showMessage(`Edited ${newName}'s number.`, "success");
			}
		} else {
			const newPerson = { name: newName, number: newNumber };
			personServices
				.create(newPerson)
				.then((person) => setPersons(persons.concat(person)));
			showMessage(`Added ${newName}.`, "success");
		}

		resetForm();
	};

	const personsToShow =
		filter.length > 0
			? persons.filter((person) =>
					person.name.toLowerCase().includes(filter.toLowerCase()),
				)
			: persons;

	const resetForm = () => {
		setNewName("");
		setNewNumber("");
	};

	const showMessage = (info, infoType) => {
		setMessage(info);
		setMessageType(infoType);
		setTimeout(() => setMessage(null), 5000);
	};

	const deletePerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			personServices
				.deletePerson(person.id)
				.then((response) =>
					setPersons(
						persons.filter((person) => person.id !== response.id),
					),
				)
				.catch((error) =>
					showMessage(
						`Information of ${newName} has already been removed from server`,
						"error",
					),
				);
		} else {
			return;
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} messageType={messageType} />

			<Filter value={filter} onChange={handleFilter} />

			<PersonForm
				onSubmit={addPerson}
				nameValue={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

			<Persons persons={personsToShow} onClick={deletePerson} />
		</div>
	);
};

export default App;
