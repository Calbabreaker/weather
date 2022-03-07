import { CurrentWeatherResponse, formatLocation } from "lib/weather";

interface WeatherBoxProps {
    data: CurrentWeatherResponse;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ data: { location, current } }) => {
    return (
        <div>
            <h1>{current.temp_c}°C</h1>
            <div className="condition">
                <span>{current.condition.text}</span>
                <img src={current.condition.icon}></img>
            </div>
            <p>{formatLocation(location)}</p>
        </div>
    );
};
