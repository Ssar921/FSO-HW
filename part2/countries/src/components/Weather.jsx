import * as Wi from "react-icons/wi";
import wmoCodes from "../assets/wmoCodes";

const Weather = ({ capital, weather, units }) => {
	if (!weather) {
		return null;
	}
	const wmoIcon = wmoCodes[weather.weather_code];
	const Icon = Wi[wmoIcon.icon];

	return (
		<>
			<h2>Weather in {capital}</h2>
			<li>
				Temperature {weather.temperature_2m} {units.temperature_2m}
			</li>
			<li>
				Wind {weather.wind_speed_10m} {units.wind_speed_10m}
			</li>

			<li>
				<Icon size={100} />
			</li>
			<li>{wmoIcon.label}</li>
		</>
	);
};
export default Weather;
