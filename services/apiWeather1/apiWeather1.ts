import {ApiClient} from "@/services/common/api";
import {ApiWeatherInterface} from "@/services/common/apiWeatherInterface";
import {latLongParamsParser1, responseParser1} from "@/services/apiWeather1/apiWeather1.parser";

export class ApiWeather1 implements ApiWeatherInterface {
    private api: ApiClient;
    constructor() {
        this.api = new ApiClient("https://api.open-meteo.com/v1");
    }

    async getForecast(params: Record<string, string>) {
        try {
            if (!params.latitude || !params.longitude) {
                throw new Error('Latitude and longitude are required');
            }

            const response = await this.api.request("/forecast", latLongParamsParser1(params));
            return responseParser1(response);
        } catch (error: Error | any) {
            throw new Error(error.message);
        }
    }
}
