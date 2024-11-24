import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiWeather1 } from '@/services/apiWeather1/apiWeather1';
import { ApiWeather2 } from '@/services/apiWeather2/apiWeather2';
import { ApiWheatherResponse } from '@/services/common/apiWheatherResponse';


const apiWeather1 = new ApiWeather1();
const apiWeather2 = new ApiWeather2();

export const fetchForecast = createAsyncThunk(
    'weatherProvider/fetchForecast',
    async ({ api, params }: { api: string, params: Record<string, any> }) => {
        if (api === 'apiWeather1') {
            return await apiWeather1.getForecast(params);
        } else {
            return await apiWeather2.getForecast(params);
        }
    }
);

const weatherProvider = createSlice({
    name: 'weatherProvider',
    initialState: {
        selectedApi: 'apiWeather1',
        forecast: {},
        status: 'idle',
        error: ''
    },
    reducers: {
        switchApi: (state, action) => {
            state.selectedApi = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.forecast = action.payload as ApiWheatherResponse;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });
    }
});

export const { switchApi } = weatherProvider.actions;
export default weatherProvider.reducer;
