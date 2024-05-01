import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function PatientCard({ doctor }) {
    const navigate = useNavigate()
    return (
        <Card sx={{ width: 345, padding: ".25rem" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {doctor?.hospital}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        $ {" "} {doctor?.fee}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/book/"+doctor?._id)}>Book Appointment</Button>
            </CardActions>
        </Card>
    );
}