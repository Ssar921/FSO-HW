const Countries = ({ list, onClick }) => {
	return (
		<div>
			{list.map((country) => (
				<li key={country.ccn3}>
					{country.name.common}{" "}
					<button onClick={() => onClick(country.ccn3)}>Show</button>
				</li>
			))}
		</div>
	);
};
export default Countries;
