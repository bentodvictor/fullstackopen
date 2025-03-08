import { Gender, NewPatient } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
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