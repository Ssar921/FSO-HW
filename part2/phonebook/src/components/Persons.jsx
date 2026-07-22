const Persons = ({ numbersToShow, handleDelete }) => {
	return (
		<div>
			{numbersToShow.map((person) => (
				<li key={person.id}>
					{person.name} {person.number}
					<button onClick={() => handleDelete(person.id)}>
						delete
					</button>
				</li>
			))}
		</div>
	);
};

export default Persons;
