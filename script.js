const apiKey = "9ea71baf48f5979d909581b45e1f8d75";

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

async function getWeather(city) {
    const errorMsg = document.getElementById('errorMsg');
    const weatherInfo = document.getElementById('weatherInfo');
    
    errorMsg.innerText = '';
    
    try {
        const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey
        );      

        if (!response.ok) {
            throw new Error('City not found. Please check the spelling!');
        }

        const data = await response.json();

        document.getElementById('cityName').innerText = data.name + ", " + data.sys.country;
        document.getElementById('temp').innerText = "Temperature: " + data.main.temp + " °C";
        document.getElementById('humidity').innerText = "Humidity: " + data.main.humidity + "%";
        document.getElementById('wind').innerText = "Wind Speed: " + data.wind.speed + " m/s";
        
        weatherInfo.style.display = 'block';

    } catch (error) {
        weatherInfo.style.display = 'none';
        errorMsg.innerText = error.message;
    }
}