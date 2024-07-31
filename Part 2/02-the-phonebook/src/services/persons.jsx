import axios from 'axios';
// local
// const baseUrl = 'http://localhost:3001/persons';
// using part 3 backend project 
const baseUrl = '/api/persons';

export const list = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data);
}

export const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(res => res.data);
}

export const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(res => res.data);
}

export const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data);
}