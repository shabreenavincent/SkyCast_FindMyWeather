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
