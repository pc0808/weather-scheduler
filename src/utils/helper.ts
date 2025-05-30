// general helper function outside scope of other utility 
import type { WeatherResponse, TimePeriod } from "./weather-types";

// labels are hourly markers 
// we are assuming labels are NOT 0-24 but have AM/PM markers --> bc app is limited to morning/afternoon hours
function getHourLabels(data: WeatherResponse){
    
}

/**
 * 
 * @param data Weather API response data
 * @param time The specified time period to filter the data by
 */
export function filterTime(data: WeatherResponse, time: TimePeriod): void{
    const hours = data.days[0].hours.filter(hour => {
        const hourNum = parseInt(hour.datetime.split(":")[0]); // Assuming datetime is in "HH:MM:SS" format'
        return hourNum >= (time.start - time.threshold) && hourNum <= (time.end + time.threshold); 
    });
    data.days[0].hours = hours;
}

/**
 * 
 * @param datetime datetime string in HH:MM:SS format
 * @returns number hours 0-24 hour format
 */
export function getNumHours(datetime: string): number {
    return parseInt(datetime.split(":")[0]); // Assuming datetime is in "HH:MM:SS" format'
}

/**
 * 
 * @param datetime datetime string in ISO format or "YYYY-MM-DD" format
 * @returns the day of the week as a string (e.g., "Monday", "Tuesday", etc.)
 */
function getDayOfWeek(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', { weekday: 'long' });
}

/**
 * 
 * @param datetime datetime string in ISO format or "YYYY-MM-DD" format
 * @returns human-readable string with the day of the week and date ie "Monday, January 1, 2023"
 */
export function humanizeDay(datetime: string): string {
    const date = new Date(datetime);
    return getDayOfWeek(datetime) + ", " + date.toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
}