import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, registerables } from "chart.js";
import type { WeatherResponse } from "./utils/weather-types";
import './styles/Chart.css';

Chart.register(CategoryScale);
Chart.register(...registerables);


interface ChartProps {
    weatherData: WeatherResponse;
    title: string;
    width?: number;
    height?: number;
  }


const ChartRender: React.FC<ChartProps> = ({
    weatherData,
    title,
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
  
        const labels: Array<string> = weatherData.days[0].hours.map(hour => hour.datetime);
        console.log("Hours :", weatherData.days[0].hours.map(hour => hour.datetime) );
        console.log("Labels:", labels);
        const temps: Array<number> = weatherData.days[0].hours.map(hour => hour.temp);
  
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
            labels,
            datasets: [{
                label: 'Temperature (°F)',
                data: temps,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.3,
            }],
            },
            options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title,
                },
            },
            scales: {
                x: {
                    title: { display: true, text: 'Hour of Day' },
                },
                y: {
                    title: { display: true, text: 'Temperature (°F)' },
                },
            },
            },
        });
  
        return () => {
            chartRef.current?.destroy();
        };
    }, [weatherData, title]);
    
    
    return <canvas ref={canvasRef} width={width} height={height} />;
};
  
export default ChartRender;