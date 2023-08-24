//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london

let weatherData; 
const fetchWeather = async (location) => {
    const weatherInfo = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`).then(data => {return data}); 

    weatherData = await weatherInfo.json();  
    console.log(weatherData);
}

