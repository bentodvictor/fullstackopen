import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

export const list = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}