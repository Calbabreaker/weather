import { CurrentWeather } from "lib/weather";
import { FaLongArrowAltUp } from "react-icons/fa";

interface WeatherBoxProps {
    weather: CurrentWeather;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ weather }) => {
    return (
        <div className="weather">
            <img src={"https:" + weather.condition.icon}></img>
            <div>
                <h1>
                    {weather.temp_c}°C {weather.condition.text}
                </h1>
                <p>
                    {weather.wind_kph} km/h
                    <FaLongArrowAltUp style={{ transform: `rotate(${weather.wind_degree}deg)` }} />
                </p>
            </div>
        </div>
    );
};
