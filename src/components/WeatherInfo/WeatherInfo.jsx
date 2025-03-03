import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { weatherCodeConversion } from "../../utils/weatherCodeConversion.ts";
import { celsiusToFahrenheit } from "../../utils/celsiusToFahrenheit.ts";

import wind from "../../assets/wind.png";
import humidity from "../../assets/humidity.png";

import "./WeatherInfo.css";

function WeatherInfo() {
	const weatherInfo = useSelector((state) => state.weather.weatherInfo);

	const [temp, setTemp] = useState(0);
	const [dailyTempMin, setDailyTempMin] = useState([]);
	const [dailyTempMax, setDailyTempMax] = useState([]);
	const [unit, setUnit] = useState("Celsius");

	useEffect(() => {
		if (weatherInfo?.current?.temperature_2m !== undefined) {
			setTemp(weatherInfo.current.temperature_2m);
		}
		if (weatherInfo?.daily?.temperature_2m_min !== undefined) {
			setDailyTempMin(weatherInfo.daily.temperature_2m_min);
		}
		if (weatherInfo?.daily?.temperature_2m_max !== undefined) {
			setDailyTempMax(weatherInfo.daily.temperature_2m_max);
		}
	}, [weatherInfo]);

	function changeTemp(unit) {
		const currentTemp = weatherInfo?.current?.temperature_2m;
		const tempsMin = weatherInfo?.daily?.temperature_2m_min;
		const tempsMax = weatherInfo?.daily?.temperature_2m_max;
		if (currentTemp === undefined) return;
		switch (unit) {
			case "Celsius":
				setTemp(currentTemp);
				setDailyTempMin(tempsMin);
				setDailyTempMax(tempsMax);
				break;
			case "Fahrenheit":
				setTemp(celsiusToFahrenheit(temp));
				setDailyTempMin(
					tempsMin.map((temp) => celsiusToFahrenheit(temp))
				);
				setDailyTempMax(
					tempsMax.map((temp) => celsiusToFahrenheit(temp))
				);
				break;
		}
		setUnit(unit);
	}
	return (
		<>
			{weatherInfo ? (
				<div id="weatherInfoContainer">
					<div id="currentWeather">
						<div class="top-section">

								<p id="cityName">{weatherInfo.city_name}</p>

								<p id="temperature">
									{temp}°{unit === "Celsius" ? "C" : "F"}
								</p>
								<select
									id="temperatureUnit"
									onChange={(e) => changeTemp(e.target.value)}
									value={unit}
								>
									<option value="Celsius">°C</option>
									<option value="Fahrenheit">°F</option>
								</select>

						</div>

						<div class="bottom-section">
							<div class="weather-item">
								<img
									id="windSpeedImg"
									src={wind}
									alt="Wind Speed"
								/>
								<p>
									{weatherInfo?.current?.wind_speed_10m} m/s
								</p>
							</div>
							<div class="weather-item">
								<img
									id="humidityImg"
									src={humidity}
									alt="Humidity"
								/>
								<p>
									{weatherInfo?.current?.relative_humidity_2m}
									%
								</p>
							</div>
							<div class="weather-item">
								<p>Weather:</p>
								<p>
									{weatherCodeConversion(
										weatherInfo?.current?.weather_code
									)}
								</p>
							</div>
						</div>
					</div>

					{weatherInfo.daily && (
						<div id="weatherForecast">
							{weatherInfo.daily.time.map((date, index) => (
								<section key={"weatherInfo" + index}>
									{date.substr(5,5)}
									<p key={"date" + index}>										
										{weatherCodeConversion(
											weatherInfo.daily.weather_code[
												index
											]
										)}
									</p>
									<p key={"temp" + index}>
										{dailyTempMin[index]}°
										{unit === "Celsius" ? "C" : "F"}~{" "}
										{dailyTempMax[index]}°
										{unit === "Celsius" ? "C" : "F"}
									</p>
								</section>
							))}
						</div>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default WeatherInfo;
