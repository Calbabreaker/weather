import { ForecastDay } from "lib/weather";
import dateformat from "dateformat";

interface ForecastProps {
    days: ForecastDay[];
}

export const Forecast: React.FC<ForecastProps> = ({ days }) => {
    return (
        <div className="forecast">
            {days.map((day) =>
                day.hour.map((hour, i) => (
                    <div className="forecast-item" key={i}>
                        <img src={"https:" + hour.condition.icon} alt={hour.condition.text} />
                        <span>
                            {dateformat(hour.time_epoch * 1000, "htt")} {hour.temp_c}°C
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};
