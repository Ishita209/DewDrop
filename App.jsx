import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaReact } from "react-icons/fa";

import React from 'react'
import TopButtons from './components/TopButtons';
import Inputs from './components/inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemAndDetails from './components/TemAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const [query, setQuery] = useState({q : 'bhopal'});
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async() => {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const cityName = query.q ? query.q : 'current location'
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`)
    const data = await getFormattedWeatherData( {q: query.q, units}).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
setWeather(data);
    });
   
      
   
    // console.log(weather);
    // console.log(weather.daily);

  };



  useEffect(() => {
    getWeather();
  },[query,units]);

  // console.log(weather);


  // getWeather();

  const formatBackground = () => {
    if(!weather) return'from-cyan-600 to-blue-700';

    const threshold = units === 'metric' ? 20 : 60

    if(weather.temp <= threshold) return 'from-cyan-600 to-blue-700'

    return 'from-yellow-600 to-orange-700'
  }


  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-4 sm:px-8 md:px-16 bg-gradient-to-br shadow-xl shadow-gray-400 overflow-hidden ${formatBackground()}`}>
      <TopButtons setQuery = {setQuery}/>
      <Inputs setQuery = {setQuery} setUnits={setUnits}/>
      

      {
        
        weather && (
          <>
      <TimeAndLocation weather={weather} />
      <TemAndDetails weather={weather} units ={units}/>
      <Forecast title='3 hour step forecast' data= {weather.hourly}/>
      <Forecast title='daily forecast' data = {weather.daily}/>
        </>
        )
      }
      <ToastContainer autoClose = {2500} hideProgressBar={true} theme="colored"/>
      

    </div>
  )
}

export default App

