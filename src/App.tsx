import { useState } from 'react';
import './styles/App.css';
import { weatherData } from './utils/example';
import ChartRender from './ChartRender';
import { morning, afternoon, evening } from './utils/weather-types';

export default function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <h1>My app</h1>
      <div className="Weather">
      <ChartRender weatherData={weatherData} time={afternoon} />
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

