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
    let hours = []; 
    try{
        hours = data.days[0].hours.filter(hour => {
            const hourNum = parseInt(hour.datetime.split(":")[0]); // Assuming datetime is in "HH:MM:SS" format'
            return hourNum >= (time.start - time.threshold) && hourNum <= (time.end + time.threshold); 
        });
    }catch(e){
        
    }
    
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
    const date = new Date(datetime + "EDT");
    return date.toLocaleString('en-US', { weekday: 'long' });
}

/**
 * 
 * @param datetime datetime string in ISO format or "YYYY-MM-DD" format
 * @returns human-readable string with the day of the week and date ie "Monday, January 1, 2023"
 */
export function humanizeDay(datetime: string): string {
    const date = new Date(datetime + "EDT");
    return getDayOfWeek(datetime) + ", " + date.toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
}

/**
 * 
 * @param datetime string in "HH:MM:SS" format
 * @returns human-readable string with the time in 12-hour format, e.g., "2:00 PM"
 */
export function humanizeTime(datetime: string): string {
    let hour = getNumHours(datetime); 
    const parity = (hour < 12) ? 'AM' : 'PM';
    if(hour%12 !== 0) hour = hour%12; 
    return hour + parity;
}

export const daysOfWeek: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

/**
 * 
 * @param day in string, like "Monday"
 * @param lastDate in string, YYYY-MM-DD
 * @returns string format of next date "2025-06-01"
 */
export function getNextDate(targetDay: string, lastDate?: string): string{
    const numDay = daysOfWeek.indexOf(targetDay);
    
    const d = lastDate? new Date(lastDate + "EDT") : new Date();
    const currentDay = d.getDay(); 

    // Calculate the number of days until the target day
    const daysUntilTarget = (numDay - currentDay + 7) % 7 || 7;

    d.setDate(d.getDate() + daysUntilTarget);
    return d.toISOString().split('T')[0];
}