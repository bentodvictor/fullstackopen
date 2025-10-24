import axios from "axios";

export const list = (name) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
    return request
        .then(res => res.data);
}