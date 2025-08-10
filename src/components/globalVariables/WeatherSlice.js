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
            // Fetch weather
            const res = await axios.get(`${weatherApiUrl}&q=${location}&days=5&aqi=yes`);

            // Add history record to backend
            try {
                const serverURL = import.meta.env.VITE_SERVER_URL;
                await axios.post(`${serverURL}/api/history/add`,{ location },{ withCredentials: true });
            } catch (historyErr) {
                console.error("Error adding to history:", historyErr);
            }

            return res.data;

        } catch (error) {
            const message = error?.response?.data?.error?.message;

            if (navigator && !navigator.onLine) return showWeatherToast("You are offline. Please connect to your internet.");

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
