import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PatientUser from "./pages/patient";
import Doctor from "./pages/doctor";
import BookAppointment from "./pages/book-appointment";
import Appointments from "./pages/appointments";

function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PatientUser />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/book/:doctor" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointments />} />
        </Routes>
    );
}

export default Router;
