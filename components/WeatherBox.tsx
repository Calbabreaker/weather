import {
    faArrowUpLong,
    faCloudShowersHeavy,
    faDroplet,
    faSun,
    faWind,
} from "@fortawesome/free-solid-svg-icons";
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
                <div className="stats">
                    <span>
                        <FontAwesomeIcon icon={faWind} />
                        {weather.wind_kph} km/h
                        <FontAwesomeIcon
                            icon={faArrowUpLong}
                            style={{
                                transform: `rotate(${weather.wind_degree}deg)`,
                                marginLeft: "0.2rem",
                            }}
                        />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faDroplet} />
                        {weather.humidity}%
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faCloudShowersHeavy} />
                        {weather.precip_mm}mm
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faSun} />
                        {weather.uv}
                    </span>
                </div>
            </div>
        </div>
    );
};
