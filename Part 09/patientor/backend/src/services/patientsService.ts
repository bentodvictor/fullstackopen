import { randomUUID } from "node:crypto";
import patients from "../../data/patients";
import { NewEntry, NewPatient, NonSensitivePatients, Patients } from "../types";

const getPatients = (): NonSensitivePatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
        return {
            id, name, dateOfBirth, gender, occupation, entries: entries ?? []
        };
    });
};

const addPatient = (entry: NewPatient): Patients => {
    const newPatient = {
        id: randomUUID(),
        ...entry,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patients | undefined => {
    const patient: Patients | undefined = patients?.find(p => p.id === id);

    if (!patient) {
        return undefined;
    }

    return {
        ...patient
    };
};

const addEntry = (id: string, entry: NewEntry): Patients | undefined => {
    const patient: Patients | undefined = patients?.find(p => p.id === id);
    if (!patient) return undefined;

    const newEntry = {
        id: randomUUID(),
        ...entry
    };

    patient.entries.push(newEntry);

    return patient;
};

export default {
    getPatients,
    addPatient,
    getPatient,
    addEntry
};