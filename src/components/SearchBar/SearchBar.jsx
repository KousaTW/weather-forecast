// React
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// Store
import { setWeatherInfo } from "../../features/weather/weatherSlice";
// Utils
import { coordinateToString } from "../../utils/coordinateTransfer";
// CSS
import "./SearchBar.css";

function SearchBar() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const dispatch = useDispatch();

	// 搜尋城市座標
	async function searchCityCoordinates(query, resultCount = 10) {
		const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=${resultCount}&language=en&format=json`;

		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("geocoding-api is not ok!");
			const json = await response.json();
			console.log(json.results);
			setSearchResults(json.results);
		} catch (error) {
			console.error("City Search Faild that Error:", error);
			setSearchResults([]);
		}
	}

	// 選擇搜尋結果
	async function chooseCity(city, dispatch) {
		const { latitude, longitude } = city;
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&forecast_days=5&wind_speed_unit=ms`;

		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("forecast api is not ok!");
			const json = await response.json();
			json.city_name =
				city.name || coordinateToString(latitude, longitude);
			dispatch(setWeatherInfo(json));
			setSearchResults([]);
		} catch (error) {
			console.error("Weather Forecast Faild that Error:", error);
		}
	}

	// Debounce
	useEffect(() => {
		const debounce = setTimeout(() => {
			if (!searchQuery.trim()) {
				setSearchResults([]);
				return;
			}

			if (searchQuery) {
				console.log("Fetch");
				searchCityCoordinates(searchQuery);
			}
		}, 500);

		return () => clearTimeout(debounce);
	}, [searchQuery]);

	return (
		<>
			<div id="searchBarContainer">
				{/* 搜尋欄 */}
				<input
					type="text"
					name="citySearch"
					id="citySearch"
					value={searchQuery}
               placeholder="Please enter a city name..."
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{/* 搜尋結果 */}
				{searchResults && searchResults.length > 0 && (
					<section id="searchResults">
						{searchResults.map((city, index) => (
							<li
								className="search-result"
								key={city.name + index}
								onClick={() => chooseCity(city, dispatch)}
							>
								<img
									className="country"
									src={`https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`}
									alt=""
								/>
								{city.name} - {city.country}
							</li>
						))}
					</section>
				)}
			</div>
		</>
	);
}

export default SearchBar;
