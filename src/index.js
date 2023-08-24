//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london
import './style.css';



let weatherData; 
const fetchWeather = async (location) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`); 

    weatherData = await response.json();
    
    return {
        country: weatherData.location.country,
        region: weatherData.location.region,
        time: weatherData.location.localtime,
        temperature_c: weatherData.current.temp_c, 
        temperature_f: weatherData.current.temp_f,
        feelslike_c: weatherData.current.feelslike_c,
        feelslike_f: weatherData.current.feelslike_f, 
        humidity: weatherData.current.humidity, 
        wind_speed: weatherData.current.wind_kph,
        icon: weatherData.current.condition.icon
    
    }
    
}

const searchBtn = document.querySelector('#search-btn'); 
const searchField = document.querySelector('#search')
searchBtn.addEventListener('click', async event => {
    event.preventDefault();
    const location = searchField.value; 
    const weatherData = fetchWeather(location);
    console.log(weatherData);
});
