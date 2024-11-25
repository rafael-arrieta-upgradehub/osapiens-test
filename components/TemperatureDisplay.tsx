import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TemperatureDisplayProps {
    temperature: number;
    weatherDescription: string;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ temperature, weatherDescription }) => {
    return (
        <View style={styles.temperatureContainer}>
            <ThemedText style={styles.temperature}>{temperature.toFixed(2)}°</ThemedText>
            <ThemedText style={styles.weather}>{weatherDescription}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default TemperatureDisplay;
