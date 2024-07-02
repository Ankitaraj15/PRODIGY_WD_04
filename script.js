document.addEventListener('DOMContentLoaded', () => {
    const weatherInfoDiv = document.getElementById('weather-info');
    const locationForm = document.getElementById('location-form');

    locationForm.addEventListener('submit', e => {
        e.preventDefault();
        const locationInput = document.getElementById('location').value;
        if (locationInput.trim() === '') {
            weatherInfoDiv.innerHTML = '<p>Please enter a location.</p>';
            return;
        }
        fetchWeatherData(locationInput);
    });

    function fetchWeatherData(location) {
        const apiKey = 'e1255338d7672cbdfee70e62bae39315';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        console.log(`Fetching weather data from: ${apiUrl}`);  // Debugging line

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                weatherInfoDiv.innerHTML = `<p>Failed to fetch weather data: ${error.message}</p>`;
            });
    }

    function displayWeatherData(data) {
        const { main, name, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        const icon = weather[0].icon;

        document.body.style.backgroundColor = getBackgroundColor(temperature);

        weatherInfoDiv.innerHTML = `
            <h2>${name}</h2>
            <div class="weather-details">
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>${description}</p>
                <p>${temperature}°C</p>
            </div>
        `;
    }

    function getBackgroundColor(temp) {
        if (temp <= 0) {
            return '#6495ED'; // Cold - Cornflower Blue
        } else if (temp > 0 && temp <= 10) {
            return '#87CEEB'; // Cool - Sky Blue
        } else if (temp > 10 && temp <= 20) {
            return '#90EE90'; // Mild - Light Green
        } else if (temp > 20 && temp <= 30) {
            return '#FFD700'; // Warm - Gold
        } else {
            return '#FF6347'; // Hot - Tomato Red
        }
    }
});
