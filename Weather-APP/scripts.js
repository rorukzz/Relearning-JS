const nameHeader = document.getElementById('name-header');

async function getCityFromCoordinates(latitude, longitude) {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await res.json();
    return data.city; // Ensure to return city or handle undefined cases
}

async function getCurrentWeather() {
    try {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords; // Get latitude and longitude

            const city = await getCityFromCoordinates(latitude, longitude);

            if (city) {
                const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=da2b726bd81c48d9bf0213458241010&q=${city}&aqi=no`);
                const data = await res.json();

                if (data) {
                    const weatherContainer = document.createElement('div');
                    weatherContainer.classList.add('weather-container');
                    document.body.appendChild(weatherContainer);
                
                    const nameHeader = document.createElement('h1'); // Create header for location
                    const nameHeaderData = `Current location: ${data.location.name}, ${data.location.region}, ${data.location.country}`;
                    nameHeader.textContent = nameHeaderData;
                    weatherContainer.appendChild(nameHeader); // Append location header to the weather container
                
                    const currentHeader = document.createElement('h2'); 
                    currentHeader.textContent = `Temperature: ${data.current.temp_c}°C, Condition: ${data.current.condition.text}`;
                    currentHeader.classList.add('temp-condition');
                    weatherContainer.appendChild(currentHeader);
                
                    const weatherIcon = document.createElement('img');
                    weatherIcon.src = `https:${data.current.condition.icon}`;
                    weatherIcon.alt = 'Weather Icon';
                    weatherIcon.width = 64;
                    weatherIcon.height = 64;
                    weatherIcon.classList.add('weather-icon');
                    weatherContainer.appendChild(weatherIcon);
                
                    const humidityInfo = document.createElement('h4');
                    humidityInfo.textContent = `Humidity: ${data.current.humidity}%`;
                    humidityInfo.classList.add('humidity-info');
                    weatherContainer.appendChild(humidityInfo);
                
                    const feelsLikeInfo = document.createElement('p');
                    feelsLikeInfo.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
                    feelsLikeInfo.classList.add('feels-like-info');
                    weatherContainer.appendChild(feelsLikeInfo);

                    // After fetching current weather, call the future weather function
                    getFutureWeather(latitude, longitude);
                }
            } else {
                console.error("City not found.");
            }
        }, (error) => {
            console.error("Error getting location: ", error);
        });
    } catch (error) {
        console.error("Error fetching from the API: ", error);
    }
}

async function getFutureWeather(latitude, longitude) {
    try {
        const city = await getCityFromCoordinates(latitude, longitude);
        if (city) {
            const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da2b726bd81c48d9bf0213458241010&q=${city}&days=5&aqi=no&alerts=no`);
            
            // Check if the response is okay
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            // Create a main container for the cards
            const mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container');
            document.body.appendChild(mainContainer);

            for (let i = 0; i < data.forecast.forecastday.length; i++) {
                const futureCard = document.createElement('div'); // Create a card for each weather item
                futureCard.classList.add('future-card');
                
                const futureWeatherDate = document.createElement('h3');
                futureWeatherDate.textContent = data.forecast.forecastday[i].date;
                
                const futureWeatherCondition = document.createElement('p');
                futureWeatherCondition.textContent = data.forecast.forecastday[i].day.condition.text;

                // Append the elements to the card
                futureCard.appendChild(futureWeatherDate);
                futureCard.appendChild(futureWeatherCondition);
                
                // Append the card to the main container
                mainContainer.appendChild(futureCard);
            }
        }
    } catch (error) {
        console.error('Error fetching city or weather data:', error);
    }
}

// Call the function to fetch the weather data
document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();  // Call getCurrentWeather when the DOM is fully loaded
});
