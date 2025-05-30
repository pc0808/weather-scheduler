// retrieves weather data from Timeline Weather API
import type { WeatherResponse } from "./weather-types";
import {weatherData} from "./example";
import { weatherData2 } from "./example2";
import { getNextDate } from "./helper";
import { fetchy, sendRequest } from "./fetchy";

export async function firstTwoWeathers(location: string, day: string): Promise<WeatherResponse[]>{
    console.log(location, day);
    const date = getNextDate(day);
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"/"+date+"?key=CZZMY9ZZUTFKF8EZ69CZJF9WQ&include=hours"
    const one = await sendRequest(url); 
    const two = await getNextWeather(location, day, date); 
    return [one, two];
}

/**
 * 
 * @param location 
 * @param day formatted Monday, Tuesday 
 * @param lastDate formatted like YYYY-MM-DD
 * @returns 
 */
export async function getNextWeather(location:string, day: string, lastDate: string): Promise<WeatherResponse> {
    const date = getNextDate(day, lastDate);
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"/"+date+"?key=CZZMY9ZZUTFKF8EZ69CZJF9WQ&include=hours"
    return await sendRequest(url); 
}

export async function updateWithNext(weathers: WeatherResponse[], day:string): Promise<WeatherResponse[]>{
    const last = weathers[weathers.length-1];
    const next = await getNextWeather(last.resolvedAddress, day, last.days[0].datetime); 
    console.log("2", [...weathers, next]);
    return [...weathers, next]; 
}