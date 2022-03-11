interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Condition {
    text: number;
    icon: string;
    code: number;
}

export interface CurrentWeather {
    last_updated_epoch: number;
    temp_c: number;
    is_day: number;
    condition: Condition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    gust_kph: number;
}

interface ForecastHour {
    time_epoch: 1646697600;
    temp_c: 3.0;
    is_day: 0;
    condition: Condition;
    wind_kph: 16.2;
    wind_degree: 124;
    wind_dir: "SE";
    pressure_mb: 1019.0;
    pressure_in: 30.08;
    precip_mm: 0.0;
    precip_in: 0.0;
    humidity: 61;
    cloud: 0;
    feelslike_c: -0.9;
    windchill_c: -0.9;
    heatindex_c: 3.0;
    dewpoint_c: -3.8;
    will_it_rain: 0;
    chance_of_rain: 0;
    will_it_snow: 0;
    chance_of_snow: 0;
    vis_km: 10.0;
    gust_kph: 24.5;
    uv: 1.0;
}

export interface ForecastDay {
    date_epoch: number;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        avgvis_km: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: Condition;
        uv: number;
    };
    astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
    };
    hour: ForecastHour[];
}

export interface SearchLocation {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

export interface WeatherApiError {
    code: number;
    message: string;
}

export type SearchLocationsResponse = SearchLocation[] | { error: WeatherApiError };

export interface ForecastResponse {
    location: Location;
    current: CurrentWeather;
    forecast: { forecastday: ForecastDay[] };
    // note if there is error then previous fields will not be sent but easier to do it like this
    error?: WeatherApiError;
}

async function fetchApi(endPointAndQueries: string): Promise<any> {
    const url = `https://api.weatherapi.com/v1/${endPointAndQueries}&key=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getForecast(query: string, days: number): Promise<ForecastResponse> {
    return await fetchApi(`forecast.json?q=${query}&days=${days}&aqi=no&alerts=no`);
}

export async function searchLocation(query: string): Promise<SearchLocationsResponse> {
    return await fetchApi(`search.json?q=${query}`);
}

export function formatLocation(location: Location | SearchLocation): string {
    return `${location.name}, ${location.region}, ${location.country}`;
}
