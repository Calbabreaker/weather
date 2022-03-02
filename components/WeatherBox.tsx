import { CurrentWeatherResponse, formatLocation } from "lib/weather";

interface WeatherBoxProps {
    data: CurrentWeatherResponse;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ data: { location, current } }) => {
    return (
        <div>
            <h1>{current.temp_c}°C</h1>
            <p>{formatLocation(location)}</p>
            <p>{current.condition.text}</p>
        </div>
    );
};
