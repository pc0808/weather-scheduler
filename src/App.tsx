import { useState  } from 'react';
import './styles/App.css';
import { firstTwoWeathers, getNextWeather, updateWithNext } from './utils/weather';
import ChartNavigation from './ChartNavigation';
import { morning, afternoon, evening, allDay, type WeatherResponse, timePeriods, type TimePeriod} from './utils/weather-types';
import { daysOfWeek } from './utils/helper';

export default function App() {
  const [chosen, setChosen] = useState(false);
  const [timeFrame, setTimeFrame] = useState<TimePeriod>(allDay); 
  const [day, setDay] = useState("Sunday");
  const [weathers, setWeathers] = useState<Array<WeatherResponse>>([]);
  const [zipText, setZipText] = useState("10001, USA");
  const [dayText, setDayText] = useState("Sunday");
  const [timePeriodText, setTimePeriodText] = useState("All Day"); 

  async function addNext() {
    console.log("1", weathers);
    const what = await updateWithNext(weathers, day); 
    setWeathers(what);
  }

  async function loadInitial(){
    const location = document.getElementById("zip").value.toString() ?? "10001"; 
    if(location.length !== 5) {
      confirm("Make sure you are inputting valid US zipcode");
      return;
    }
    
    const updatedPeriod = parseInt(document.getElementById("timePeriods").value); //corresponds to index in timePeriods 

    setZipText(location + ", USA");
    setDayText(day);
    setTimePeriodText(timePeriods[updatedPeriod].name);
    setTimeFrame(timePeriods[updatedPeriod]);

    setWeathers(await firstTwoWeathers(location, day)); 
    setChosen(true);

  }
  
  function ChartsLoaded(){
    if(chosen){
      return <ChartNavigation weatherDatas={weathers} setWeatherDatas={setWeathers} time={timeFrame} day={day} />
    }
  }
  return (
    <>
      <h1>Weather Scheduler</h1>
      <div className="input-container">
        <img src={window.location.origin + '/src/assets/usa.png'} alt="USA emote" width="50" style={{marginBottom: "-10px"}}/>
        <label>
          ZipCode: 
          <input type="number" placeholder="10001" id="zip" />
        </label>
        <label>
          Every: 
          <select name="days" id="days" onChange={event => setDay(event.target.value)}>
            {daysOfWeek.map(thisDay => (
              <option value={thisDay}>{thisDay}</option> 
            ))}
          </select>
        </label>
        <label> 
          <select name="timePeriods" id="timePeriods">
            {timePeriods.map((period, index) => (
              <option value={index.toString()}>{period.name}</option> 
            ))}
          </select>
        </label>
        <button onClick={async ()=> await loadInitial()} style={{marginLeft: "2%"}}>Load</button>
      </div>
      <div className="Weather">
        <h2 style={{display: (chosen)? 'block': 'none'}}>{zipText}: Every {dayText} {timePeriodText}</h2> 
        <button className="load-button" onClick={async ()=> await addNext()} 
          disabled={!chosen} style={{display: (chosen && weathers.length < 5)? 'block': 'none'}}>
          Load Next
        </button>
        <ChartsLoaded></ChartsLoaded>
      </div>
    </>
  )
}

