// OpenWeatherMap API key: `b77f5091c0a2e20b493b785ac035b6af`
// Unsplash API key: `XhBtRYJAOGpOf68KRzlClSORtUXsoTwP7mJc0a8WyTo`
const weatherApiKey = `b77f5091c0a2e20b493b785ac035b6af`;
const imageApiKey = `XhBtRYJAOGpOf68KRzlClSORtUXsoTwP7mJc0a8WyTo`;

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) return;

    // Fetch weather data
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    if (weatherData.cod === '404') {
        document.getElementById('weather-info').innerHTML = 'City not found.';
        return;
    }

    const { temp } = weatherData.main;
    const { humidity } = weatherData.main;
    const { description } = weatherData.weather[0];
    const weatherCondition = description.toLowerCase();

    // Fetch background image
    const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${weatherCondition}&client_id=${imageApiKey}`);
    const imageData = await imageResponse.json();

    if (imageData.results.length > 0) {
        document.body.style.backgroundImage = `url(${imageData.results[0].urls.regular})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
        document.body.style.backgroundImage = '';
    }

    document.getElementById('weather-info').innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Conditions: ${description}</p>
    `;
}


