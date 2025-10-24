import axios from "axios";

export const getWeather = (capitalName) => {
    const requestSearch = axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
            name: `${capitalName}`,
            count: 1
        }
    });

    return requestSearch.then(res => {
        const [result] = res.data.results;
        const requestForecast = axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: result.latitude,
                longitude: result.longitude,
                current_weather: true
            }
        });
        return requestForecast.then(res => res.data);
    })
}