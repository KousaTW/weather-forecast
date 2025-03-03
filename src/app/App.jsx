import SearchBar from "../components/SearchBar/SearchBar";
import WeatherInfo from "../components/WeatherInfo/WeatherInfo";
import "./App.css";

const URL =
	"https://api.open-meteo.com/v1/forecast?latitude=22.9908&longitude=120.2133&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&forecast_days=5";

function App() {
	return (
		<>
			<SearchBar></SearchBar>			
         <WeatherInfo></WeatherInfo>
		</>
	);
}

export default App;
