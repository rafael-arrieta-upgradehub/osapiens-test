

export const latLongParamsParser1 = (params: Record<string, string>) => {
    if (!params.latitude || !params.longitude) {
        throw new Error('Latitude and longitude are required');
    }
    const { latitude, longitude } = params;
    return {  latitude,  longitude };
}
