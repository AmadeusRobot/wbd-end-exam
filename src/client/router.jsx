import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import PatientUser from "./pages/patient";
import Doctor from "./pages/doctor";

function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PatientUser />} />
            <Route path="/doctor" element={<Doctor />} />
        </Routes>
    );
}

export default Router;
