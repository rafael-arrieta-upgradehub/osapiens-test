import { configureStore } from '@reduxjs/toolkit';
import weatherProviderReducer from './slices/weatherProvider';

const store = configureStore({
    reducer: {
        weatherProvider: weatherProviderReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
