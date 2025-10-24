import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Entry, HealthCheckRating, NewEntry } from "../../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import { useForm } from "react-hook-form";

interface Props {
    onSubmit: (values: NewEntry) => void
}

const AddEntry = ({ onSubmit }: Props) => {
    const { reset } = useForm();
    const [entryType, setEntryType] = useState<string>("");
    const [entryContent, setEntryContent] = useState<JSX.Element>(<></>);
    const [codes, setCodes] = useState<string[]>([]);
    const [entryRating, setEntryRating] = useState<string>("");

    useEffect(() => {
        setEntryContent(<HealthCheck entryRating={entryRating} setEntryRating={setEntryRating} />);
    }, [entryRating]);

    const handleCodeChanges = (event: SelectChangeEvent<typeof codes>) => {
        const { value } = event.target;
        setCodes(typeof value === "string" ? value.split(',') : value);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const { value } = event.target;

        setEntryType(value);

        switch (value) {
            case "Hospital":
                setEntryContent(<Hospital />);
                break;
            case "OccupationalHealthcare":
                setEntryContent(<OccupationalHealthcare />);
                break;
            case "HealthCheck":
                setEntryContent(<HealthCheck entryRating={entryRating} setEntryRating={setEntryRating} />);
                break;
            default:
                setEntryContent(<></>);
                break;
        }
    };

    const handleFormSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const type = formData.get('type') as Entry['type'];
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const specialist = formData.get('specialist') as string;

        let newEntry: NewEntry;

        switch (type) {
            case "Hospital":
                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codes,
                    discharge: {
                        date: formData.get('discharge_date') as string,
                        criteria: formData.get('discharge_description') as string,
                    }
                };
                break;
            case "OccupationalHealthcare":
                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codes,
                    employerName: formData.get('employer_name') as string,
                    sickLeave: {
                        startDate: formData.get('start_date') as string,
                        endDate: formData.get('end_date') as string,
                    }
                };
                break;
            case "HealthCheck":
                const parsedRating = Number(entryRating);
                if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 3) {
                    throw new Error("Invalid health check rating.");
                }

                newEntry = {
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes: codes,
                    healthCheckRating: parsedRating as HealthCheckRating
                };
                break;
            default:
                throw new Error("Invalid entry type");
        }

        onSubmit(newEntry);
        reset();
    };

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed grey',
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}>
                <form onSubmit={handleFormSubmit}>
                    <Typography variant="h4">New Entry</Typography>
                    <div>
                        <FormControl>
                            <TextField required id="description" name="description" variant="outlined" label="Description"></TextField>
                        </FormControl>
                        <FormControl>
                            <TextField
                                required
                                label="Date"
                                InputLabelProps={{ shrink: true }}
                                id="date"
                                name="date"
                                type="date"></TextField>
                        </FormControl>
                        <FormControl>
                            <TextField required id="specialist" name="specialist" variant="outlined" label="Specialist"></TextField>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel>Diagnosis code</InputLabel>
                            <Select multiple id="codes" name="codes" value={codes} onChange={handleCodeChanges}>
                                <MenuItem value="A00">A00</MenuItem>
                                <MenuItem value="E11">E11</MenuItem>
                                <MenuItem value="I10">I10</MenuItem>
                                <MenuItem value="J45">J45</MenuItem>
                                <MenuItem value="M54.5">M54.5</MenuItem>
                                <MenuItem value="F32.1">F32.1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required variant="filled" sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel>Entry type</InputLabel>
                            <Select id="type" name="type" value={entryType} onChange={handleChange}>
                                <MenuItem value="Hospital">Hospital</MenuItem>
                                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                                <MenuItem value="HealthCheck">Health Check</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    {entryType !== "" && <Divider />}
                    <br />
                    <div>
                        <FormControl>
                            {entryContent}
                        </FormControl>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <div>
                        <FormControl>
                            <Button type="submit" size="large" variant="contained">Create</Button>
                        </FormControl>
                    </div>
                </form>
            </Box>
        </>
    );
};

export default AddEntry;