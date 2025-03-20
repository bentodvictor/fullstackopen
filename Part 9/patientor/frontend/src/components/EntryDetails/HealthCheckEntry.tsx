import { Card, CardContent, Divider, List, ListItem, ListSubheader, Typography } from "@mui/material";
import { HealthCheckEntry as HCE, HealthCheckRating } from "../../types";
import { LocalHospital, QrCode, Favorite } from "@mui/icons-material";

interface Props {
    entry: HCE
}

const healthCheckRatingIcon = (rating: HealthCheckRating): JSX.Element => {
    switch (rating) {
        case 0:
            return <><Favorite color="error" /> ({HealthCheckRating[rating]})</>;
        case 1:
            return <><Favorite color="success" />({HealthCheckRating[rating]})</>;
        case 2:
            return <><Favorite color="warning" />({HealthCheckRating[rating]})</>;
        default:
            return <><Favorite color="disabled" />({HealthCheckRating[rating]})</>;
    }
};

const HealthCheckEntry = ({ entry }: Props) => {
    return (<>
        <Card>
            <CardContent>
                <Typography variant='h6'>{<LocalHospital />} {entry.date} {entry.description}</Typography>
                <Typography>specialist: {entry.specialist}</Typography>
                {entry.diagnosisCodes && <List subheader={<ListSubheader>diagnosis codes</ListSubheader>}>
                    {entry.diagnosisCodes.map(dc => (
                        <ListItem key={dc}>{<QrCode />} {dc}</ListItem>
                    ))}
                </List>}
                <Divider />
                <Typography variant='h6'>health check rating</Typography>
                <Typography>health check: {healthCheckRatingIcon(entry.healthCheckRating)}</Typography>
            </CardContent>
        </Card>
    </>);

};

export default HealthCheckEntry;