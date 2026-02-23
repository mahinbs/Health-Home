import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Clock,
    DollarSign,
    Star,
    Tag,
    Heart,
    Baby,
    Moon
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

const CARE_TAKER_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/caretaker/overview' },
    { icon: Calendar, label: 'Bookings', path: '/caretaker/bookings' },
    { icon: Clock, label: 'Availability', path: '/caretaker/availability' },
    { icon: Tag, label: 'Services & Fees', path: '/caretaker/services' },
    { icon: DollarSign, label: 'Earnings', path: '/caretaker/earnings' },
    { icon: Star, label: 'Reviews', path: '/caretaker/reviews' },
    { icon: UserCircle, label: 'Profile', path: '/caretaker/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-C01', patientName: 'Elderly Mr. Jones', service: 'Night Duty', date: 'Oct 30, 2023', time: '08:00 PM', location: '12 Nursing Home', status: 'accepted', amount: '$150.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-C1', name: 'Elderly Bed Care', category: 'Elder Care', price: '20', pricingType: 'Per Hour', status: 'Active' },
    { id: 'S-C2', name: 'Child Care', category: 'Kids', price: '15', pricingType: 'Per Hour', status: 'Active' },
    { id: 'S-C3', name: 'Night Duty', category: 'Special', price: '150', pricingType: 'Fixed', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-C1', patientName: 'Mrs. Jones', rating: 5, date: 'Oct 15, 2023', comment: 'Very gentle with my husband.', service: 'Elderly Bed Care' }
];

export default function CareTakerDashboard() {
    return (
        <DashboardLayout
            role={UserRole.CARETAKER}
            userName="Caretaker Anna"
            sidebarItems={CARE_TAKER_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<CareTakerOverview />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showMultiCity={false} showHomeToggle={true} showPhysicalToggle={false} />
                } />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['Elder Care', 'Kids', 'Special']}
                    />
                } />
                <Route path="earnings" element={<EarningsReports />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_REVIEWS} />} />
                <Route path="profile" element={<ProfileManagement />} />
            </Routes>
        </DashboardLayout>
    );
}

function CareTakerOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Care Services</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage your care packages and pricing</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CareServiceCard title="Elderly Bed Care" price="$20 / Hour" icon={Heart} />
                    <CareServiceCard title="Child Care" price="$15 / Hour" icon={Baby} />
                    <CareServiceCard title="Night Duty" price="$150 / Night" icon={Moon} />
                </div>
            </div>
        </div>
    );
}

function CareServiceCard({ title, price, icon: Icon }: { title: string, price: string, icon: any }) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-pink-50 text-pink-500 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className="text-pink-500 font-black text-lg">{price}</p>
        </div>
    );
}
