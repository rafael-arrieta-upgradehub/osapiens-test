import {ApiClient} from "@/services/common/api";
import {ApiWeatherInterface} from "@/services/common/apiWeatherInterface";
import {latLongParamsParser2} from "@/services/apiWeather2/apiWeather2.parser";

class ApiWeather2 implements ApiWeatherInterface {
    private api: ApiClient;
    constructor() {
        this.api = new ApiClient("https://api.met.no/weatherapi");
    }

    async getForecast(params: Record<string, any>) {
        return this.api.request("/locationforecast/2.0/compact?", latLongParamsParser2(params));
    }
}
