const API_KEY = "3d0ca6aaeeb129f34d6c52d54312ffb3"; 

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const messageDiv = document.getElementById("message");

const weatherCard = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const dateText = document.getElementById("dateText");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// When the button is clicked, call the API
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    showMessage("Please enter a city name.", "error");
    weatherCard.classList.add("hidden");
    return;
  }

  fetchWeather(city);
});

// Also allow pressing "Enter" key in the input
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

function fetchWeather(city) {
  // We use the "metric" units so temperature is in Celsius.
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&appid=" +
    API_KEY +
    "&units=metric";

  showMessage("Loading weather data...", "success");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        // If the city is not found or other error, we show a simple message.
        throw new Error("Could not find weather for that city.");
      }
      return response.json();
    })
    .then((data) => {
      // Debug log for students to see the structure
      console.log("API response:", data);
      displayWeather(data);
    })
    .catch((error) => {
      showMessage(error.message, "error");
      weatherCard.classList.add("hidden");
    });
}

function displayWeather(data) {
  // City and country
  cityName.textContent = data.name + ", " + (data.sys.country || "");

  // Simple date text
  const now = new Date();
  dateText.textContent = now.toLocaleString();

  // Temperature and description
  temperature.textContent = Math.round(data.main.temp) + "°C";
  description.textContent = data.weather[0].description;

  // Extra info
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;

  // Weather icon (provided by OpenWeatherMap)
  const iconCode = data.weather[0].icon; // e.g. "10d"
  const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  weatherIcon.src = iconUrl;

  // Show the card and clear message
  weatherCard.classList.remove("hidden");
  showMessage("The sky is synced. You’re all set! ✨", "success");
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = "message"; // reset classes
  if (type === "error") {
    messageDiv.classList.add("error");
  } else if (type === "success") {
    messageDiv.classList.add("success");
  }
}



