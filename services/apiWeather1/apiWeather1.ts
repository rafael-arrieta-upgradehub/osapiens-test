import {ApiClient} from "@/services/common/api";
import {ApiWeatherInterface} from "@/services/common/apiWeatherInterface";
import {latLongParamsParser1} from "@/services/apiWeather1/apiWeather1.parser";


class ApiWeather1 implements ApiWeatherInterface {
    private api: ApiClient;
    constructor() {
        this.api = new ApiClient("https://api.open-meteo.com/v1");
    }

    async getForecast(params: Record<string, string>) {
        return this.api.request("/forecast", latLongParamsParser1(params));
    }
}
