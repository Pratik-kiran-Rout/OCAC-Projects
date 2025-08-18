import React, { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import "./Weather.css";

// Simple geocoding via Open-Meteo's free endpoint (no API key)
async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error("City not found");
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, label: `${name}${country ? ", " + country : ""}` };
}

const WeatherApp = () => {
  const [weather, setWeather] = useState(null); // normalized structure
  const [city, setCity] = useState("London");

  const [error, setError] = useState("");

  async function loadWeatherByCity(targetCity) {
    setError("");
    try {
      // 1) Geocode
      const geo = await geocodeCity(targetCity);

      // 2) Fetch forecast for that location
      const params = {
        latitude: geo.latitude,
        longitude: geo.longitude,
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "rain",
          "precipitation",
          "precipitation_probability",
        ],
        current: ["temperature_2m", "rain", "relative_humidity_2m"],
        timezone: "auto",
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current();
      const hourly = response.hourly();

      // Build normalized data like the UI expects
      const weatherData = {
        name: geo.label,
        main: {
          temp: current.variables(0).value(), // temperature_2m °C
          feels_like: current.variables(0).value(), // Open-Meteo does not have "feels like" directly
          humidity: current.variables(2).value(),
          pressure: null, // not available in current selection
        },
        weather: [
          {
            main: current.variables(1).value() > 0 ? "Rain" : "Clear",
            description: current.variables(1).value() > 0 ? "rain" : "clear sky",
            icon: current.variables(1).value() > 0 ? "09d" : "01d",
          },
        ],
        wind: {
          speed: null, // not requested in this minimal setup
        },
        meta: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          hourly: {
            time: [
              ...Array(
                (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
              ).keys(),
            ].map(
              (i) =>
                new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0).valuesArray(),
            relative_humidity_2m: hourly.variables(1).valuesArray(),
            rain: hourly.variables(2).valuesArray(),
            precipitation: hourly.variables(3).valuesArray(),
            precipitation_probability: hourly.variables(4).valuesArray(),
          },
        },
      };

      setWeather(weatherData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load weather");
      setWeather(null);
    }
  }

  useEffect(() => {
    loadWeatherByCity(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await loadWeatherByCity(city);
  };

  const getWeatherIcon = (iconCode) => {
    const icons = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return icons[iconCode] || "🌤️";
  };

  if (error) {
    return (
      <div className="weather-app">
        <div className="weather-container">
          <h1 className="weather-title">Weather App</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="city-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-app">
        <div className="weather-container">
          <h1 className="weather-title">Weather App</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="city-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
          <div className="error-message">Type a city to get weather</div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="weather-title">Weather App</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="city-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="weather-card">
          <div className="weather-header">
            <h2 className="city-name">{weather.name}</h2>
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].icon)}</div>
          </div>

          <div className="temperature">
            <span className="temp-value">{Math.round(weather.main.temp)}°C</span>
            <span className="temp-feels-like">
              Feels like {Math.round(weather.main.feels_like)}°C
            </span>
          </div>

          <div className="weather-description">
            {weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weather.wind.speed ?? "-"} m/s</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.main.pressure ?? "-"} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;