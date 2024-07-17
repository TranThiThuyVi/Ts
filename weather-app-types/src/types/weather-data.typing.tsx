export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }
  
  export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
  }
  
  export interface Forecast {
    dt: number;
    main: Main;
    weather: Weather[];
    wind: Wind;
    visibility: number;
    dt_txt: number;
  }
  
  export interface WeatherResponse {
    city: {
      name: string;
      country: string;
    };
    list: Forecast[];
  }
  