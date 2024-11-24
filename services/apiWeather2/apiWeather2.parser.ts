import {ApiWheatherResponse} from "@/services/common/apiWheatherResponse";


export const latLongParamsParser2 = (params: Record<string, string>) => {
    if (!params.latitude || !params.longitude) {
        throw new Error('Latitude and longitude are required');
    }
    const { latitude, longitude } = params;
    return { lat: latitude, lon: longitude };
}

export const responseParser2: (response: unknown) => ApiWheatherResponse = (response: any) => {
    if (!response.properties.timeseries) {
        throw new Error('Invalid response');
    }
    const data = response.properties.timeseries[0];
    const time = new Date(data.time);
    const temperature = data.data.instant.details.air_temperature;
    const wind = data.data.instant.details.wind_speed;
    return { time, temperature, wind };
}
