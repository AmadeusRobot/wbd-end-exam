import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function PatientCard({ doctor }) {
    return (
        <Card sx={{ width: 345, padding: ".25rem" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Doctor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hospital
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        $ {" "}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Book Appointment</Button>
            </CardActions>
        </Card>
    );
}