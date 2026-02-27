import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Clock,
    DollarSign,
    Star,
    Tag,
    Microscope,
    Activity,
    FlaskConical,
    ShieldCheck
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardOverview } from '../../components/shared/DashboardOverview';
import Verification from '../common/Verification';
import { BookingManagement, Booking } from '../../components/shared/BookingManagement';
import { AvailabilityManagement } from '../../components/shared/AvailabilityManagement';
import { ProfileManagement } from '../../components/shared/ProfileManagement';
import { ServicePricingManagement, ServiceItem } from '../../components/shared/ServicePricingManagement';
import DepartmentManagement from './DepartmentManagement';
import { ReviewsRatings, Review } from '../../components/shared/ReviewsRatings';
import { EarningsReports } from '../../components/shared/EarningsReports';
import { UserRole } from '../../types/auth';

const LAB_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/laboratory/overview' },
    { icon: Calendar, label: 'Appointments', path: '/laboratory/appointments' },
    { icon: Clock, label: 'Available Slots', path: '/laboratory/availability' },
    { icon: Tag, label: 'Tests & Pricing', path: '/laboratory/services' },
    { icon: Microscope, label: 'Departments', path: '/laboratory/departments' },
    { icon: ShieldCheck, label: 'Verification', path: '/laboratory/verification' },
    { icon: DollarSign, label: 'Earnings', path: '/laboratory/earnings' },
    { icon: Star, label: 'Reviews', path: '/laboratory/reviews' },
    { icon: UserCircle, label: 'Lab Profile', path: '/laboratory/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-L10', patientName: 'Mark Williams', service: 'Complete Blood Count', date: 'Oct 26, 2023', time: '09:00 AM', location: 'Lab Center', status: 'accepted', amount: '$35.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-L1', name: 'Complete Blood Count', category: 'Blood Tests', price: '35', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-L2', name: 'Chest X-Ray', category: 'X-Ray', price: '80', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-L3', name: 'MRI Scan Brain', category: 'MRI', price: '450', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-L4', name: 'Home Sample Collection', category: 'Special', price: '20', pricingType: 'Per Visit', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-LB1', patientName: 'Jane Smith', rating: 5, date: 'Oct 19, 2023', comment: 'Very clean facility and polite staff.', service: 'Chest X-Ray' }
];

export default function LaboratoryDashboard() {
    return (
        <DashboardLayout
            role={UserRole.LABORATORY}
            userName="Diagnostic Center X"
            sidebarItems={LAB_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<LabOverview />} />
                <Route path="appointments" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="departments" element={<DepartmentManagement />} />
                <Route path="availability" element={
                    <AvailabilityManagement showOnlineToggle={false} showHomeToggle={true} showServiceRadius={true} showSlotCapacity={true} />
                } />
                <Route path="verification" element={<Verification />} />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['Blood Tests', 'X-Ray', 'MRI', 'Special']}
                        showHomeVisitCharges={true}
                    />
                } />
                <Route path="earnings" element={<EarningsReports />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_REVIEWS} />} />
                <Route path="profile" element={<ProfileManagement />} />
            </Routes>
        </DashboardLayout>
    );
}

function LabOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Diagnostic Capabilities</h4>
                        <p className="text-xs text-gray-500 font-medium">Overview of testing facilities</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LabCard title="Blood Analysis" icon={FlaskConical} color="cyan" />
                    <LabCard title="Imaging Services" icon={Activity} color="indigo" />
                    <LabCard title="Advanced Diagnostics" icon={Microscope} color="purple" />
                </div>
            </div>
        </div>
    );
}

function LabCard({ title, icon: Icon, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 bg-${color}-50 text-${color}-500`}>
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
        </div>
    );
}
