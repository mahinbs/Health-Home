import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Activity,
    Syringe,
    HeartPulse,
    Clock,
    DollarSign,
    Star,
    Tag,
    BedDouble
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardOverview } from '../../components/shared/DashboardOverview';
import { BookingManagement, Booking } from '../../components/shared/BookingManagement';
import { AvailabilityManagement } from '../../components/shared/AvailabilityManagement';
import { ProfileManagement } from '../../components/shared/ProfileManagement';
import { ServicePricingManagement, ServiceItem } from '../../components/shared/ServicePricingManagement';
import { ReviewsRatings, Review } from '../../components/shared/ReviewsRatings';
import { EarningsReports } from '../../components/shared/EarningsReports';
import { UserRole } from '../../types/auth';

const NURSE_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/nurse/overview' },
    { icon: Calendar, label: 'Bookings', path: '/nurse/bookings' },
    { icon: Clock, label: 'Availability', path: '/nurse/availability' },
    { icon: Tag, label: 'Services & Fees', path: '/nurse/services' },
    { icon: DollarSign, label: 'Earnings', path: '/nurse/earnings' },
    { icon: Star, label: 'Reviews', path: '/nurse/reviews' },
    { icon: UserCircle, label: 'Profile', path: '/nurse/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-N10', patientName: 'John Davis', service: 'ICU Home Care', date: 'Oct 26, 2023', time: '10:00 AM', location: '45 Sunset Blvd', status: 'pending', amount: '$200.00' },
    { id: 'BK-N11', patientName: 'Mary Smith', service: 'Ortho Dressing', date: 'Oct 26, 2023', time: '11:45 AM', location: 'Clinic A', status: 'completed', amount: '$50.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-N1', name: 'Sample Collection', category: 'Diagnostics', price: '30', pricingType: 'Per Visit', status: 'Active' },
    { id: 'S-N2', name: 'ICU Home Care', category: 'Home Care', price: '40', pricingType: 'Per Hour', status: 'Active' },
    { id: 'S-N3', name: 'Bed Care', category: 'Home Care', price: '300', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-N4', name: 'Immunization', category: 'Procedures', price: '25', pricingType: 'Per Visit', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-N1', patientName: 'Sarah M.', rating: 5, date: 'Oct 21, 2023', comment: 'Extremely professional and caring.', service: 'ICU Home Care' }
];

export default function NurseDashboard() {
    return (
        <DashboardLayout
            role={UserRole.NURSE}
            userName="Nurse Emily Davis"
            sidebarItems={NURSE_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<NurseOverview />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showMultiCity={false} showHomeToggle={true} showServiceRadius={true} />
                } />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['Diagnostics', 'Home Care', 'Procedures']}
                        showEmergencyCharges={true}
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

function NurseOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Nursing Specializations</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage your nursing services and care packages</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NurseServiceCard title="Sample Collection" price="$30 / Visit" icon={Activity} />
                    <NurseServiceCard title="ICU Home Care" price="$40 / Hour" icon={HeartPulse} />
                    <NurseServiceCard title="Bed Care" price="$300 / Day" icon={BedDouble} />
                    <NurseServiceCard title="Immunization" price="$25 / Injection" icon={Syringe} />
                </div>
            </div>
        </div>
    );
}

function NurseServiceCard({ title, price, icon: Icon }: { title: string, price: string, icon: any }) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className="text-rose-500 font-black text-lg">{price}</p>
        </div>
    );
}
