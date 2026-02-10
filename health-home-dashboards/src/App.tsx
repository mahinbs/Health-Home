import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/auth/Login';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import HealthcareDashboard from './pages/healthcare/HealthcareDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import HospitalDashboard from './pages/hospital/HospitalDashboard';

function App() {
    return (
        <Router>
            <Toaster position="top-right" richColors closeButton />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />

                {/* Doctor Routes */}
                <Route path="/doctor/*" element={<DoctorDashboard />} />

                {/* Healthcare Routes */}
                <Route path="/healthcare/*" element={<HealthcareDashboard />} />

                {/* Pharmacy Routes */}
                <Route path="/pharmacy/*" element={<PharmacyDashboard />} />

                {/* Hospital Routes */}
                <Route path="/hospital/*" element={<HospitalDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
