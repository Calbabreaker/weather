import { CurrentWeatherResponse } from "lib/weather";

interface WeatherBoxProps {
    data: CurrentWeatherResponse;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ data: { location, current } }) => {
    return (
        <div>
            <h1>
                {location.name}, {location.region}
            </h1>
            <p>{current.temp_c}°C</p>
            <p>{current.condition.text}</p>
        </div>
    );
};
