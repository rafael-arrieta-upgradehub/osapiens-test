import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import {IconSymbol} from "@/components/ui/IconSymbol";

interface WeatherDetailsProps {
    temperature: number;
    wind: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ temperature, wind }) => {
    return (
        <View style={styles.details}>
            <View style={styles.detailItem}>
                <IconSymbol name="temperature-high"  size={24}/>
                <ThemedText style={styles.detailText}>{`Feels like: ${(temperature - 2).toFixed(2)}°`}</ThemedText>
            </View>
            <View style={styles.detailItem}>
                <IconSymbol name="wind-power" size={24} />
                <ThemedText style={styles.detailText}>{`Wind: ${wind.toFixed(2)} km/h`}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default WeatherDetails;
