import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Stethoscope,
    Activity,
    Thermometer,
    ShieldAlert,
    Clock,
    DollarSign,
    Star,
    Tag,
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
import { cn } from '../../components/ui/Button';

const MO_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/medical-officer/overview' },
    { icon: Calendar, label: 'Bookings', path: '/medical-officer/bookings' },
    { icon: Clock, label: 'Availability', path: '/medical-officer/availability' },
    { icon: Tag, label: 'Procedures & Fees', path: '/medical-officer/services' },
    { icon: ShieldCheck, label: 'Verification', path: '/medical-officer/verification' },
    { icon: DollarSign, label: 'Earnings', path: '/medical-officer/earnings' },
    { icon: Star, label: 'Reviews', path: '/medical-officer/reviews' },
    { icon: UserCircle, label: 'Profile', path: '/medical-officer/profile' },
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK-9001', patientName: 'Alice Johnson', service: 'Primary Consultation', date: 'Oct 26, 2023', time: '10:00 AM', location: '123 Main St, Apt 4B', status: 'pending', amount: '$80.00' },
    { id: 'BK-9002', patientName: 'Mark Wilson', service: 'Wound Closure', date: 'Oct 26, 2023', time: '11:45 AM', location: 'Clinic Suite 201', status: 'accepted', amount: '$120.00' }
];

const MOCK_SERVICES: ServiceItem[] = [
    { id: 'SO-1', name: 'Primary Consultation', category: 'General', price: '80', pricingType: 'Fixed', status: 'Active' },
    { id: 'SO-2', name: 'Wound Closure', category: 'Procedures', price: '120', pricingType: 'Fixed', status: 'Active' },
    { id: 'SO-3', name: 'ECG Reading', category: 'Diagnostics', price: '50', pricingType: 'Fixed', status: 'Active' },
    { id: 'SO-4', name: 'Emergency Visit', category: 'Emergency', price: '150', pricingType: 'Per Visit', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-3', patientName: 'Tommy Lee', rating: 5, date: 'Oct 22, 2023', comment: 'Very careful with the procedure.', service: 'Wound Closure' }
];

export default function MedicalOfficerDashboard() {
    return (
        <DashboardLayout
            role={UserRole.MEDICAL_OFFICER}
            userName="Officer Michael Chen"
            sidebarItems={MO_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<MedicalOfficerOverview />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_BOOKINGS} />} />
                <Route path="availability" element={
                    <AvailabilityManagement showMultiCity={false} showHomeToggle={true} showServiceRadius={true} />
                } />
                <Route path="verification" element={<Verification />} />
                <Route path="services" element={
                    <ServicePricingManagement
                        services={MOCK_SERVICES}
                        categories={['General', 'Procedures', 'Diagnostics', 'Emergency']}
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

function MedicalOfficerOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Primary Care & Procedures</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage consultation fees and minor procedure charges</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProcedureCard title="Primary Consultation" price="$80" icon={Stethoscope} />
                    <ProcedureCard title="Minor Procedure" price="$120+" icon={Thermometer} />
                    <ProcedureCard title="ECG Reading" price="$50" icon={Activity} />
                    <ProcedureCard title="Emergency Visit" price="$150" icon={ShieldAlert} isEmergency />
                </div>
            </div>
        </div>
    );
}

function ProcedureCard({ title, price, icon: Icon, isEmergency }: { title: string, price: string, icon: any, isEmergency?: boolean }) {
    return (
        <div className={cn(
            "p-6 rounded-2xl bg-white/60 border hover:shadow-lg transition-all group hover:-translate-y-1",
            isEmergency ? "border-rose-100 bg-rose-50/20" : "border-white/80"
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className={cn(
                    "p-3 rounded-xl transition-transform",
                    isEmergency ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-primary/5 text-primary group-hover:scale-110"
                )}>
                    <Icon size={20} />
                </div>
                {isEmergency && (
                    <div className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        Critical
                    </div>
                )}
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className={cn("font-black text-lg", isEmergency ? "text-red-600" : "text-primary")}>{price}</p>
        </div>
    );
}
