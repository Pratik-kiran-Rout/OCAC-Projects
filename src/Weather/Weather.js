import React, { useState, useEffect } from "react";
import "./Weather.css";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock weather data for demonstration
  const mockWeatherData = {
    name: "London",
    main: {
      temp: 22,
      feels_like: 24,
      humidity: 65,
      pressure: 1013
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d"
      }
    ],
    wind: {
      speed: 5.2
    },
       name: "New York",
    main: {
      temp: 24,
      feels_like: 24,
      humidity: 67,
      pressure: 1018
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "02d"
      }
    ],
    wind: {
      speed: 5.2
    }
  };

  useEffect(() => {
    // For demo purposes, using mock data
    // In a real app, you'd fetch from a weather API
    setWeather(mockWeatherData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      // Mock different weather data based on city
      const cities = {
        "london": { ...mockWeatherData, name: "London", main: { ...mockWeatherData.main, temp: 22 } },
        "new york": { ...mockWeatherData, name: "New York", main: { ...mockWeatherData.main, temp: 28 } },
        "tokyo": { ...mockWeatherData, name: "Tokyo", main: { ...mockWeatherData.main, temp: 25 } },
        "paris": { ...mockWeatherData, name: "Paris", main: { ...mockWeatherData.main, temp: 20 } }
      };
      
      const cityKey = city.toLowerCase();
      if (cities[cityKey]) {
        setWeather(cities[cityKey]);
      } else {
        setError("City not found. Try: London, New York, Tokyo, or Paris");
      }
      setLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (iconCode) => {
    // You can replace these with actual weather icons
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
      "50n": "🌫️"
    };
    return icons[iconCode] || "🌤️";
  };

  if (!weather) {
    return <div className="weather-loading">Loading weather data...</div>;
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
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="weather-card">
          <div className="weather-header">
            <h2 className="city-name">{weather.name}</h2>
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].icon)}
            </div>
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
              <span className="detail-value">{weather.wind.speed} m/s</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;