import { Typography, Container, Stack } from "@mui/material";
import Header from "../components/header";
import PatientCard from "../components/patient-card";
import { useGetter } from "../hooks/fetcher";
import urls from "../../utils/routes";

export default function PatientUser() {
    const { data: doctors } = useGetter(urls.user.doctors)
    console.log(doctors)
    return (
        <>
            <Header />
            <Container sx={{ paddingTop: "2.5rem"}}>
                <Typography variant="h3">
                    Book Your Appointment
                </Typography>
                <Stack flex flexDirection="row" flexWrap="wrap" gap="2rem" paddingTop="2rem">
                    <PatientCard />
                    <PatientCard />
                    <PatientCard />
                    <PatientCard />
                </Stack>
            </Container>
        </>
    )
}