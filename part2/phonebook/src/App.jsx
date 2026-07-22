import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		personServices.getAll().then((persons) => setPersons(persons));
	}, []);

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
	};

	const handleDelete = (id) => {
		const filteredPerson = persons.find((item) => item.id === id);

		if (window.confirm(`Delete ${filteredPerson.name}`)) {
			personServices.deleteItem(id).then((item) => {
				setPersons(persons.filter((item) => item.id !== id));
			});
		}
	};

	const numbersToShow =
		newFilter.length > 0
			? persons.filter((person) =>
					person.name.toLowerCase().includes(newFilter.toLowerCase()),
				)
			: persons;

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter
				newFilter={newFilter}
				handleFilterChange={handleFilterChange}
			/>

			<h2>Add</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
				persons={persons}
				setPersons={setPersons}
			/>

			<h2>Numbers</h2>
			<Persons
				numbersToShow={numbersToShow}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default App;
