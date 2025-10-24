import { Card, CardContent, Divider, List, ListItem, ListSubheader, Typography } from "@mui/material";
import { OccupationalHealthcareEntry as OHC } from "../../types";
import { LocalPostOffice, QrCode } from "@mui/icons-material";

interface Props {
    entry: OHC
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
    return (<>
        <Card>
            <CardContent>
                <Typography variant='h6'>{<LocalPostOffice />} {entry.date} {entry.description}</Typography>
                <Typography>specialist: {entry.specialist}</Typography>
                {entry.diagnosisCodes && <List subheader={<ListSubheader>diagnosis codes</ListSubheader>}>
                    {entry.diagnosisCodes.map(dc => (
                        <ListItem key={dc}>{<QrCode />} {dc}</ListItem>
                    ))}
                </List>}
                <Divider />
                <Typography>Employer: {entry.employerName}</Typography>
                <Typography variant='h6'>Sick leave</Typography>
                <Typography>Start date: {entry.sickLeave?.startDate}</Typography>
                <Typography>End date: {entry.sickLeave?.endDate}</Typography>
            </CardContent>
        </Card>
    </>);
};

export default OccupationalHealthcareEntry;