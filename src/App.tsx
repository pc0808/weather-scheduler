import { use, useState } from 'react';
import './styles/App.css';
import { weatherData } from './utils/example';
import { weatherData2 } from './utils/example2';
import { firstTwoWeathers } from './utils/weather';
import ChartNavigation from './ChartNavigation';
import { morning, afternoon, evening, type WeatherResponse } from './utils/weather-types';


export default function App() {
  const [count, setCount] = useState(2);
  const [loaded, setLoaded] = useState(true); 
  const [chosen, setChosen] = useState(true);
  const [day, setDay] = useState("Monday")
  const [weathers, setWeathers] = useState<Array<WeatherResponse>>([weatherData, weatherData2, weatherData]);

  async function loadInitial(location: string ="10001"){
    setWeathers(await firstTwoWeathers(location, day)); 
    setChosen(true);
  }
  function ChartsLoaded(){
    if(chosen){
      return <ChartNavigation weatherDatas={weathers} time={afternoon} day={day} />
    }
  }
  return (
    <>
      <h1>My app</h1>
      <h2>New York, 10001: Every Monday</h2> 
      <button onClick={async ()=> await loadInitial()}>Load</button>
      <div className="Weather">
        <ChartsLoaded></ChartsLoaded>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

