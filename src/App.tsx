import { use, useState, type SetStateAction } from 'react';
import './styles/App.css';
import { weatherData } from './utils/example';
import { weatherData2 } from './utils/example2';
import { firstTwoWeathers } from './utils/weather';
import ChartNavigation from './ChartNavigation';
import { morning, afternoon, evening, type WeatherResponse } from './utils/weather-types';
import { daysOfWeek } from './utils/helper';

export default function App() {
  const [count, setCount] = useState(2);
  const [loaded, setLoaded] = useState(true); 
  const [chosen, setChosen] = useState(false);
  const [zipCode, setZipCode] = useState(10001); 
  const [day, setDay] = useState("Sunday");
  const [weathers, setWeathers] = useState<Array<WeatherResponse>>([weatherData, weatherData2, weatherData]);

  // Event handlers to update state variables
  const handleZipChange = (event: { target: { value: SetStateAction<number>; }; }) => {
    setZipCode(event.target.value);
};

  async function loadInitial(){
    const location = document.getElementById("zip").value.toString() ?? "10001"; 
    if(location.length !== 5) confirm("Make sure you are inputting valid US zipcode");
    
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
      <h1>Weather Scheduler</h1>
      <h2>New York, 10001: Every Monday</h2> 
      <div className="input-container">
        <img src={window.location.origin + '/src/assets/usa.png'} alt="USA emote" width="50" style={{marginBottom: "-10px"}}/>
        <label>
          ZipCode: 
          <input type="number" placeholder={zipCode.toString()} id="zip" />
        </label>
        <label>
          Every: 
          <select name="days" id="days" onChange={event => setDay(event.target.value)}>
            {daysOfWeek.map(thisDay => (
              <option value={thisDay}>{thisDay}</option> 
            ))}
          </select>
        </label>
        <button onClick={async ()=> await loadInitial()} style={{marginLeft: "2%"}}>Load</button>
      </div>
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

