import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootState } from '@/store/store';
import { ApiWheatherResponse, isApiWheatherResponse } from '@/services/common/apiWheatherResponse';
import { ThemedText } from '@/components/ThemedText';

const ForecastComponent = () => {
    const weatherProvider = useSelector((state: RootState) => state.weatherProvider);
    const forecast: ApiWheatherResponse | object = weatherProvider.forecast;

    if (!isApiWheatherResponse(forecast)) {
        return <ThemedText>No forecast data available</ThemedText>;
    }

    const { temperature, wind } = forecast;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.city}>Lat: {parseInt(weatherProvider.latitude)} Long: {parseInt(weatherProvider.longitude)}</ThemedText>
                <ThemedText style={styles.date}>Today, {new Date().toLocaleString()}</ThemedText>
            </View>

            <View style={styles.temperatureContainer}>
                <ThemedText style={styles.temperature}>{temperature}°</ThemedText>
                <ThemedText style={styles.weather}>Rainy</ThemedText>
            </View>

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Icon name="thermometer" size={24} />
                    <ThemedText style={styles.detailText}>{`Feels like: ${temperature - 2}°`}</ThemedText>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="weather-windy" size={24} />
                    <ThemedText style={styles.detailText}>{`Wind: ${wind} km/h`}</ThemedText>
                </View>
            </View>
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
    temperatureContainer: {
        alignItems: 'center',
    },
    temperature: {
        fontSize: 100,
        fontWeight: 'bold',
    },
    weather: {
        paddingTop: 36,
        fontSize: 20,
        textTransform: 'capitalize',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    detailItem: {
        alignItems: 'center',
    },
    detailText: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default ForecastComponent;
