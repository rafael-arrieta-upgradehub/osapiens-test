import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { ApiWheatherResponse, isApiWheatherResponse } from '@/services/common/apiWheatherResponse';
import { ThemedText } from '@/components/ThemedText';
import TemperatureDisplay from '@/components/TemperatureDisplay';
import WeatherDetails from '@/components/WeatherDetails';

const getWeatherDescription = (temperature: number): string => {
    if (temperature >= 30) {
        return 'Hot';
    } else if (temperature >= 20) {
        return 'Warm';
    } else if (temperature >= 10) {
        return 'Cool';
    } else {
        return 'Cold';
    }
};

const ForecastComponent = () => {
    const weatherProvider = useSelector((state: RootState) => state.weatherProvider);
    const forecast: ApiWheatherResponse | object = weatherProvider.forecast;

    if (!isApiWheatherResponse(forecast)) {
        return <ThemedText>No forecast data available</ThemedText>;
    }

    const { temperature, wind } = forecast;
    const weatherDescription = getWeatherDescription(temperature);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.city}>Lat: {parseInt(weatherProvider.latitude)} Long: {parseInt(weatherProvider.longitude)}</ThemedText>
                <ThemedText style={styles.date}>Today, {new Date().toLocaleString()}</ThemedText>
            </View>

            <TemperatureDisplay temperature={temperature} weatherDescription={weatherDescription} />

            <WeatherDetails temperature={temperature} wind={wind} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 340,
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    header: {
        marginTop: 16,
        alignItems: 'center',
    },
    city: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
});

export default ForecastComponent;
