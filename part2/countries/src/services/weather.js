import axios from 'axios'

const baseUrl = `http://api.openweathermap.org/data/2.5/weather`
const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (city) => {
  return axios.get(baseUrl, {
    params: {
      q: city,
      appid: api_key,
      units: 'metric'
    }
  })
  .then(res => res.data)
}

export default { getWeather }