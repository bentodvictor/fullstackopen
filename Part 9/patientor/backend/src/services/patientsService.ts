import { randomUUID } from "node:crypto";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatients, Patients } from "../types";

const getPatients = (): NonSensitivePatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id, name, dateOfBirth, gender, occupation
        };
    });
};

const addPatient = (entry: NewPatient): Patients => {
    const newPatient = {
        id: randomUUID(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};