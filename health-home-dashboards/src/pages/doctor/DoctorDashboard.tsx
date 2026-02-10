import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Calendar, Users, MessageSquare, DollarSign } from 'lucide-react';
import DoctorOverview from './DoctorOverview';
import DoctorPatients from './DoctorPatients';
import DoctorMessages from './DoctorMessages';
import DoctorEarnings from './DoctorEarnings';

const sidebarItems = [
    { icon: Calendar, label: 'Appointments', path: '/doctor/dashboard' },
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: MessageSquare, label: 'Messages', path: '/doctor/messages' },
    { icon: DollarSign, label: 'Earnings', path: '/doctor/earnings' },
];

export default function DoctorDashboard() {
    return (
        <DashboardLayout role="doctor" sidebarItems={sidebarItems}>
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DoctorOverview />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="messages" element={<DoctorMessages />} />
                <Route path="earnings" element={<DoctorEarnings />} />
            </Routes>
        </DashboardLayout>
    );
}
