import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import MedicalOfficerDashboard from './pages/medical-officer/MedicalOfficerDashboard';
import NurseDashboard from './pages/nurse/NurseDashboard';
import PhysiotherapistDashboard from './pages/physiotherapist/PhysiotherapistDashboard';
import CareTakerDashboard from './pages/caretaker/CareTakerDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import LaboratoryDashboard from './pages/laboratory/LaboratoryDashboard';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
    return (
        <Router>
            <Toaster position="top-right" richColors closeButton />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Role-Based Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/doctor/*" element={<DoctorDashboard />} />
                <Route path="/medical-officer/*" element={<MedicalOfficerDashboard />} />
                <Route path="/nurse/*" element={<NurseDashboard />} />
                <Route path="/physiotherapist/*" element={<PhysiotherapistDashboard />} />
                <Route path="/caretaker/*" element={<CareTakerDashboard />} />
                <Route path="/pharmacy/*" element={<PharmacyDashboard />} />
                <Route path="/laboratory/*" element={<LaboratoryDashboard />} />
                <Route path="/hospital/*" element={<HospitalDashboard />} />

                {/* 404 Redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
