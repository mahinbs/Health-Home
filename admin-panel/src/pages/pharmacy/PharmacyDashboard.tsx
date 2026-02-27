import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    UserCircle,
    Truck,
    Clock,
    DollarSign,
    Star,
    Tag,
    Pill
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

const PHARMACY_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/pharmacy/overview' },
    { icon: Calendar, label: 'Orders', path: '/pharmacy/orders' },
    { icon: Clock, label: 'Store Hours', path: '/pharmacy/hours' },
    { icon: Tag, label: 'Inventory', path: '/pharmacy/inventory' },
    { icon: DollarSign, label: 'Earnings', path: '/pharmacy/earnings' },
    { icon: Star, label: 'Reviews', path: '/pharmacy/reviews' },
    { icon: UserCircle, label: 'Store Profile', path: '/pharmacy/profile' },
];

const MOCK_ORDERS: Booking[] = [
    { id: 'ORD-1021', patientName: 'John Doe', service: 'Medicine Delivery', date: 'Oct 26, 2023', time: '10:00 AM', location: '123 Main St', status: 'pending', amount: '$45.00' }
];

const MOCK_INVENTORY: ServiceItem[] = [
    { id: 'INV-1', name: 'Paracetamol 500mg', category: 'Medicines', price: '5', pricingType: 'Fixed', status: 'Active' },
    { id: 'INV-2', name: 'Blood Pressure Monitor', category: 'Equipment', price: '45', pricingType: 'Fixed', status: 'Active' },
    { id: 'INV-3', name: 'Wheelchair (Rental)', category: 'Rental', price: '15', pricingType: 'Per Session', status: 'Active' }
];

const MOCK_REVIEWS: Review[] = [
    { id: 'R-PH1', patientName: 'Alice Johnson', rating: 4, date: 'Oct 20, 2023', comment: 'Fast delivery.', service: 'Medicine Delivery' }
];

export default function PharmacyDashboard() {
    return (
        <DashboardLayout
            role={UserRole.PHARMACY}
            userName="City Care Pharmacy"
            sidebarItems={PHARMACY_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<PharmacyOverview />} />
                <Route path="orders" element={<BookingManagement bookings={MOCK_ORDERS} />} />
                <Route path="hours" element={
                    <AvailabilityManagement showMultiCity={false} showHomeToggle={true} showDeliverySettings={true} showServiceRadius={true} showOnlineToggle={false} />
                } />
                <Route path="inventory" element={
                    <ServicePricingManagement
                        services={MOCK_INVENTORY}
                        categories={['Medicines', 'Equipment', 'Rental']}
                    />
                } />
                <Route path="earnings" element={<EarningsReports />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_REVIEWS} />} />
                <Route path="profile" element={<ProfileManagement role={UserRole.PHARMACY} />} />
            </Routes>
        </DashboardLayout>
    );
}

function PharmacyOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />
            <div className="bg-white/40 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Store Quick Actions</h4>
                        <p className="text-xs text-gray-500 font-medium">Manage inventory and active orders</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PharmacyCard title="Pending Orders" val="12" icon={Truck} color="orange" />
                    <PharmacyCard title="Low Stock Items" val="5" icon={Pill} color="rose" />
                </div>
            </div>
        </div>
    );
}

function PharmacyCard({ title, val, icon: Icon, color }: any) {
    const colorClasses = color === 'orange' ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-rose-50 text-rose-500 border-rose-100';
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${colorClasses.split(' ').slice(0, 2).join(' ')}`}>
                    <Icon size={20} />
                </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
            <p className={`font-black text-2xl ${colorClasses.split(' ')[1]}`}>{val}</p>
        </div>
    );
}
