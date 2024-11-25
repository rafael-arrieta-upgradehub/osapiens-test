import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { switchApi, setLocation } from '@/store/slices/weatherProvider';
import ForecastComponent from "@/components/ForecastComponent";

const WeatherComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedApi, status, error, latitude, longitude } = useSelector((state: RootState) => state.weatherProvider);
    const [latInput, setLatInput] = useState<string>('');
    const [lonInput, setLonInput] = useState<string>('');
    const [latError, setLatError] = useState<string>('');
    const [lonError, setLonError] = useState<string>('');

    const handleSwitchApi = (apiName: string) => {
        dispatch(switchApi(apiName));
    };

    const handleSetLocation = () => {
        const lat = parseFloat(latInput);
        const lon = parseFloat(lonInput);

        if (isNaN(lat) || lat < -90 || lat > 90) {
            setLatError('Latitude must be a number between -90 and 90');
            return;
        } else {
            setLatError('');
        }

        if (isNaN(lon) || lon < -180 || lon > 180) {
            setLonError('Longitude must be a number between -180 and 180');
            return;
        } else {
            setLonError('');
        }

        dispatch(setLocation({ latitude: lat, longitude: lon }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Button title="Use API 1" onPress={() => handleSwitchApi('apiWeather1')} />
                <Button title="Use API 2" onPress={() => handleSwitchApi('apiWeather2')} />
            </View>

            <Text>Current API: {selectedApi}</Text>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'succeeded' && <ForecastComponent />}
            {status === 'failed' && <Text>Error: {error}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    keyboardType="numeric"
                    value={latInput}
                    onChangeText={setLatInput}
                />
                {latError ? <Text style={styles.errorText}>{latError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    keyboardType="numeric"
                    value={lonInput}
                    onChangeText={setLonInput}
                />
                {lonError ? <Text style={styles.errorText}>{lonError}</Text> : null}
                <Button title="Set Location" onPress={handleSetLocation} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
    },
});

export default WeatherComponent;
