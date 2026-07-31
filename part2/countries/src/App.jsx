import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Countries from "./components/Countries";
import Weather from "./components/Weather";

const App = () => {
	const [query, setQuery] = useState("");
	const [country, setCountry] = useState(null);
	const [countries, setCountries] = useState([]);
	const [list, setList] = useState([]);
	const [message, setMessage] = useState(null);

	const handleInput = (event) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => setCountries(response.data));
	}, []);

	useEffect(() => {
		setMessage(null);
		if (query.length === 0) {
			return;
		}

		const filteredCountries = countries.filter((country) =>
			country.name.common.toLowerCase().includes(query.toLowerCase()),
		);

		if (filteredCountries.length === 1) {
			setCountry(filteredCountries[0]);
			setList([]);
		} else if (filteredCountries.length <= 10) {
			setList(filteredCountries);
			setCountry(null);
		} else {
			setCountry(null);
			setList([]);
			setMessage(
				"too many matches, specify another filter",
				filteredCountries.length,
			);
		}
	}, [query]);

	const showCountryInfo = (ccn3) => {
		const filtered = list.filter((country) => country.ccn3 === ccn3);
		setCountry(filtered[0]);
	};

	return (
		<>
			<div>
				<Weather />
				find countries <input value={query} onChange={handleInput} />
				<p>{message ? message : null}</p>
				<Countries list={list} onClick={showCountryInfo} />
				{country && <Country country={country} />}
			</div>
		</>
	);
};
export default App;
