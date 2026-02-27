import { Routes, Route, Navigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    ShieldCheck,
    MessageSquare,
    ClipboardList,
    PlusCircle,
    MoreVertical,
    Activity,
    CheckCircle2,
    XCircle,
    Settings,
    Bell,
    Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserRole } from '../../types/auth';
import { DashboardOverview } from '../../components/shared/DashboardOverview';
import { BookingManagement, Booking } from '../../components/shared/BookingManagement';
import { ReviewsRatings, Review } from '../../components/shared/ReviewsRatings';
import { cn } from '../../components/ui/Button';
import VerificationRequests from './VerificationRequests';

const ADMIN_SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/overview' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: ShieldCheck, label: 'Verification', path: '/admin/verification-requests' },
    { icon: Users, label: 'Providers', path: '/admin/providers' },
    { icon: ClipboardList, label: 'All Bookings', path: '/admin/bookings' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: ShieldCheck, label: 'Settings', path: '/admin/settings' },
];

const MOCK_SYSTEM_BOOKINGS: Booking[] = [
    { id: 'SYS-B1', patientName: 'System Test', service: 'Any Service', date: 'Oct 26, 2023', time: '12:00 PM', location: 'Global', status: 'completed', amount: '$100.00' }
];

const MOCK_SYSTEM_REVIEWS: Review[] = [
    { id: 'SYS-R1', patientName: 'Global User', rating: 4, date: 'Oct 26, 2023', comment: 'Overall system is fast and reliable.', service: 'Platform' }
];

export default function AdminDashboard() {
    return (
        <DashboardLayout
            role={UserRole.ADMIN}
            userName="Super Admin"
            sidebarItems={ADMIN_SIDEBAR_ITEMS}
        >
            <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<AdminOverview />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="verification-requests" element={<VerificationRequests />} />
                <Route path="providers" element={<ProviderManagement />} />
                <Route path="bookings" element={<BookingManagement bookings={MOCK_SYSTEM_BOOKINGS} />} />
                <Route path="reviews" element={<ReviewsRatings reviews={MOCK_SYSTEM_REVIEWS} isAdmin={true} />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Placeholder name="Admin Feature" />} />
            </Routes>
        </DashboardLayout>
    );
}

function AdminOverview() {
    return (
        <div className="space-y-10">
            <DashboardOverview />

            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">System Shortcuts</h4>
                        <p className="text-xs text-gray-500 font-medium">Quick actions for platform management</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ShortcutCard icon={Users} title="Approve Providers" desc="12 pending" color="emerald" />
                    <ShortcutCard icon={MessageSquare} title="Review Moderation" desc="5 flagged" color="rose" />
                    <ShortcutCard icon={Activity} title="System Health" desc="All systems operational" color="blue" />
                </div>
            </div>
        </div>
    );
}

function ShortcutCard({ icon: Icon, title, desc, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/60 border border-white/80 hover:shadow-lg transition-all group flex items-center gap-4 cursor-pointer">
            <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-500 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div>
                <h5 className="font-bold text-gray-900">{title}</h5>
                <p className="text-xs font-medium text-gray-500">{desc}</p>
            </div>
        </div>
    );
}

function AdminAnalytics() {
    return (
        <div className="space-y-10">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-8">Category Utilization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CategoryStat label="Doctor" value="45%" color="bg-primary" />
                    <CategoryStat label="Physio" value="25%" color="bg-blue-500" />
                    <CategoryStat label="Nursing" value="18%" color="bg-amber-500" />
                    <CategoryStat label="Pharmacy" value="12%" color="bg-emerald-500" />
                </div>
            </div>
        </div>
    );
}

function ProviderManagement() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Provider Management</h3>
                    <p className="text-gray-500 text-sm font-medium">Activate, deactivate, and monitor platform providers</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    <PlusCircle size={18} />
                    Add Provider
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-white/60 border border-white/60 rounded-3xl">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Providers</p>
                    <p className="text-3xl font-black text-gray-900">1,245</p>
                </div>
                <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Active Profiles</p>
                    <p className="text-3xl font-black text-emerald-600">1,180</p>
                </div>
                <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-3xl">
                    <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">Pending Verification</p>
                    <p className="text-3xl font-black text-rose-600">65</p>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-white/40">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Provider</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Bookings</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                        {[
                            { name: 'Dr. Sarah Johnson', cat: 'Doctor', status: 'Active', bookings: 124 },
                            { name: 'Nurse Emily Davis', cat: 'Nurse', status: 'Active', bookings: 86 },
                            { name: 'PT Michael Ross', cat: 'Physio', status: 'Inactive', bookings: 42 }
                        ].map((p, i) => (
                            <tr key={i} className="hover:bg-white/40 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 text-xs font-bold text-gray-500">{p.cat}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 flex w-fit items-center gap-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-100 text-gray-400'}`}>
                                        {p.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-black text-gray-700">{p.bookings}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Activate Provider">
                                        <CheckCircle2 size={16} />
                                    </button>
                                    <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Deactivate Provider">
                                        <XCircle size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function CategoryStat({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="p-6 bg-white/60 rounded-2xl border border-white/80">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">{label}</span>
                <span className="text-sm font-black text-gray-900">{value}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: value }}
                    className={cn("h-full", color)}
                />
            </div>
        </div>
    );
}

function Placeholder({ name }: { name: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
            <Activity size={64} className="mb-4 opacity-10" />
            <p className="font-bold uppercase tracking-widest text-sm">{name} Content</p>
        </div>
    );
}

function AdminSettings() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Platform Settings</h3>
                    <p className="text-gray-500 text-sm font-medium">Configure global application parameters</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-primary/5 text-primary font-bold border border-primary/10">
                        <Settings size={20} />
                        General Config
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-600 font-bold hover:bg-white/60 transition-colors">
                        <Lock size={20} />
                        Security & Auth
                    </button>
                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-600 font-bold hover:bg-white/60 transition-colors">
                        <Bell size={20} />
                        Notifications
                    </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-6">General Configuration</h4>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Platform Name</label>
                                <input type="text" defaultValue="Health@Home" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Support Email</label>
                                <input type="email" defaultValue="support@healthathome.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                    <h5 className="font-bold text-gray-900 text-sm">Maintenance Mode</h5>
                                    <p className="text-xs text-gray-500">Temporarily disable access for users</p>
                                </div>
                                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
