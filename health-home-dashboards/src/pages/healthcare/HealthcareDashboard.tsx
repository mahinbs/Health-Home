import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ClipboardList, Users, Activity, FileText } from 'lucide-react';
import HealthcareOverview from './HealthcareOverview';
import HealthcareCaregivers from './HealthcareCaregivers';
import HealthcareActiveServices from './HealthcareActiveServices';
import HealthcareReports from './HealthcareReports';

const sidebarItems = [
    { icon: ClipboardList, label: 'New Requests', path: '/healthcare/dashboard' },
    { icon: Users, label: 'Caregivers', path: '/healthcare/caregivers' },
    { icon: Activity, label: 'Active Services', path: '/healthcare/active' },
    { icon: FileText, label: 'Reports', path: '/healthcare/reports' },
];

export default function HealthcareDashboard() {
    return (
        <DashboardLayout role="healthcare" sidebarItems={sidebarItems}>
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<HealthcareOverview />} />
                <Route path="caregivers" element={<HealthcareCaregivers />} />
                <Route path="active" element={<HealthcareActiveServices />} />
                <Route path="reports" element={<HealthcareReports />} />
            </Routes>
        </DashboardLayout>
    );
}
