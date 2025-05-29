
/**
 * @param {number} start - The start of the period in hours (0-23).
 * @param {number} end - The end of the period in hours (0-24).
 * @param {number} threshold - The threshold hour to include in chart anyways.
 */
interface period{
    start: number;
    end: number;
    threshold: number;
}

const morning: period = {
    start: 8,
    end: 12,
    threshold: 1
};
const afternoon: period = {
    start: 12,
    end: 16,
    threshold: 1
};
const evening: period = {
    start: 16,
    end: 20,
    threshold: 1
};

const TimeFrame = {
    morning,
    afternoon,
    evening
};

export interface WeatherHour {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    feelslike: number;
    humidity: number;
    dew: number;
    precip: number;
    precipprob: number;
    snow: number;
    snowdepth: number;
    preciptype: string[] | null;
    windgust: number;
    windspeed: number;
    winddir: number;
    pressure: number;
    visibility: number;
    cloudcover: number;
    solarradiation: number;
    solarenergy: number;
    uvindex: number;
    severerisk: number;
    conditions: string;
    icon: string;
    stations: any; // Optional, can be null
    source: string; // e.g., "fcst"
}

export interface WeatherDay {
    datetime: string;
    datetimeEpoch: number;
    tempmax: number;
    tempmin: number;
    temp: number;
    feelslikemax: number;
    feelslikemin: number;
    feelslike: number;
    dew: number;
    humidity: number;
    precip: number;
    precipprob: number;
    precipcover: number;
    preciptype: string[] | null;
    snow: number;
    snowdepth: number;
    windgust: number;
    windspeed: number;
    winddir: number;
    pressure: number;
    cloudcover: number;
    visibility: number;
    solarradiation: number;
    solarenergy: number;
    uvindex: number;
    severerisk: number;
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    moonphase: number;
    conditions: string;
    description: string;
    icon: string;
    stations: any; 
    source: string; 
    hours: WeatherHour[]; 
}


export interface WeatherResponse {
    queryCost: number;
    latitude: number;
    longitude: number;
    resolvedAddress: string;
    address: string;
    timezone: string;
    tzoffset: number;
    days: WeatherDay[];
}