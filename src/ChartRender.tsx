import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, registerables } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import type { WeatherResponse } from "./utils/weather-types";
import type { TimePeriod } from './utils/weather-types';
import { allDay } from './utils/weather-types';
import { filterTime, getNumHours, humanizeDay, humanizeTime } from './utils/helper';
import './styles/Chart.css';

Chart.register(CategoryScale, ...registerables, annotationPlugin);


interface ChartProps {
    weatherData: WeatherResponse;
    time?: TimePeriod;
    width?: number;
    height?: number;
}


const ChartRender: React.FC<ChartProps> = ({
    weatherData,
    time = allDay,
    width = 600,
    height = 300,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
  
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element not found");
            return
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Canvas context not found");
            return;
        }

        filterTime(weatherData, time);
        const labels: Array<string> = weatherData.days[0].hours.map(hour => hour.datetime);
        const temps: Array<number> = weatherData.days[0].hours.map(hour => hour.temp);
        const humidity: Array<number> = weatherData.days[0].hours.map(hour => hour.humidity);
        const windspeed: Array<number> = weatherData.days[0].hours.map(hour => hour.windspeed);

        const hasPrecip = weatherData.days[0].humidity >= 25;
        const windy = weatherData.days[0].hours.some(hour => hour.windgust > 20);

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const datasets = [
            {
                label: 'Temp (°F)',
                data: temps,
                yAxisID: 'y',
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0)',
                fill: true,
                tension: 0.3,
            },
        ];

        if (hasPrecip) {
            datasets.push({
                label: 'Humidity (%)',
                data: humidity,
                yAxisID: 'y2',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 200, 83, 0)',
                fill: false,
                tension: 0.3,
            });
        }

        if (windy) {
            datasets.push({
                label: 'Wind Speed (mph)',
                data: windspeed,
                yAxisID: 'y3',
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 152, 0, 0)',
                fill: false,
                tension: 0.3,
            });
        }

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                const raw = this.getLabelForValue(value as number);
                                return humanizeTime(raw);
                            }
                        }
                    },
                    y: {
                        title: { display: true, text: 'Temperature (°F)' },
                    },
                    y2: hasPrecip ? {   
                        type: 'linear',
                        position: 'right',
                        title: { display: true, text: 'Humidity (%)' },
                        grid: { drawOnChartArea: false,},
                    }: undefined,
                    y3: (windy && !hasPrecip) ? {
                        type: 'linear',
                        position: 'right',
                        title: { display: true, text: 'Wind Speed (mph)' },
                        grid: { drawOnChartArea: false,},
                    } : undefined,
                },
                plugins: {
                    annotation: {
                        annotations: { //blocks off the out of range time period 
                            line1: {
                                type: 'line',
                                scaleID: 'x',
                                borderDash: [6, 6],
                                value: (time.start < 10 ? "0"+time.start : time.start) + ':00:00',
                                borderColor: (time === allDay) ?'rgba(255, 153, 0, 0)': 'black',
                                borderWidth: 1,
                            },
                            line2: {
                                type: 'line',
                                scaleID: 'x',
                                borderDash: [6, 6],
                                value: time.end + ':00:00',
                                borderColor: (time === allDay) ?'rgba(255, 153, 0, 0)': 'black',
                                borderWidth: 1,
                            },
                            box1: {
                                type: 'box',
                                xMin: labels[0],
                                xMax: (time.start < 10 ? "0"+time.start : time.start) + ':00:00',
                                backgroundColor: (time === allDay) ?'rgba(255, 255, 255, 0)': 'rgba(240, 190, 51, 0.3)',
                                borderWidth: 0,
                            },
                            box2: {
                                type: 'box',
                                xMax: labels[labels.length - 1],
                                xMin: time.end + ':00:00',
                                backgroundColor: (time === allDay) ?'rgba(255, 255, 255, 0)': 'rgba(240, 190, 51, 0.3)',
                                borderWidth: 0,
                            }
                        }
                    }
                  }
            },
        });
  
        return () => {
            chartRef.current?.destroy();
        };
    }, [weatherData]); 
    
    return <span className='chart-container'>
        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-5%'}}>
            <img className="chart-icon" 
                src={window.location.origin + '/src/assets/icons/'+weatherData.days[0].icon+'.png'} 
            alt="Weather Icon" width="50"/>
            <h2 className="chart-title">{humanizeDay(weatherData.days[0].datetime)}</h2>
        </span>
        <h3 className="chart-subtitle">{weatherData.days[0].conditions} | {weatherData.days[0].temp} °F</h3>
        <canvas ref={canvasRef} width={width} height={height} />
    </span>;
};
  
export default ChartRender;