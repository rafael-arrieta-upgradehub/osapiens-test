import {ApiClient} from "@/services/common/api";
import {ApiWeatherInterface} from "@/services/common/apiWeatherInterface";
import {latLongParamsParser2, responseParser2} from "@/services/apiWeather2/apiWeather2.parser";

export class ApiWeather2 implements ApiWeatherInterface {
    private api: ApiClient;
    constructor() {
        this.api = new ApiClient("https://api.met.no/weatherapi");
    }

    async getForecast(params: Record<string, any>) {
        try {
            if (!params.latitude || !params.longitude) {
                throw new Error('Latitude and longitude are required');
            }
            const response = await  this.api.request("/locationforecast/2.0/compact", latLongParamsParser2(params));
            return responseParser2(response);
        } catch (error: Error | any) {
            throw new Error(error.message);
        }
    }
}
