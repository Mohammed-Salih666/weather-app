//https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=london

const fetchWeather = async (location) => {
    const weatherInfo = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`); 

    return weatherInfo.json();
}

fetchWeather("Berlin").then(data => console.log(data));