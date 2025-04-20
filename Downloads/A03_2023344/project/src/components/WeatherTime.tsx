import React, { useEffect, useState } from 'react';
import './WeatherTime.css';

interface WeatherData {
  weather: string;
  temp: number;
}

const WeatherTime: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData>({ weather: 'clear', temp: 25 });
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      
      // Check if it's daytime (between 6 AM and 6 PM)
      const hours = newTime.getHours();
      setIsDaytime(hours >= 6 && hours < 18);
    }, 1000);

    // Fetch weather data using Open-Meteo API
    const fetchWeather = async () => {
      try {
        // Mumbai coordinates
        const lat = 19.0760;
        const lon = 72.8777;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        const data = await response.json();
        
        // Convert weather code to our weather types
        const weatherCode = data.current.weather_code;
        let weatherType = 'clear';
        
        if (weatherCode >= 0 && weatherCode <= 3) weatherType = 'clear';
        else if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(weatherCode)) weatherType = 'rain';
        else if ([71,73,75,77,85,86].includes(weatherCode)) weatherType = 'snow';
        else if ([45,48].includes(weatherCode)) weatherType = 'clouds';
        
        setWeather({
          weather: weatherType,
          temp: Math.round(data.current.temperature_2m)
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    // Update weather every 30 minutes
    const weatherTimer = setInterval(fetchWeather, 1800000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  const getTimeColor = () => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) return '#E8B059'; // Morning
    if (hours >= 12 && hours < 17) return '#87CEEB'; // Afternoon
    if (hours >= 17 && hours < 20) return '#FF7F50'; // Evening
    return '#483D8B'; // Night
  };

  return (
    <div className={`weather-time-container ${isDaytime ? 'day' : 'night'}`}>
      <div className={`weather-animation ${weather.weather}`}>
        {/* Weather animation elements */}
        <div className="weather-elements"></div>
      </div>
      <div className="time" style={{ color: getTimeColor() }}>
        {time.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })}
      </div>
      <div className="temperature">
        {weather.temp}°C
      </div>
    </div>
  );
};

export default WeatherTime;
