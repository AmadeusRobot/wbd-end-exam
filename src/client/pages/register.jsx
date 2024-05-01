import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { usePoster } from '../hooks/fetcher';
import urls from '../../utils/routes';
import { useEffect, useState } from 'react';
import { UserRoles } from '../../utils/roles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function Register() {
    const navigate = useNavigate()
    const { data, trigger, error, isMutating } = usePoster(urls.user.create)
    const [role, setRole] = useState(UserRoles.user)
    const handleChangeRole = (e) => setRole(e.target.value)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const req = {
            email: data.get('email'),
            password: data.get('password'),
            name: data.get('name'),
            dob: data.get('dob'),
            phone: data.get('phone'),
            role,
            ...([UserRoles.doctor, UserRoles.nurse].includes(role) && {
                hospital: data.get('hospital')
            })
        }
        await trigger(req)
    };

    useEffect(() => {
        if (!isMutating) {
            if (error) {
                console.log(error)
                return
            }
            if (data) {
                localStorage.setItem("endLabUser", JSON.stringify(data))
                navigate(`/${role}`)
            }
        }
    }, [data, error, isMutating, navigate, role])

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="dob"
                                label="Date Of Birth"
                                name="dob"
                                autoComplete="dob"
                                type='date'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Role"
                                    name='role'
                                    value={role}
                                    onChange={handleChangeRole}
                                >
                                    {Object.keys(UserRoles).map(e => (
                                        <MenuItem value={e} key={e}>{e}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {[UserRoles.doctor, UserRoles.nurse].includes(role) && (
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="hospital"
                                label="Hospital"
                                id="hospital"
                            />
                        </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}