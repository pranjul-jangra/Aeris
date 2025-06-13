import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showWeatherToast } from '../WeatherToast';

const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;

// Async thunk for fetching WeatherAPI data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({ lat, lon, city = 'London' }) => {
        const location = lat && lon ? `${lat},${lon}` : city;
        try {
            const res = await axios.get(`${weatherApiUrl}&q=${location}&days=5&aqi=yes`);
            showWeatherToast("Weather updated successfully.");
            return res.data;

        } catch (error) {
            const message = error?.response?.data?.error?.message;

            if (message === 'No matching location found.') {
                showWeatherToast("No matching location found.");
            } else {
                showWeatherToast("Something went wrong. Please try refreshing the page.");
            }
        }
    }
);

// Initial state
const initialState = {
    weatherData: {},
    hourlyData: [],
    loading: false,
    error: null,
}

// Weather slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateWeatherData: (state, action) => { state.current.weatherData = action.payload },
        updateHourlyData: (state, action) => { state.hourlyData = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.weatherData = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

});

export const { updateWeatherData, updateHourlyData } = weatherSlice.actions;
export default weatherSlice.reducer;
