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

interface CurrentWeather {
    last_updated_epoch: number;
    temp_c: number;
    is_day: number;
    condition: {
        text: number;
        icon: string;
        code: number;
    };
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

export interface CurrentWeatherResponse {
    current: CurrentWeather;
    location: Location;
    // note if there is error then previous fields will not be sent but easier to do it like this
    error?: WeatherApiError;
}

export type SearchLocationsResponse = SearchLocation[] | { error: WeatherApiError };

async function fetchApi(endPointAndQueries: string): Promise<any> {
    const url = `https://api.weatherapi.com/v1/${endPointAndQueries}&key=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getCurrentWeather(query: string): Promise<CurrentWeatherResponse> {
    return await fetchApi(`current.json?aqi=no&q=${query}`);
}

export async function searchLocation(query: string): Promise<SearchLocationsResponse> {
    return await fetchApi(`search.json?q=${query}`);
}

export function formatLocation(location: Location | SearchLocation): string {
    return `${location.name}, ${location.region}, ${location.country}`;
}
