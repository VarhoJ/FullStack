import axios from "axios"
import { useState, useEffect } from "react"

const ShowWeather = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
  
    const [returnValue, setReturn] = useState(<div></div>)
  
    useEffect( () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.name.common}&appid=${api_key}`)
        .then(response => { 
          const weather = response.data
        
          console.log("temp: ", weather.main.temp)
  
          setReturn (
          <div>
            <h2>Weather in {props.country.capital}</h2>
            <p> temperature {(weather.main.temp - 273).toPrecision(3)} Celcius</p>
            <img  
              src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt =""
            />
            <p>wind {weather.wind.speed} m/s</p>
          </div>
          )
        })
      
    }, [])
    return returnValue
  }

export default ShowWeather