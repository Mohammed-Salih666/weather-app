//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london
import './style.css';



let weatherData; 
window.onload = getUserLocationWeather;
const fetchWeather = async (location) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`); 

    const weatherJson = await response.json();
    console.log(weatherJson);
    weatherData = {
        country: weatherJson.location.country,
        region: weatherJson.location.name,
        condition: weatherJson.current.condition.text,
        time: weatherJson.location.localtime,
        temp_c: weatherJson.current.temp_c, 
        temp_f: weatherJson.current.temp_f,
        feelslike_c: weatherJson.current.feelslike_c,
        feelslike_f: weatherJson.current.feelslike_f, 
        humidity: weatherJson.current.humidity, 
        wind_speed: weatherJson.current.wind_kph,
        wind_direction: weatherJson.current.wind_dir,
        pressure: weatherJson.current.pressure_mb,
        uv: weatherJson.current.uv,
        icon: weatherJson.current.condition.icon
    
    };

    console.log(weatherData);
    return weatherData;
    
}


const locationForm = document.querySelector('form'); 

locationForm.addEventListener("submit", async event => {
    event.preventDefault();
    const location = locationForm.elements["search"].value; 
    weatherData = location === "" ? getUserLocationWeather() : await fetchWeather(location); 
    displayWeather(weatherData);
}); 

const container = document.querySelector('#container'); 


const displayWeather = (weatherObj) =>{

    container.innerHTML = "";
    const html = `

        
        
        <div id="time-details"> 
            <h1>${weatherObj.condition}</h1>
            <img src="${weatherObj.icon}" id="weather-icon">

        </div> 
        
        <div id="region-details">
            <h2>${weatherObj.country}, ${weatherObj.region}</h2>
        </div>

        <div id="weather-container">
        <h1 id="temp">${weatherObj.temp_c} °C</h1>
        <div>
            <p id="feelslike"><b>Feels Like:</b> ${weatherObj.feelslike_c} °C</p>
            <p><b>Wind:</b> <em>${weatherObj.wind_direction}</em>  ${weatherObj.wind_speed} km/h </p>
            <p><b>Pressure:</b> ${weatherObj.pressure} MB</p>
            <p><b>Humidity:</b> ${weatherObj.humidity}%</p>
        </div>

        
        </div>
        
 
    `;
    
    const changeTempBtn = document.createElement('button'); 
    changeTempBtn.id = "change-temp";
    changeTempBtn.textContent = "°C";
    let isC = true;
    changeTempBtn.addEventListener('click', () => {
        changeTempBtn.textContent = changeTempBtn.textContent === "°C" ? "°F" : "°C";
        isC = !isC; 
        const temp = document.querySelector('#temp'); 
        const feelslike = document.querySelector('#feelslike');
        temp.innerHTML = `${isC ? weatherData.temp_c : weatherData.temp_f} ${changeTempBtn.textContent}`;
        feelslike.innerHTML = `Feels like: ${isC ? weatherData.feelslike_c : weatherData.temp_f} ${changeTempBtn.textContent}`;

    });
    container.appendChild(changeTempBtn);

    container.insertAdjacentHTML('afterbegin', html);


    
    return container; 
}



async function getUserLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentUserWeather);
    }
}

async function showCurrentUserWeather(position) {
    const location = `${position.coords.latitude},${position.coords.longitude}`;
    weatherData = await fetchWeather(location);
    displayWeather(weatherData);
}