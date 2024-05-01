import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import PatientUser from './pages/patient';

function Router() {

  return (
    <Routes>
      <Route path="/login" element={<Login /> } />
      <Route path="/register" element={<Register /> } />
      <Route path="/user" element={<PatientUser /> } />
    </Routes>
  )
}

export default Router
