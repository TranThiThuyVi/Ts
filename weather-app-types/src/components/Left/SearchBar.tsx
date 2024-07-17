import React, { useState, useEffect } from 'react';
import { MdMyLocation, MdLocationOn } from 'react-icons/md';
import { getWeatherByCity, getWeatherByCoords } from '../../service/WeatherService';
import { WeatherResponse } from '../../types/weather-data.typing';

interface SearchBarProps {
  onSearchCity: (cityName: string) => void;
  onFetchCurrentLocationWeather: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchCity, onFetchCurrentLocationWeather }) => {
  const [city, setCity] = useState('');
  const [todayWeather, setTodayWeather] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const handleSearch = async () => {
    if (city.trim() !== '') {
      try {
        onSearchCity(city);  
        const weatherData = await getWeatherByCity(city);
        setTodayWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationString = `${latitude},${longitude}`;
          onSearchCity(locationString); 
          const weatherData = await getWeatherByCoords(latitude, longitude);
          setTodayWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      });
    }
    onFetchCurrentLocationWeather();
  };

  const formatDate = (dateString: number) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-700 text-white">
      <div className="flex justify-start w-full mb-4">
        <div className="relative w-full">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
            className="border rounded p-2 w-full text-black"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded p-2 ml-2"
        >
          Search
        </button>
        <button
          onClick={handleCurrentLocation}
          className="bg-slate-200 text-black rounded-full p-2 ml-2 flex items-center justify-center"
          style={{ minWidth: '40px', minHeight: '40px' }}
        >
          <MdMyLocation />
        </button>
      </div>
      {todayWeather && (
        <div className="mt-4 flex flex-col items-center">
          <>
            <img
              src={`http://openweathermap.org/img/wn/${todayWeather.list[0].weather[0].icon}@2x.png`}
              alt="weather icon"
              style={{ width: "13em" }}
            />
          </>
          <p className="text-[150px] oldstyle-nums">{Math.floor(todayWeather.list[0].main.temp)} °C</p>
          <p className="text-[40px] p-4">{todayWeather.list[0].weather[0].main}</p>
          <p>{formatDate(todayWeather.list[0].dt_txt)}</p>
          <div className="m-4 text-white flex items-center pt-10">
            <MdLocationOn size={24} className="mr-2" />
            <h2 className="text-xl font-bold">{todayWeather.city.name}, {todayWeather.city.country}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
