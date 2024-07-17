import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Left/SearchBar';
import WeatherDay from '../components/Right/WeatherDay';
import HighLight from '../components/Right/HighLight';
import { getWeatherByCity, getWeatherByCoords } from '../service/WeatherService';
import { WeatherResponse, Forecast } from '../types/weather-data.typing';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [selectedDay, setSelectedDay] = useState<Forecast | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); 

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherData = await getWeatherByCoords(latitude, longitude, unit);
          setWeatherData(weatherData);
          setSelectedDay(weatherData.list[0]); 
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    }
  };

  const handleSearchCity = async (cityName: string) => {
    setCity(cityName);
    try {
      const data = await getWeatherByCity(cityName, unit);
      setWeatherData(data);
      setSelectedDay(null); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleDayClick = (day: Forecast) => {
    setSelectedDay(day);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    fetchCurrentLocationWeather(); // Fetch weather data again with updated unit
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="lg:w-1/3">
        <SearchBar onSearchCity={handleSearchCity} onFetchCurrentLocationWeather={fetchCurrentLocationWeather} />
      </div>
      <div className="lg:w-2/3">
        <div className="flex flex-col">
          <div className="flex justify-end items-center mr-8">
            <button 
              onClick={toggleUnit}
              className={`rounded-full p-2 m-2 focus:outline-none ${unit === 'metric' ? 'bg-gray-500 text-white' : 'bg-white text-black'}`} 
              style={{minWidth: '40px', minHeight: '40px'}}
            >
              °C
            </button>
            <button 
              onClick={toggleUnit}
              className={`rounded-full p-2 m-2 focus:outline-none ${unit === 'imperial' ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
              style={{minWidth: '40px', minHeight: '40px'}}
            >
              °F
            </button>
          </div>
          <WeatherDay weatherData={weatherData} selectedDay={selectedDay} handleDayClick={handleDayClick} />
          <HighLight weatherData={weatherData} onFetchCurrentLocationWeather={fetchCurrentLocationWeather} />
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
