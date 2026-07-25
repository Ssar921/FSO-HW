const Persons = ({ persons, onClick }) => {
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.id}>
						{person.name} {person.number}
						<button onClick={() => onClick(person)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Persons;
