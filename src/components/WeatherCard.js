import React from "react";

function WeatherCard({ data, tempF }) {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <p><strong>Condition:</strong> {data.weather[0].description}</p>
      <p><strong>Temperature:</strong> {data.main.temp} °C / {tempF.toFixed(1)} °F</p>
      <p><strong>Humidity:</strong> {data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;
