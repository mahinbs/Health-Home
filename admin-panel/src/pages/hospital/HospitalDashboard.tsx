import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Clock,
    DollarSign,
    Star,
    Tag,
    Building2,
    Users,
    Stethoscope,
    ShieldCheck
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardOverview } from '../../components/shared/DashboardOverview';
import Verification from '../common/Verification';
import { BookingManagement, Booking } from '../../components/shared/BookingManagement';
import { AvailabilityManagement } from '../../components/shared/AvailabilityManagement';
import { ProfileManagement } from '../../components/shared/ProfileManagement';
import { ServicePricingManagement, ServiceItem } from '../../components/shared/ServicePricingManagement';
import { ReviewsRatings, Review } from '../../components/shared/ReviewsRatings';
import { EarningsReports } from '../../components/shared/EarningsReports';
import { UserRole } from '../../types/auth';

const HOSPITAL_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/hospital/overview' },
    { icon: Calendar, label: 'OPD Bookings', path: '/hospital/bookings' },
    { icon: Clock, label: 'Schedules', path: '/hospital/availability' },
    { icon: Tag, label: 'Departments & Fees', path: '/hospital/services' },
    { icon: ShieldCheck, label: 'Verification', path: '/hospital/verification' },
    { icon: DollarSign, label: 'Revenue', path: '/hospital/earnings' },
    { icon: Star, label: 'Reviews', path: '/hospital/reviews' },
    { icon: UserCircle, label: 'Hospital Profile', path: '/hospital/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-H1', patientName: 'Tom Holland', service: 'Cardiology Consult', date: 'Oct 26, 2023', time: '11:00 AM', location: 'Dept B', status: 'accepted', amount: '$200.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-H1', name: 'General Physician Consult', category: 'OPD', price: '100', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-H2', name: 'Cardiologist Consult', category: 'Specialty', price: '250', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-H3', name: 'Complete Body Checkup', category: 'Packages', price: '450', pricingType: 'Fixed', status: 'Active' },
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-H1', patientName: 'Chris Evans', rating: 4, date: 'Oct 20, 2023', comment: 'Good hospital, well equipped.', service: 'Cardiology Consult' }
];

export default function HospitalDashboard() {
    return (
        <DashboardLayout
            role={UserRole.HOSPITAL}
            userName="City General Hospital"
            sidebarItems={HOSPITAL_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<HospitalOverview />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showOnlineToggle={true} showHomeToggle={false} />
                } />
                <Route path="verification" element={<Verification />} />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['OPD', 'Specialty', 'Packages']}
                    />
                } />
                <Route path="earnings" element={<EarningsReports />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_REVIEWS} />} />
                <Route path="profile" element={<ProfileManagement />} />
            </Routes>
        </DashboardLayout>
    );
}

function HospitalOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Hospital Departments</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage departmental operations</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HospCard title="Active Departments" val="14" icon={Building2} color="purple" />
                    <HospCard title="On-Duty Doctors" val="45" icon={Stethoscope} color="blue" />
                    <HospCard title="Admitted Patients" val="120" icon={Users} color="emerald" />
                </div>
            </div>
        </div>
    );
}

function HospCard({ title, val, icon: Icon, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 bg-${color}-50 text-${color}-500`}>
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className={`font-black text-2xl text-${color}-500`}>{val}</p>
        </div>
    );
}
