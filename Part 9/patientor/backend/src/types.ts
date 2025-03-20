import { z } from "zod";
import { NewEntrySchema, NewPatientSchema } from "./utils";

// Diagnoses
export type Diagnoses = {
    code: string;
    name: string;
    latin?: string
};


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CritialRisk" = 3
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnoses['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface SickLeaveEntry {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeaveEntry
}

interface DischargeEntry {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: DischargeEntry
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export type NonSensitivePatients = Omit<Patients, "ssn" | "entries">;

export type PatientDetails = Omit<Patients, "id" | "dateOfBirth" | "entries">;
// export type NewPatient = Omit<Patients, "id">;
export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;