import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import location from './View/location.png'
import region from './View/region.png'
import country from './View/country.png';
import wind from './View/wind-power.png';
import cloud from './View/cloud-computing.png';
import text from './View/text.png';
function App() {
  const [city, setCity] = useState("karjat ");
  const [weather, setWeather] = useState();

  useEffect(
    () => {
      fetchweather()
    }, []
  )
  useEffect(
    () => {
      fetchweather()
    }, [city]
  )




  let temp;

  const fetchweather = async () => {
    try {

      const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=ee52ca5099b44ad695743711242506&q=${city}&aqi=no`)

      setWeather(result.data);
      console.log(weather);
      if (temp < 20) {

      }
    }
    catch (error) {
      console.error("this is error fetching api", error)
    }
  };
  {
    weather && (temp = weather.current.temp_c)
    console.log(temp)
  }


  if (temp<29) {
    document.getElementById("pic").classList.add("bg-sunny")
    document.getElementById("pic").classList.remove("bg-rainy")
    document.getElementById("pic").classList.remove("bg-cloudy")
  }
  else if ((temp >19)&& (temp<30)) {
    document.getElementById("pic").classList.add("bg-rainy")
    document.getElementById("pic").classList.remove("bg-sunny")
    document.getElementById("pic").classList.remove("bg-cloudy")
  }


  else if (temp>15) {
    document.getElementById("pic").classList.remove("bg-rainy")
    document.getElementById("pic").classList.remove("bg-sunny")
    document.getElementById("pic").classList.add("bg-cloudy")
  }


  return (
    <>
      <div className='border' id="pic" >
        <h2 className='location'>Weather App</h2>
        <div className='text'>
          <input className='input' type='text' value={city}
            onChange={(e) => {
              setCity(e.target.value)
            }

            } />
          {
            weather &&
            <div className='card'>
              <img className='box3' src={weather.current.condition.icon} />
              <h1 className='box'>{weather.location.name}</h1>
              <h3 className='box'>Temp: {weather.current.temp_c}℃</h3>
              <h4 className='box'>Last Update : {weather.current.last_updated}</h4>
              <h4 className='box'>Current time : {weather.location.localtime}</h4>
            </div>

          }
        </div>
        {
          weather && (
            <div className='img'>
              <div className='time'>
                <img className='flat' src={location} />
                <h1 className='region info'>{weather.location.name}</h1>
                <h3 className='region'>{weather.location.region}</h3>
                <h3 className='region'>{weather.location.country}</h3>
              </div>
              <div className='time'>
                <img className='flat2' src={text}/>
                <h3 className='city'>Des : {weather.current.condition.text}</h3>
              </div>
              <div className='time'>
                <img className='flat2' src={cloud} />
                <h3 className='city '>Cloud : {weather.current.cloud}</h3>
              </div>
              <div className='time'>
                <img className='wind' src={wind} />
                <h3 className='city'> wind:{weather.current.wind_mph}</h3>
              </div>
              {/* <div className='time'>
          
            </div> */}
              {/* <div className='time'>
            <img className='city' src={weather.current.condition.icon} />
</div> */}
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
