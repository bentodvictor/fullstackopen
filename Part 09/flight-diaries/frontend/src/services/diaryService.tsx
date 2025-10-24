import axios from "axios";
import { DiaryEntry } from "../types";

interface CreateProps {
    date: string;
    visibility: string;
    weather: string;
    comment: string;
}

const baseUrl = '/api/diaries';

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;

};

const create = async ({ date, visibility, weather, comment }: CreateProps) => {
    const response = await axios.post(baseUrl, {
        date, visibility, weather, comment
    });
    return response.data;
}

export default {
    getAll,
    create,
}