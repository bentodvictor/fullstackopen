import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (value: Entry): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;