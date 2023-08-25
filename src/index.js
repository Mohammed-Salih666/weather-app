//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london
import './style.css';



let weatherData; 
const fetchWeather = async (location) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`); 

    weatherData = await response.json();
    console.log(weatherData);
    return {
        country: weatherData.location.country,
        region: weatherData.location.region,
        condition: weatherData.current.condition.text,
        time: weatherData.location.localtime,
        temp_c: weatherData.current.temp_c, 
        temp_f: weatherData.current.temp_f,
        feelslike_c: weatherData.current.feelslike_c,
        feelslike_f: weatherData.current.feelslike_f, 
        humidity: weatherData.current.humidity, 
        wind_speed: weatherData.current.wind_kph,
        wind_direction: weatherData.current.wind_dir,
        pressure: weatherData.current.pressure_mb,
        uv: weatherData.current.uv,
        icon: weatherData.current.condition.icon
    
    }
    
}

const searchBtn = document.querySelector('#search-btn'); 
const searchField = document.querySelector('#search')
searchBtn.addEventListener('click', async event => {
    event.preventDefault();
    const location = searchField.value; 
    const weatherData = await fetchWeather(location);
    console.log(weatherData);
    // document.body.appendChild(displayWeather(weatherData));
    displayWeather(weatherData); 
});

const container = document.querySelector('#container'); 


const displayWeather = (weatherData) =>{
    // const container = document.createElement('div'); 
    // container.id = "container"; 

    container.innerHTML = "";
    const html = `

        <div id="region-details">
            <h1>${weatherData.country}, ${weatherData.region}</h1>
        </div>
        
        <div id="time-details"> 
            <h1>Today</h1>
            <h2>${weatherData.time}</h2>
        </div> 

        <div id="weather-container">
        <div>
            <h1>${weatherData.temp_c}°C</h1>
            <p>Feels Like: ${weatherData.feelslike_c}°C</p>
            <p>Wind: ${weatherData.wind_direction} ${weatherData.wind_speed} km/h </p>
            <p>Pressure: ${weatherData.pressure} MB</p>
            <p>Humidity: ${weatherData.humidity}%</p>
        </div>

        <div>
            <img src="${weatherData.icon}" id="weather-icon">
        </div>
        </div>
        

    `;

    container.insertAdjacentHTML('afterbegin', html);
    return container; 
}