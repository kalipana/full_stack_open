import weatherService from '../services/weather'
var responded = false

const Weather = ({ filteredCountries, weatherData }) => {
    if (weatherData) {
        console.log(weatherData)
        const baseImgSrc = 'https://openweathermap.org/img/wn/'
        const temperature = (weatherData.current.temp - 273.15).toFixed(2)
        const weatherIcon = weatherData.current.weather[0].icon

        const wind = weatherData.current.wind_speed
        return (
            <div>
                <h2>
                    Weather in {filteredCountries[0].capital[0]}
                </h2>
                Temperature: {temperature} Celcius
                <br/>
                <img src={`${baseImgSrc}${weatherIcon}@2x.png`} />
                <br/>
                Wind: {wind} m/s
            </div>
        )
    }
}


export default Weather