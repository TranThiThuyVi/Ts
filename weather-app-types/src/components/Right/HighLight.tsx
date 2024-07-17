import React from "react";
import { WeatherResponse, Forecast, Main } from "../../types/weather-data.typing";

interface HighLightProps {
  weatherData: WeatherResponse | null;
  onFetchCurrentLocationWeather: () => void;
}

const HighLight: React.FC<HighLightProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { list } = weatherData;
  const { wind, visibility }: Forecast  = list[0];
  const { humidity, pressure }: Main = list[0].main;

  // Function to convert wind speed from m/s to mph
  const convertToMph = (metersPerSecond: number) => {
    return (metersPerSecond * 2.23694).toFixed(2);
  };

  // Function to convert wind direction from degrees to compass direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Convert visibility from meters to miles
  const visibilityInMiles = (visibility * 0.000621371).toFixed(2);

  // Calculate rotation degree for wind direction icon
  const rotationDegree = wind.deg - 45; 

  return (
    <div className="p-6 rounded-lg shadow-md lg:m-4 justify-center mb-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Today's Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-center h-32">
        <div className="p-4 rounded bg-slate-700">
          <h3 className="text-sm font-semibold">Wind Status</h3>
          <p className="text-[36px] oldstyle-nums">{convertToMph(wind.speed)} mph</p>
          <div className="flex mt-4 text-black items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-200 transform origin-center"
              style={{ transform: `rotate(${rotationDegree}deg)` }} 
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <div className="text-slate-200 ms-2">{getWindDirection(wind.deg)}</div>
          </div>
        </div>
        <div className="p-4 rounded bg-slate-700 h-40">
          <h3 className="text-sm font-semibold">Humidity</h3>
          <p className="text-[36px] oldstyle-nums">{humidity}%</p>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full mt-5"
              style={{ width: `${humidity}%` }}
            ></div>
          </div>
        </div>
        <div className="p-4 rounded bg-slate-700 h-32">
          <h3 className="text-sm font-semibold">Visibility</h3>
          <p className="text-[36px] oldstyle-nums">{visibilityInMiles} miles</p>
        </div>
        <div className="p-4 rounded bg-slate-700 h-32 justify-center">
          <h3 className="text-sm font-semibold ">Air Pressure</h3>
          <p className="text-[36px] oldstyle-nums">{pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default HighLight;
