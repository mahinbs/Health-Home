import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LayoutDashboard, Calendar, Stethoscope, FileText } from 'lucide-react';
import HospitalOverview from './HospitalOverview';
import HospitalBookings from './HospitalBookings';
import HospitalDoctors from './HospitalDoctors';
import HospitalReports from './HospitalReports';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/hospital/dashboard' },
    { icon: Calendar, label: 'Bookings', path: '/hospital/bookings' },
    { icon: Stethoscope, label: 'Doctors', path: '/hospital/doctors' },
    { icon: FileText, label: 'Reports', path: '/hospital/reports' },
];

export default function HospitalDashboard() {
    return (
        <DashboardLayout role="hospital" sidebarItems={sidebarItems}>
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<HospitalOverview />} />
                <Route path="bookings" element={<HospitalBookings />} />
                <Route path="doctors" element={<HospitalDoctors />} />
                <Route path="reports" element={<HospitalReports />} />
            </Routes>
        </DashboardLayout>
    );
}
