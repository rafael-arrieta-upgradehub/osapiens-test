import { Image, StyleSheet, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ApiWheatherResponse, isApiWheatherResponse } from '@/services/common/apiWheatherResponse';
import ForecastComponent from '@/components/ForecastComponent';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const getHeaderImage = (temperature: number) => {
    if (temperature > 30) {
        return require('@/assets/images/hot.png');
    } else if (temperature > 20) {
        return require('@/assets/images/warm.png');
    } else if (temperature > 10) {
        return require('@/assets/images/cool.png');
    } else {
        return require('@/assets/images/cold.png');
    }
};

export default function HomeScreen() {
    const weatherProvider = useSelector((state: RootState) => state.weatherProvider);
    const forecast: ApiWheatherResponse | object = weatherProvider.forecast;

    const temperature = forecast.temperature;
    const selectedApi = weatherProvider.selectedApi;
    const headerImage = getHeaderImage(temperature);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: 'rgba(0,222,255,0.2)', dark: 'rgba(0,139,218,0.3)' }}
            headerImage={<Image source={headerImage} style={styles.headerImage} />}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
            </ThemedView>
            {!isApiWheatherResponse(forecast) ? (<ThemedText>No forecast data available, please let us collect your data or input a place on the other tab</ThemedText>): <ForecastComponent />}

            <ThemedText>Current API: {selectedApi}</ThemedText>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerImage: {
        height: 96,
        width: 96,
        bottom: 10,
        left: 0,
        position: 'absolute',
    },
});
