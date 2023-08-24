let weatherData; 
const fetchWeather = async (location) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d699d2e252dc44d0a3a151414232308&q=${location}`); 

    weatherData = await response.json();  
    // console.log(weatherData); 
    return await weatherData; 
    
}
