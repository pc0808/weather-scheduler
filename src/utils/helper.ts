// general helper function outside scope of other utility 
import type { WeatherResponse } from "./weather-types";

// labels are hourly markers 
// we are assuming labels are NOT 0-24 but have AM/PM markers --> bc app is limited to morning/afternoon hours
export function getHourLabels(data: WeatherResponse){
    
}