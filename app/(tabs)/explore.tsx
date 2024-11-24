import React, { useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { switchApi, fetchForecast } from '@/store/slices/weatherProvider';

const WeatherComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedApi, forecast, status, error } = useSelector((state: RootState) => state.weatherProvider);

    useEffect(() => {
        dispatch(fetchForecast({ api: selectedApi, params: { latitude: '40', longitude: '-3.6875' } }));
    }, [dispatch, selectedApi]);

    const handleSwitchApi = (apiName: string) => {
        dispatch(switchApi(apiName));
    };

    return (
        <View style={styles.container}>
            <Button title="Use API Weather 1" onPress={() => handleSwitchApi('apiWeather1')} />
            <Button title="Use API Weather 2" onPress={() => handleSwitchApi('apiWeather2')} />
            <Text>Current API: {selectedApi}</Text>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'succeeded' && <Text>{JSON.stringify(forecast, null, 2)}</Text>}
            {status === 'failed' && <Text>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default WeatherComponent;
