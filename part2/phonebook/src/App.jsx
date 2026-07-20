import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
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
			<Persons numbersToShow={numbersToShow} />
		</div>
	);
};

export default App;
