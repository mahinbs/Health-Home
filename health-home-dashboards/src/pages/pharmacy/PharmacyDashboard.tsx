import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ShoppingBag, Package, FileText, TrendingUp } from 'lucide-react';
import PharmacyOverview from './PharmacyOverview';
import PharmacyInventory from './PharmacyInventory';
import PharmacyPrescriptions from './PharmacyPrescriptions';
import PharmacySales from './PharmacySales';

const sidebarItems = [
    { icon: ShoppingBag, label: 'Orders', path: '/pharmacy/dashboard' },
    { icon: Package, label: 'Inventory', path: '/pharmacy/inventory' },
    { icon: FileText, label: 'Prescriptions', path: '/pharmacy/prescriptions' },
    { icon: TrendingUp, label: 'Sales', path: '/pharmacy/sales' },
];

export default function PharmacyDashboard() {
    return (
        <DashboardLayout role="pharmacy" sidebarItems={sidebarItems}>
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<PharmacyOverview />} />
                <Route path="inventory" element={<PharmacyInventory />} />
                <Route path="prescriptions" element={<PharmacyPrescriptions />} />
                <Route path="sales" element={<PharmacySales />} />
            </Routes>
        </DashboardLayout>
    );
}
