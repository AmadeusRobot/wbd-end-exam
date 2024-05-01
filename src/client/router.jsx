import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PatientUser from "./pages/patient";
import Doctor from "./pages/doctor";
import BookAppointment from "./pages/book-appointment";

function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PatientUser />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/book/:id" element={<BookAppointment />} />
        </Routes>
    );
}

export default Router;
