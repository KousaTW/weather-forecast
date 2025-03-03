export function weatherCodeConversion(weatherCode: number): string {
	switch (weatherCode) {
		case 0:
			return "Clear sky";
		case 1:
			return "Mainly clear";
		case 2:
			return "partly cloudy";
		case 3:
			return "overcast";
		case 45:
		case 48:
			return "Fog and depositing rime fog";
		case 51:
         return "Drizzle: light"
		case 53:
         return "Drizzle: moderate"
		case 55:
			return "Drizzle: dense intensity";
		case 56:
         return "Freezing Drizzle: light";
		case 57:
			return "Freezing Drizzle: dense intensity";
		case 61:
			return "Rain: slight";
		case 63:
			return "Rain: moderate";
		case 65:
			return "Rain: heavy intensity";
		case 66:
			return "Freezing Rain: light";
		case 67:
			return "Freezing Rain: heavy intensity";
		case 71:
			return "Snow fall: Slight";
		case 73:
			return "Snow fall: moderate";
		case 75:
			return "Snow fall: heavy intensity";
		case 77:
			return "Snow grains";
		case 80:
			return "Rain showers: slight";
		case 81:
			return "Rain showers: moderate";
		case 82:
			return "Rain showers: violent";
		case 85:
			return "Snow showers slight";
		case 86:
			return "Snow showers heavy";
		case 95:
			return "Thunderstorm: slight or moderate";
		case 96:
		case 99:
			return "Thunderstorm with slight and heavy hail";
		default:
			return "unkown weather interpretation codes";
	}
}
