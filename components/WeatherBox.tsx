import { ForcastResponse, formatLocation } from "lib/weather";
import { FaLongArrowAltUp } from "react-icons/fa";

interface WeatherBoxProps {
    data: ForcastResponse;
}

export const WeatherBox: React.FC<WeatherBoxProps> = ({ data: { location, current } }) => {
    return (
        <div className="weather">
            <img src={"https:" + current.condition.icon}></img>
            <div>
                <h1>
                    {current.temp_c}°C {current.condition.text}
                </h1>
                <p>
                    {current.wind_kph} km/h
                    <FaLongArrowAltUp style={{ transform: `rotate(${current.wind_degree}deg)` }} />
                </p>
            </div>
        </div>
    );
};
