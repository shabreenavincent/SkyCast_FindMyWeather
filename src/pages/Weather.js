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