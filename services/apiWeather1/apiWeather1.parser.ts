import {ApiWheatherResponse} from "@/services/common/apiWheatherResponse";


export const latLongParamsParser1 = (params: Record<string, string>) => {
    if (!params.latitude || !params.longitude) {
        throw new Error('Latitude and longitude are required');
    }
    const { latitude, longitude } = params;
    const current = 'temperature_2m,wind_speed_10m';
    return {  latitude,  longitude, current };
}

export const responseParser1: (response: unknown) => ApiWheatherResponse = (response: any) => {
    if (!response.current) {
        throw new Error('Invalid response');
    }
    const data = response.current;
    const time = new Date(data.time);
    const temperature = data.temperature_2m;
    const wind = data.wind_speed_10m;
    return { time, temperature, wind };
}
