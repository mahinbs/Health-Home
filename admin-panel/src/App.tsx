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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './types/auth';
function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster position="top-right" richColors closeButton />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Role-Based Routes with Protection */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/doctor/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.DOCTOR]}>
                            <DoctorDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/medical-officer/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.MEDICAL_OFFICER]}>
                            <MedicalOfficerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/nurse/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.NURSE]}>
                            <NurseDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/physiotherapist/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.PHYSIOTHERAPIST]}>
                            <PhysiotherapistDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/caretaker/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.CARETAKER]}>
                            <CareTakerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/pharmacy/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.PHARMACY]}>
                            <PharmacyDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/laboratory/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.LABORATORY]}>
                            <LaboratoryDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/hospital/*" element={
                        <ProtectedRoute allowedRoles={[UserRole.HOSPITAL]}>
                            <HospitalDashboard />
                        </ProtectedRoute>
                    } />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
