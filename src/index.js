//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london
import './style.css';



let weatherData; 
window.onload = getUserLocation;
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


const locationForm = document.querySelector('form'); 

locationForm.addEventListener("submit", async event => {
    event.preventDefault();
    const location = locationForm.elements['search'].value; 
    const weatherData = location === "" ? getUserLocation() : await fetchWeather(location); 
    displayWeather(weatherData);
}); 

// const searchBtn = document.querySelector('#search-btn'); 
// const searchField = document.querySelector('#search')

// searchBtn.addEventListener('click', async event => {
//     event.preventDefault();
//     const location = searchField.value; 
//     const weatherData = location === "" ? getUserLocation() : await fetchWeather(location);
//     console.log(weatherData);
//     displayWeather(weatherData); 
// });

const container = document.querySelector('#container'); 


const displayWeather = (weatherData) =>{

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
            <h1>${weatherData.temp_c} °C</h1>
            <p><b>Feels Like:</b> ${weatherData.feelslike_c} °C</p>
            <p><b>Wind:</b> <em>${weatherData.wind_direction}</em>  ${weatherData.wind_speed} km/h </p>
            <p><b>Pressure:</b> ${weatherData.pressure} MB</p>
            <p><b>Humidity:</b> ${weatherData.humidity}%</p>
        </div>

        <div>
            <img src="${weatherData.icon}" id="weather-icon">
        </div>
        </div>
        

    `;

    container.insertAdjacentHTML('afterbegin', html);
    return container; 
}


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentUserWeather);
    }
}


async function showCurrentUserWeather(position) {
    const weatherData = await fetchWeather(position.coords.latitude + "," + position.coords.longitude);
    displayWeather(weatherData);
}