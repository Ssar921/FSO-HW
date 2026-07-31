import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
	const languages = Object.values(country.languages);
	const latlng = country.capitalInfo.latlng;
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,is_day`,
			)
			.then((response) => {
				setWeather(response.data);
			});
	}, [country]);

	if (!country) {
		return null;
	}

	return (
		<div>
			<h1>{country.name.common}</h1>
			<li>Capital: {country.capital[0]}</li>
			<li>Area: {country.area}</li>
			<h2>Languages</h2>
			<ul>
				{languages.map((lang, index) => (
					<li key={index}>{lang}</li>
				))}
			</ul>

			<img src={country.flags.png} alt={country.flags.alt} />

			{weather && (
				<Weather
					capital={country.capital[0]}
					weather={weather.current}
					units={weather.current_units}
				/>
			)}
		</div>
	);
};
export default Country;
