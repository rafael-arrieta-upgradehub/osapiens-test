import weatherProvider, { switchApi, setLocation, fetchForecast } from '../weatherProvider';
import { ApiWeather1 } from '@/services/apiWeather1/apiWeather1';
import { ApiWeather2 } from '@/services/apiWeather2/apiWeather2';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@/services/apiWeather1/apiWeather1');
jest.mock('@/services/apiWeather2/apiWeather2');

const apiWeather1 = new ApiWeather1();
const apiWeather2 = new ApiWeather2();

describe('weatherProvider slice', () => {
    it('should handle initial state', () => {
        expect(weatherProvider(undefined, { type: 'unknown' })).toEqual({
            selectedApi: 'apiWeather1',
            forecast: {},
            status: 'idle',
            error: '',
            latitude: null,
            longitude: null,
        });
    });

    it('should handle switchApi', () => {
        const initialState = weatherProvider(undefined, { type: 'unknown' });
        const actual = weatherProvider(initialState, switchApi('apiWeather2'));
        expect(actual.selectedApi).toEqual('apiWeather2');
    });

    it('should handle setLocation', () => {
        const initialState = weatherProvider(undefined, { type: 'unknown' });
        const actual = weatherProvider(initialState, setLocation({ latitude: 40.7128, longitude: -74.0060 }));
        expect(actual.latitude).toEqual(40.7128);
        expect(actual.longitude).toEqual(-74.0060);
    });

    it('should handle fetchForecast pending', () => {
        const action = { type: fetchForecast.pending.type };
        const initialState = weatherProvider(undefined, { type: 'unknown' });
        const actual = weatherProvider(initialState, action);
        expect(actual.status).toEqual('loading');
    });

    it('should handle fetchForecast fulfilled', () => {
        const action = { type: fetchForecast.fulfilled.type, payload: { temperature: 25, wind: 10 } };
        const initialState = weatherProvider(undefined, { type: 'unknown' });
        const actual = weatherProvider(initialState, action);
        expect(actual.status).toEqual('succeeded');
        expect(actual.forecast).toEqual({ temperature: 25, wind: 10 });
    });

    it('should handle fetchForecast rejected', () => {
        const action = { type: fetchForecast.rejected.type, error: { message: 'Error fetching forecast' } };
        const initialState = weatherProvider(undefined, { type: 'unknown' });
        const actual = weatherProvider(initialState, action);
        expect(actual.status).toEqual('failed');
        expect(actual.error).toEqual('Error fetching forecast');
    });
});
