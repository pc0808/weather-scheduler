// retrieves weather data from Timeline Weather API
import type { WeatherResponse } from "./weather-types";
import {weatherData} from "./example";

export function getWeatherData(): WeatherResponse{
    return weatherData as WeatherResponse;
}