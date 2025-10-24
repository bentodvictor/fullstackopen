import { FormControl, TextField, Typography } from "@mui/material";

const Hospital = () => {
    return (
        <>
            <Typography variant="h6">Discharge</Typography>
            <div>
                <FormControl>
                    <TextField
                        required
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        id="discharge_date"
                        name="discharge_date"
                        type="date"></TextField>
                </FormControl>
                <FormControl>
                    <TextField required id="discharge_description" name="discharge_description" variant="outlined" label="Description"></TextField>
                </FormControl>
            </div>
        </>
    );
};

export default Hospital;