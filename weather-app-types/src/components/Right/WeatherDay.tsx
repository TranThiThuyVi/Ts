import React from 'react';
import { WeatherResponse, Forecast } from '../../types/weather-data.typing';

interface WeatherDayProps {
  weatherData: WeatherResponse | null;
  selectedDay: Forecast | null;
  handleDayClick: (day: Forecast) => void;
}

const WeatherDay: React.FC<WeatherDayProps> = ({ weatherData, selectedDay, handleDayClick }) => {
  if (!weatherData || !weatherData.list) return null;
  const forecasts = weatherData.list.slice(1, 6);
  const getDayLabel = (index: number): string => {
    if (index === 0) return "Tomorrow";

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    return daysOfWeek[(today + index + 1) % 7];
  };

    

    return (
      <div className="mx-auto p-4 flex gap-10 text-white text-center">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {forecasts.map((day, index) => (
            <div
              key={day.dt}
              className={`day-forecast p-4 border rounded-lg ${selectedDay === day ? 'bg-slate-800' : 'bg-slate-600'}`}
              onClick={() => handleDayClick(day)} 
            >
              <p className="font-semibold">{getDayLabel(index)}</p>
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p> 
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="weather-icon"
              />
              <p className="text-sm text-gray-400 oldstyle-nums">
                <span className="mr-5">{Math.floor(day.main.temp_min)} °C</span>
                <span>{Math.floor(day.main.temp_max)} °C</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default WeatherDay;
