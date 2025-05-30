import { useRef, useState, type SetStateAction } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { allDay, type WeatherResponse } from "./utils/weather-types";
import { getNextWeather } from "./utils/weather";
import ChartRender from "./ChartRender";
import type { TimePeriod } from "./utils/weather-types";
import './styles/Chart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface ChartNavigationProps {
  weatherDatas: Array<WeatherResponse>,
  setWeatherDatas: React.Dispatch<SetStateAction<WeatherResponse[]>>,
  time?: TimePeriod,
  day: string,
}

const ChartNavigation: React.FC<ChartNavigationProps> = ({
    weatherDatas,
    setWeatherDatas,
    time = allDay,
    day
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [leftDisable, setLeftDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false); 

    const handleScroll = (element: HTMLDivElement | null, speed: number, distance: number, step: number): void => {
        if (!element) return;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setLeftDisable(true);
            } else{
                setLeftDisable(false);
            }
        }, speed);
    };

    

    return (
        <>
        <span className = "chart-container">
            <div className="chart-nav-container" ref={elementRef}>
                {weatherDatas.map((weather, index) => (
                    <ChartRender weatherData={weather} time={time}/>    
                ))}
            </div>
        </span>
        <div className="button-container">
            <button onClick={() => handleScroll(elementRef.current, 25, 400, -40)} disabled={leftDisable}>
                Left
            </button>
            <button onClick={() => handleScroll(elementRef.current, 25, 400, 40)}>
                Right
            </button>
        </div>
        </>
    );
};

export default ChartNavigation;
