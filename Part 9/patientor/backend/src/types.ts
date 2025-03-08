import { z } from "zod";
import { NewPatientSchema } from "./utils";

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Diagnoses = {
    code: string;
    name: string;
    latin?: string
};

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type NonSensitivePatients = Omit<Patients, "ssn">;

// export type NewPatient = Omit<Patients, "id">;
export type NewPatient = z.infer<typeof NewPatientSchema>;