import React, { useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { switchApi } from '@/store/slices/weatherProvider';
import ForecastComponent from "@/components/ForecastComponent";

const WeatherComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedApi, status, error, latitude, longitude } = useSelector((state: RootState) => state.weatherProvider);
    const handleSwitchApi = (apiName: string) => {
        dispatch(switchApi(apiName));
    };

    return (
        <View style={styles.container}>
            <Button title="Use API Weather 1" onPress={() => handleSwitchApi('apiWeather1')} />
            <Button title="Use API Weather 2" onPress={() => handleSwitchApi('apiWeather2')} />
            <Text>Current API: {selectedApi}</Text>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'succeeded' && <ForecastComponent/>}
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
