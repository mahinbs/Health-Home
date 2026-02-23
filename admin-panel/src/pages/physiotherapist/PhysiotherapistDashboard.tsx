import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Activity,
    Clock,
    DollarSign,
    Star,
    Tag,
    PersonStanding
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

const PHYSIO_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/physiotherapist/overview' },
    { icon: Calendar, label: 'Bookings', path: '/physiotherapist/bookings' },
    { icon: Clock, label: 'Availability', path: '/physiotherapist/availability' },
    { icon: Tag, label: 'Therapies & Fees', path: '/physiotherapist/services' },
    { icon: DollarSign, label: 'Earnings', path: '/physiotherapist/earnings' },
    { icon: Star, label: 'Reviews', path: '/physiotherapist/reviews' },
    { icon: UserCircle, label: 'Profile', path: '/physiotherapist/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-P21', patientName: 'Peter Quill', service: 'Back Pain Therapy', date: 'Oct 28, 2023', time: '02:00 PM', location: 'Clinic 2', status: 'accepted', amount: '$70.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-P1', name: 'Orthopedic Rehab', category: 'Rehabilitation', price: '80', pricingType: 'Per Session', status: 'Active' },
    { id: 'S-P2', name: 'Back Pain Therapy', category: 'Therapy', price: '70', pricingType: 'Per Session', status: 'Active' },
    { id: 'S-P3', name: 'Ultrasound Therapy', category: 'Advanced', price: '100', pricingType: 'Per Session', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-P1', patientName: 'Tony Stark', rating: 5, date: 'Oct 22, 2023', comment: 'Great back pain relief.', service: 'Back Pain Therapy' }
];

export default function PhysiotherapistDashboard() {
    return (
        <DashboardLayout
            role={UserRole.PHYSIOTHERAPIST}
            userName="PT Michael Ross"
            sidebarItems={PHYSIO_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<PhysioOverview />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showMultiCity={false} showHomeToggle={true} showServiceRadius={true} />
                } />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['Rehabilitation', 'Therapy', 'Advanced']}
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

function PhysioOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Physiotherapy Services</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage your therapy sessions and rehab programs</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PhysioServiceCard title="Orthopedic Rehab" price="$80 / Session" icon={Activity} />
                    <PhysioServiceCard title="Back Pain Therapy" price="$70 / Session" icon={PersonStanding} />
                </div>
            </div>
        </div>
    );
}

function PhysioServiceCard({ title, price, icon: Icon }: { title: string, price: string, icon: any }) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-500 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className="text-indigo-500 font-black text-lg">{price}</p>
        </div>
    );
}
