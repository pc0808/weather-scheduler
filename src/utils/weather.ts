// retrieves weather data from Timeline Weather API
import type { WeatherResponse } from "./weather-types";
import {weatherData} from "./example";
import { weatherData2 } from "./example2";
import { getNextDate } from "./helper";

export async function firstTwoWeathers(location: string, day: string): Promise<WeatherResponse[]>{
    console.log(location, day);
    const date = getNextDate(day);
    return [weatherData, weatherData2];
}

/**
 * 
 * @param location 
 * @param day formatted Monday, Tuesday 
 * @param lastDate formatted like YYYY-MM-DD
 * @returns 
 */
export async function getNextWeather(location:string, day: string, lastDate: string): Promise<WeatherResponse> {
    const data = getNextDate(day, lastDate);
    return weatherData; 
}