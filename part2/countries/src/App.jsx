import { useState, useEffect } from 'react'
import Data from './components/Data'
import countriesService from './services/countries'
import Weather from './components/Weather'
import weatherService from './services/weather'

const App = () => {
  
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountries(response.data)
      setFilteredCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      weatherService.getWeather(filteredCountries[0]).then(response => {
        setWeatherData(response.data)
      })
    } else {
      setWeatherData(null)
    }
  }, [newSearch])

  const handleShow = (country) => () => {
    setNewSearch(country.name.common)
    setFilteredCountries([country])
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      Find countries:
      <input value={newSearch} onChange={handleSearchChange} />
      <Data filteredCountries={filteredCountries} handleShow={handleShow} />
      <Weather filteredCountries={filteredCountries} weatherData={weatherData} />
    </div>
  )
}

export default App