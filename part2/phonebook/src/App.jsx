import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const fetchInfo = () => {
		axios
			.get("http://localhost:3001/persons")
			.then((response) => setPersons(response.data));
	};

	useEffect(fetchInfo, []);

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
