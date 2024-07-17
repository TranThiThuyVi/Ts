import axios from 'axios';
import { WeatherResponse } from '../types/weather-data.typing';

const API_KEY = '5caf59265a678ca70e57d4763ad8ddcc';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = async (cityName: string, unit: string = 'metric'): Promise<WeatherResponse> => {
  const response = await axios.get(`${BASE_URL}?q=${cityName}&units=${unit}&appid=${API_KEY}`);
  return response.data;
};

export const getWeatherByCoords = async (lat: number, lon: number, unit: string = 'metric'): Promise<WeatherResponse> => {
  const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
  return response.data;
};
