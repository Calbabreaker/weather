import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CurrentWeather } from "lib/weather";

interface WeatherBoxProps {
    weather: CurrentWeather;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ weather }) => {
    return (
        <div className="weather">
            <img src={"https:" + weather.condition.icon} alt={weather.condition.text} />
            <div>
                <h1>
                    {weather.temp_c}°C {weather.condition.text}
                </h1>
                <p>
                    {weather.wind_kph} km/h
                    <FontAwesomeIcon
                        className="arrow"
                        icon={faArrowUpLong}
                        style={{ transform: `rotate(${weather.wind_degree}deg)` }}
                    />
                </p>
            </div>
        </div>
    );
};
