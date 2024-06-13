import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b04a643500864e21822191558241106&q=${city},${country}&days=1&aqi=yes&alerts=yes`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className='Weather-app'>
      {!weatherData ? (
        <div className="Weather-top-fullscreen">
          <div className="Weather-top">
            <h1 className='h1'>Weather App</h1>
            <input
              className='input-top'
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city"
            />
            <input
              className='input-top'
              type="text"
              value={country}
              onChange={handleCountryChange}
              placeholder="Enter country"
            />
            <button className="but-top" onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <h1 className="Weather-top-H1">Please Search Something</h1>
        </div>
      ) : (
        <div>
          <div className="Weather-top">
            <h1 className='h1'>Weather App</h1>
            <input
              className='input-top'
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city"
            />
            <input
              className='input-top'
              type="text"
              value={country}
              onChange={handleCountryChange}
              placeholder="Enter country"
            />
            <button className="but-top" onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          {weatherData && (
            <div>
              <div className='Blur'>
                <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
                <div>
                  <h3>Current Weather</h3>
                  <p>Temperature: <b>{weatherData.current.temp_c} °C</b></p>
                  <p>Condition:<b> {weatherData.current.condition.text}</b></p>
                  <img className="Weather-img" src={weatherData.current.condition.icon} alt="weather icon" />
                </div>
              </div>
              <div>
                <h1 className='h2-hourly'>Hourly Weather</h1>
                <div className="hourly-weather">
                  <div className="hourly-cards">
                    {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                      <div key={index} className="weather-card">
                        <p>Time: <b>{hour.time}</b></p>
                        <p>Temperature:<b> {hour.temp_c} °C</b></p>
                        <p>Condition: <b>{hour.condition.text}</b></p>
                        <img src={hour.condition.icon} alt="weather icon" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="Forecast">
                <h1>Forecast</h1>
                <div className="Forecast-top">
                  <div className="Forecast-item">
                    <p>Date: <b>{weatherData.forecast.forecastday[0].date}</b></p>
                    <p>Max Temperature: <b>{weatherData.forecast.forecastday[0].day.maxtemp_c} °C</b></p>
                    <p>Min Temperature: <b>{weatherData.forecast.forecastday[0].day.mintemp_c} °C</b></p>
                    <p>Avg Temperature: <b>{weatherData.forecast.forecastday[0].day.avgtemp_c} °C</b></p>
                  </div>
                  <div className="Forecast-item">
                    <p>Chance of Rain: <b>{weatherData.forecast.forecastday[0].day.daily_chance_of_rain} %</b></p>
                    <p>Chance of Snow: <b>{weatherData.forecast.forecastday[0].day.daily_chance_of_snow} %</b></p>
                    <p>UV Index: <b>{weatherData.forecast.forecastday[0].day.uv}</b></p>
                  </div>
                  <div className="Forecast-item">
                    <p>Sunrise: <b>{weatherData.forecast.forecastday[0].astro.sunrise}</b></p>
                    <p>Sunset: <b>{weatherData.forecast.forecastday[0].astro.sunset}</b></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
