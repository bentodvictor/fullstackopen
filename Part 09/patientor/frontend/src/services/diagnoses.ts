import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnoses } from "../types";

const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);

    return data;
};

export default {
    getDiagnoses
};
