import { Gender, NewPatient } from "./types";

// Check types and enums
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

// Parse function to validate if the request are in the correct type
const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Incorret or missing name: " + name);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Inorrect or missing date of birth: " + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn number: " + ssn);
    };
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender " + gender);
    };
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation " + occupation);
    };
    return occupation;
};

// Function responsible for check all request body
export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data!");
    };

    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const { name, dateOfBirth, ssn, gender, occupation } = object;
        const newPatient: NewPatient = {
            name: parseName(name),
            dateOfBirth: parseDateOfBirth(dateOfBirth),
            ssn: parseSsn(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation)
        };

        return newPatient;
    }

    throw new Error("Incorrect data: some fields are missing");
};