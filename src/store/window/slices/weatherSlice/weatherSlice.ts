import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=59.94&longitude=30.31&current_weather=true&daily=sunrise,sunset&timezone=Europe/Moscow',
};
interface WeatherState {
    weathercode: string | null;
    sunset: string | null;
    sunrise: string | null;
    time: string | null;
    actualTime: string | null;
}

const initialState: WeatherState = {
    weathercode: null,
    sunset: null,
    sunrise: null,
    time: null,
    actualTime: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
    const response = await axios.request(options);
    const date = (new Date()).toISOString().slice(0, 10);
    // @ts-ignore
    const sunsetTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunset[i] })))
    // @ts-ignore
    const sunriseTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunrise[i] })))

    return {
        weathercode: response.data.current_weather.weathercode,
        sunrise: sunriseTimes[date],
        sunset: sunsetTimes[date],
        time: response.data.current_weather.time,
        actualTime: (new Date()).toLocaleTimeString(),
    };
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.weathercode = action.payload.weathercode;
            state.sunrise = action.payload.sunrise;
            state.sunset = action.payload.sunset;
            state.time = action.payload.time;
            state.actualTime = action.payload.actualTime;
        });
    },
});

export default weatherSlice.reducer;