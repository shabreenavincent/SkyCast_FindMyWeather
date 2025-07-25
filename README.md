# SkyCast - Find My Weather
## Date:
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
## Weather.js code:
```
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Weather() {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "cd47a859eea74758b1684113251107";

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, navigate]);

  if (loading) return <div className="weather-wrapper"><p>Loading...</p></div>;
  if (error) return <div className="weather-wrapper"><p>{error}</p></div>;

  const { name, country } = weatherData.location;
  const { temp_c, condition, last_updated } = weatherData.current;

  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <h2>{name}, {country}</h2>
        <p><strong>{temp_c}°C</strong></p>
        <p>{condition.text}</p>
        <img src={`https:${condition.icon}`} alt={condition.text} />
        <p>Last updated: {last_updated}</p>
      </div>
    </div>
  );
}

export default Weather
```

## weathercard.js code:
```
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

```
## home.js code:
```
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!city.trim()) {
        setError("Please enter a city name.");
      } else {
        setError("");
        navigate("/weather", { state: { city } });
      }
    },
    [city, navigate]
  );

  return (
    <div className="container">
      <h1>SkyCast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
```
## app.js coe:
```
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

```
## app.css code:
```
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.app-container {
  width: 100%;
}

.container {
  background: #ffffffdd;
  padding: 30px;
  margin: 20px auto;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
}

input {
  padding: 10px;
  width: 70%;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #0072ff;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #005bd1;
}

.weather-card {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #f1f1f1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
  margin-top: 10px;
}
```

## Output:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c8e6544c-356d-49d0-a4e6-a48be02cb231" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/db84f961-e7ae-4abd-9453-11324d77e37e" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
