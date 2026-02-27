import { ClipboardList, Users, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const stats = [
    { label: 'New Service Requests', value: '8', icon: ClipboardList, color: 'bg-pink-50 text-pink-600' },
    { label: 'Active Caregivers', value: '24', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed Visits', value: '156', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Assignments', value: '3', icon: AlertCircle, color: 'bg-orange-50 text-orange-600' },
];

const serviceRequests = [
    {
        id: 1,
        patient: 'Robert Fox',
        service: 'Nursing Care (12h)',
        location: '123 Main St, Springfield',
        date: 'Today, 2:00 PM',
        status: 'New',
        urgency: 'High',
    },
    {
        id: 2,
        patient: 'Eleanor Pena',
        service: 'Physiotherapy',
        location: '456 Oak Ave, Springfield',
        date: 'Tomorrow, 10:00 AM',
        status: 'Assigned',
        caregiver: 'Sarah J.',
        urgency: 'Medium',
    },
    {
        id: 3,
        patient: 'Wade Warren',
        service: 'Elderly Care',
        location: '789 Pine Ln, Springfield',
        date: 'Feb 12, 9:00 AM',
        status: 'New',
        urgency: 'Low',
    },
];

const activeCaregivers = [
    { id: 1, name: 'Jenny Wilson', role: 'Nurse', status: 'On Duty', location: 'Robert Fox' },
    { id: 2, name: 'Devon Lane', role: 'Physio', status: 'Available', location: '-' },
    { id: 3, name: 'Albert Flores', role: 'Attendant', status: 'On Duty', location: 'Guy Hawkins' },
];

export default function HealthcareOverview() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
                <p className="text-gray-500">Manage your caregivers and service requests</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Requests Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
                            <Button variant="outline" size="sm">View All</Button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {serviceRequests.map((req) => (
                                <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-4">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${req.urgency === 'High' ? 'bg-red-100 text-red-600' :
                                                req.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {req.patient.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{req.patient}</h3>
                                                <p className="text-sm text-gray-500">{req.service}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            {req.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gray-400" />
                                            {req.date}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button size="sm" className="w-full">Assign Caregiver</Button>
                                        <Button size="sm" variant="outline" className="w-full">Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active Caregivers Column */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Caregiver Status</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            {activeCaregivers.map((cg) => (
                                <div key={cg.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white/40 flex items-center justify-center text-gray-600 font-medium">
                                            {cg.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{cg.name}</p>
                                            <p className="text-xs text-gray-500">{cg.role}</p>
                                        </div>
                                    </div>
                                    <span className={`h-2.5 w-2.5 rounded-full ${cg.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-300'
                                        }`} title={cg.status} />
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <Button variant="ghost" size="sm" className="w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                                View All Staff
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
