export function celsiusToFahrenheit(tempInCelsius: number): number {
	return Math.round(((tempInCelsius * 9) / 5 + 32) * 10) / 10;
}
