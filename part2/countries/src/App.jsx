import { useState, useEffect } from "react"
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!country) return
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
      .then(response => setWeather(response.data))
  }, [country])

  const iconURL = weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ""

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>
            {language}
          </li>)}
      </ul>
      <img 
        src={country.flags.png}
      />
      {weather ? (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <div>Temperature {weather.main.temp} Celsius</div>
          <img src={iconURL} alt={weather.weather[0].description} />
          <div>Wind {weather.wind.speed} m/s</div>
        </>
      ) : (
        <div>Loading weather...</div>
      )}
    </div>
  )
}

const Display = ({ countries, onSelect }) => {
  if (countries.length > 10) {
    return <p> Too many matches, specify another filter</p>
  } 
  
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <CountryDetails country={country} />
    )
  }
  
  return (
    <ul>
      {countries.map(country => 
        <li key={country.cca3}>
          {country.name.common} <button onClick={() => {onSelect(country)}}>Show</button>
        </li>)}
    </ul>
  )
}

const App = ()  => {
  const [input, setInput] = useState(null)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => setCountries(response.data))
  }, [])

  

  const handleInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
    setSelectedCountry(null)
  }
  
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(input))
  
  console.log(filteredCountries)
  return (
    <div>
      find countries <input onChange={handleInput}/>
      <div>
        {selectedCountry ? <CountryDetails country={selectedCountry} /> : 
          (
            <Display 
              countries={filteredCountries} 
              onSelect={setSelectedCountry} 
            />
        )}
      </div>
      
    </div>
  )
}

export default App
