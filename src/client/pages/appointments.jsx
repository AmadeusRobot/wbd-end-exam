import { Typography, Container, Stack } from "@mui/material";
import Header from "../components/header";
import PatientCard from "../components/patient-card";
import { useGetter } from "../hooks/fetcher";
import urls from "../../utils/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentCard from "../components/appointment-card";

export default function Appointments() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("endLabUser"))
    useEffect(() => {
        if(!user) {
            navigate("/login")
        }
    }, [navigate, user])
    const {data: appointments } = useGetter(urls.appointment.finByUser.replace("{{user}}", user?._id).replace("{{role}}", user?.role))
    console.log(appointments)
    return (
        <>
            <Header />
            <Container sx={{ paddingTop: "2.5rem"}}>
                <Typography variant="h3">
                    Your Appointments
                </Typography>
                <Stack flex flexDirection="row" flexWrap="wrap" gap="2rem" paddingTop="2rem">
                    {appointments && appointments.map(e => (
                        <AppointmentCard app={e} key={e?._id}/>
                    ))}
                </Stack>
            </Container>
        </>
    )
}