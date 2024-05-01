import { Typography, Container } from "@mui/material";
import Header from "../components/header";

export default function PatientUser() {
    return (
        <>
            <Header />
            <Container sx={{ paddingTop: "2.5rem"}}>
                <Typography variant="h3">
                    Book Your Appointment
                </Typography>
            </Container>
        </>
    )
}