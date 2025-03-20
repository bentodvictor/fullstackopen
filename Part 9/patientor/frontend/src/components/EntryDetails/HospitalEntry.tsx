import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { HospitalEntry as HE } from '../../types';
import { Divider, List, ListItem, ListSubheader, Typography } from '@mui/material';
import { LocalHospital, QrCode } from '@mui/icons-material';

interface Props {
    entry: HE
}

const HospitalEntry = ({ entry }: Props) => {
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
                <Typography variant='h6'>discharge</Typography>
                <Typography>date: {entry.discharge.date}</Typography>
                <Typography>criteria: {entry.discharge.criteria}</Typography>
            </CardContent>
        </Card>
    </>);
};

export default HospitalEntry;