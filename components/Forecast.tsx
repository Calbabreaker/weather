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
                    <div key={i}>
                        {dateformat(hour.time_epoch, "hhtt")} {hour.temp_c}°C {hour.condition.text}
                    </div>
                ))
            )}
        </div>
    );
};
