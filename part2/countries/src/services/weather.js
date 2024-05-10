import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const getWeather = (country) => {
    return axios.get(`${baseUrl}lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
}

export default {
    getWeather
}