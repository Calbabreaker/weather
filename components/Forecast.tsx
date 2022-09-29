import { ForecastDay, ForecastHour } from "lib/weather";
import { DateTime } from "luxon";

interface ForecastProps {
    days: ForecastDay[];
}

export const Forecast: React.FC<ForecastProps> = ({ days }) => {
    const now = DateTime.now();
    return (
        <div className="forecast">
            {days.map((day) =>
                day.hour.map((hour, i) => <HourForecast key={i} hour={hour} now={now} />)
            )}
        </div>
    );
};

interface HourForecastProps {
    hour: ForecastHour;
    now: DateTime;
}

const HourForecast: React.FC<HourForecastProps> = ({ hour, now }) => {
    const dateTime = DateTime.fromSeconds(hour.time_epoch);
    if (dateTime > now) {
        return (
            <div className="forecast-item">
                <img src={"https:" + hour.condition.icon} alt={hour.condition.text} />
                <span>
                    <span>{hour.temp_c}°C</span>
                    {dateTime.toLocaleString(DateTime.TIME_SIMPLE)}
                </span>
            </div>
        );
    } else return null;
};
