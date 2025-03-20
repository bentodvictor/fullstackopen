import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";

interface Props {
    entryRating: string,
    setEntryRating: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheck = ({ entryRating, setEntryRating }: Props) => {
    const handleChangeRating = (event: SelectChangeEvent) => {
        console.log("Selected value:", event.target.value);  // Should log 0,1,2,3 as string
        setEntryRating(event.target.value);
    };

    return (
        <>
            <Typography variant="h6">Health check rating</Typography>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="rating-label">Health Rating</InputLabel>
                    <Select
                        labelId="rating-label"
                        id="rating"
                        name="rating"
                        value={entryRating}
                        onChange={handleChangeRating}
                        label="Health Rating"
                    >
                        <MenuItem value="0">Healthy</MenuItem>
                        <MenuItem value="1">Low Risk</MenuItem>
                        <MenuItem value="2">High Risk</MenuItem>
                        <MenuItem value="3">Critical Risk</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    );
};

export default HealthCheck;