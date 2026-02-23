import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Stethoscope,
    Clock,
    PlusCircle,
    FileText,
    DollarSign,
    Star,
    Tag
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

const DOCTOR_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/doctor/overview' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
    { icon: Clock, label: 'Availability', path: '/doctor/availability' },
    { icon: Tag, label: 'Services & Fees', path: '/doctor/services' },
    { icon: DollarSign, label: 'Earnings', path: '/doctor/earnings' },
    { icon: Star, label: 'Reviews', path: '/doctor/reviews' },
    { icon: UserCircle, label: 'Profile', path: '/doctor/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-7821', patientName: 'Robert Fox', service: 'Online Consultation', date: 'Oct 24, 2023', time: '09:00 AM', location: 'Remote (Zoom)', status: 'pending', amount: '$150.00' },
    { id: 'BK-7822', patientName: 'Jane Cooper', service: 'Physical Visit', date: 'Oct 24, 2023', time: '11:00 AM', location: '123 Medical Center, NY', status: 'accepted', amount: '$200.00' },
    { id: 'BK-7823', patientName: 'Cody Fisher', service: 'Home Visit', date: 'Oct 25, 2023', time: '02:00 PM', location: '85 Bushwick Ave', status: 'completed', amount: '$350.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'S-1', name: 'Online Consultation', category: 'General', price: '150', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-2', name: 'Physical Visit (Clinic)', category: 'General', price: '200', pricingType: 'Fixed', status: 'Active' },
    { id: 'S-3', name: 'Home Visit', category: 'Special', price: '350', pricingType: 'Per Visit', status: 'Active' },
    { id: 'S-4', name: 'Second Opinion', category: 'Opinion', price: '300', pricingType: 'Fixed', status: 'Inactive' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-1', patientName: 'Alex Morgan', rating: 5, date: 'Oct 20, 2023', comment: 'Dr. Johnson was very attentive and professional.', service: 'Physical Visit' },
    { id: 'R-2', patientName: 'Sam Smith', rating: 4, date: 'Oct 18, 2023', comment: 'Good consultation online. Very clear instructions.', service: 'Online Consultation' }
];

export default function DoctorDashboard() {
    return (
        <DashboardLayout
            role={UserRole.DOCTOR}
            userName="Dr. Sarah Johnson"
            sidebarItems={DOCTOR_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<DoctorOverview />} />
                <Route path="appointments" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showMultiCity={true} showHomeToggle={true} showServiceRadius={true} />
                } />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['General', 'Special', 'Opinion']}
                        showCityWisePricing={true}
                        showEmergencyCharges={true}
                    />
                } />
                <Route path="earnings" element={<EarningsReports />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_REVIEWS} />} />
                <Route path="profile" element={<ProfileManagement role={UserRole.DOCTOR} />} />
            </Routes>
        </DashboardLayout>
    );
}

function DoctorOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Medical Specialty Services</h4>
                        <p className="text-xs text-gray-500 font-medium">Configure fees for specialized doctor services</p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/20 transition-all">
                        <PlusCircle size={14} />
                        Manage Settings
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SpecialtyServiceCard title="Online Consultation" price="$150" status="Active" icon={Stethoscope} />
                    <SpecialtyServiceCard title="Physical Consultation" price="$200" status="Active" icon={UserCircle} />
                    <SpecialtyServiceCard title="Second Opinion" price="$300" status="Inactive" icon={FileText} />
                </div>
            </div>
        </div>
    );
}

function SpecialtyServiceCard({ title, price, status, icon: Icon }: { title: string, price: string, status: string, icon: any }) {
    const isActive = status === 'Active';
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${isActive ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-100 text-gray-400'}`}>
                    {status}
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className="text-primary font-black text-lg">{price}</p>
        </div>
    );
}
