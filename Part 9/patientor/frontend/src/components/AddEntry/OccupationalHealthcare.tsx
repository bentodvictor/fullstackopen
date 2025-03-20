import { FormControl, TextField, Typography } from "@mui/material";

const OccupationalHealthcare = () => {
    return (
        <>
            <div>
                <FormControl>
                    <TextField
                        required
                        id="employer_name"
                        name="employer_name"
                        variant="outlined"
                        label="Employer Name"></TextField>
                </FormControl>
            </div>
            <Typography variant="h6">Sick leave</Typography>
            <div>
                <FormControl>
                    <TextField
                        required
                        label="Start Date"
                        InputLabelProps={{ shrink: true }}
                        id="start_date"
                        name="start_date"
                        type="date"></TextField>
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        label="End Date"
                        InputLabelProps={{ shrink: true }}
                        id="end_date"
                        name="end_date"
                        type="date"></TextField>
                </FormControl>
            </div>
        </>
    );
};

export default OccupationalHealthcare;