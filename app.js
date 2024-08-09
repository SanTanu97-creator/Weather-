const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const body = document.querySelector("body");


search.addEventListener('click', () => {
    const apiKey = `05d8a9d269d581e75e3ff0176b6af23d`;
    const searchBox = document.querySelector(".search-box input");
    const city = searchBox.value.trim();

    if (city === '') {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            console.log("Weather condition:", json.weather[0].main);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                  
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':  // Combine similar cases
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
                    console.log("Default image used");
            }
        })
        .catch(error => {
            alert(error.message);
            
        });
});
