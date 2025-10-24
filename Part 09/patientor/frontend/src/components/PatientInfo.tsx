import { useEffect, useState } from "react";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { useParams } from "react-router-dom";
import { Diagnoses, Gender, NewEntry, Patient } from "../types";
import { Male as MaleIcon, Female as FemaleIcon, Person as PersonIcon, ExpandMore } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Typography } from "@mui/material";
import axios from "axios";

const getGenderIcon = (gender: Gender): JSX.Element | null => {
    switch (gender) {
        case Gender.Male:
            return <MaleIcon />;
        case Gender.Female:
            return <FemaleIcon />;
        case Gender.Other:
            return <PersonIcon />;
        default:
            return null;
    }
};

const PatientInfo = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnoses[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    if (!id) {
        throw new Error();
    }

    if (error) {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    useEffect(() => {
        patientService.getDetails(id)
            .then((response: Patient) => {
                setPatient(response);
            })
            .catch(() => {
                setPatient(null);
            });
        diagnosesService.getDiagnoses()
            .then((response: Diagnoses[]) => {
                setDiagnoses(response);
            })
            .catch(() => {
                setDiagnoses(null);
            });
    }, [id]);

    const handleFormSubmit = async (values: NewEntry) => {
        try {
            const patient = await patientService.addEntry(id, values);
            setPatient(patient);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div>
            <br />
            {
                patient && diagnoses
                    ? (<>
                        <Typography variant="h2">{patient.name} {getGenderIcon(patient.gender)}</Typography>
                        <p>SSN: {patient.ssn}</p>
                        <p>Occupation: {patient.occupation}</p>
                        {error && <Alert severity="error">{error}.</Alert>}
                        <br />
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography component="span">Add new entry</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AddEntry onSubmit={handleFormSubmit} />
                            </AccordionDetails>
                        </Accordion>
                        <br />
                        <h3>entries</h3>
                        {patient.entries.map(p =>
                            <EntryDetails key={p.id} entry={p} />
                        )}
                    </>)
                    : (<>
                        <h3>Error trying to get user information.</h3>
                    </>)
            }
        </div>
    );
};

export default PatientInfo;