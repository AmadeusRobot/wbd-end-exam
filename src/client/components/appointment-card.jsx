import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppointmentCard({ app }) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("endLabUser"))
    useEffect(() => {
        if(!user) {
            navigate("/login")
        }
    }, [navigate, user])

    return (
        <Card sx={{ width: 345, padding: ".25rem" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {app?.doctor?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {app?.doctor?.hospital}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        $ {" "} {app?.doctor?.fee}
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    {app?.appointmentTime}
                </Typography>

            </CardContent>
            <CardActions>
                {/* <Button size="small" onClick={() => navigate("/book/"+doctor?._id)}>Book Appointment</Button> */}
            </CardActions>
        </Card>
    );
}