import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	weatherInfo: null,
};

const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {
		setWeatherInfo: (state, action) => {
			state.weatherInfo = action.payload;
		},
	},
});

export const { setWeatherInfo } = weatherSlice.actions;
export default weatherSlice.reducer;
