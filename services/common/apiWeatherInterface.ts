

export interface ApiWeatherInterface {
    getForecast(params: Record<string, any>): Promise<any>;
}
