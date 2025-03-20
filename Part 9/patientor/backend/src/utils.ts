import { Diagnoses, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(
        z.object({
            description: z.string()
        })
    ).optional()
});

/**
 * The function `toNewPatient` converts an unknown object to a `NewPatient` object using a schema
 * parser.
 * @param {unknown} object - The `object` parameter in the `toNewPatient` function is of type
 * `unknown`, which means it can be any type of value. This function is designed to convert the input
 * object into a `NewPatient` type using the `NewPatientSchema.parse` method.
 * @returns The function `toNewPatient` is returning an object of type `NewPatient`.
 */
export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};


/* This code snippet is defining schemas for different types of entries in a medical record system
using Zod, a TypeScript-first schema declaration and validation library. Here's a breakdown of what
each part of the code is doing: */
const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnoses['code']>;
    }

    return object.diagnosisCodes as Array<Diagnoses['code']>;
};

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string(), // You might want to use regex or `.refine()` for date validation
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});
const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional()
});
const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema
});
export const NewEntrySchema = z.union([
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema
]);

export const toNewEntry = (object: unknown): NewEntry => {
    parseDiagnosisCodes(object);
    return NewEntrySchema.parse(object);
};