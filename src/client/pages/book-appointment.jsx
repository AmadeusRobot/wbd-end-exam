import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import { MuiFileInput } from 'mui-file-input'
import { useEffect, useState } from "react";
import { usePoster } from "../hooks/fetcher";
import urls from "../../utils/routes";

export default function BookAppointment() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("endLabUser"))
    console.log(user)
    const { doctor } = useParams()
    const [file, setFile] = useState(null)

    const handleChange = (newValue) => {
        setFile(newValue)
    }

    const { data, trigger, error, isMutating } = usePoster(urls.appointment.create)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.set("record", file, file.name)
        formData.set("doctor", doctor)
        formData.set("patient", user._id)
        await trigger(formData)
    }

    useEffect(() => {
        if (!isMutating) {
            if (error) {
                console.log(error)
                return
            }
            if (data) {
                alert("Successfully booked appointments")
                navigate(`/appointments`)
            }
        }
    }, [data, error, isMutating, navigate])

    return (
        <>
            <Header />
            <Container sx={{ paddingTop: "2.5rem" }}>
                <Typography variant="h3">
                    Book Your Appointment
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} flex flexDirection="column">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="dob"
                                name="appointmentTime"
                                type='date'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiFileInput
                                value={file}
                                onChange={handleChange}
                                label="Add medical record"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}