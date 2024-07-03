import { useEffect, useState } from "react";
import { getWeather } from "../services/weather";

export const Weather = ({ capitalName }) => {
    const [weather, setWeather] = useState(null);

    if (!capitalName) return;

    useEffect(() => {
        getWeather(capitalName)
            .then(res => setWeather(res))
            .catch(e => console.error(e));
    }, [capitalName]);

    if (!weather) return;

    return (
        <div>
            <h2>Weather in {capitalName}</h2>
            {Object.keys(weather.current_weather).map((cw, idx) => (
                <ul>
                    <li key={idx}><strong>{cw}</strong>: {weather.current_weather[cw]} {weather.current_weather_units[cw]}</li>
                </ul>
            ))}
        </div>
    )
}