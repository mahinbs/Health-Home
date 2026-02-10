import { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, Video, MoreVertical, Check, X as XIcon, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const stats = [
    { label: 'Today\'s Appointments', value: '12', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending Requests', value: '4', icon: Clock, color: 'bg-orange-50 text-orange-600' },
    { label: 'Total Patients', value: '1,234', icon: Users, color: 'bg-green-50 text-green-600' },
    { label: 'Total Earnings', value: '$3,450', icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
];

const appointments = [
    {
        id: 1,
        patient: 'Sarah Johnson',
        age: 28,
        gender: 'Female',
        time: '09:00 AM',
        type: 'Video Consultation',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        symptoms: 'Severe headache, Nausea',
    },
    {
        id: 2,
        patient: 'Michael Chen',
        age: 45,
        gender: 'Male',
        time: '10:30 AM',
        type: 'Clinic Visit',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        symptoms: 'Back pain, Stiffness',
    },
    {
        id: 3,
        patient: 'Emily Davis',
        age: 32,
        gender: 'Female',
        time: '11:45 AM',
        type: 'Voice Call',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
        symptoms: 'Fever, Cold',
    },
    {
        id: 4,
        patient: 'James Wilson',
        age: 56,
        gender: 'Male',
        time: '02:00 PM',
        type: 'Video Consultation',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
        symptoms: 'Follow-up (Cardiology)',
    },
];

export default function DoctorOverview() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completed'>('upcoming');

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Smith</h1>
                <p className="text-gray-500">Here's your schedule for today</p>
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900">Appointments</h2>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                        {(['upcoming', 'pending', 'completed'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time & Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Symptoms</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img src={apt.image} alt={apt.patient} className="h-10 w-10 rounded-full object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{apt.patient}</p>
                                                <p className="text-xs text-gray-500">{apt.age} yrs • {apt.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{apt.time}</span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                {apt.type.includes('Video') ? <Video size={12} /> : apt.type.includes('Voice') ? <Phone size={12} /> : <Users size={12} />}
                                                {apt.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 truncate max-w-[200px]">{apt.symptoms}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            apt.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {apt.status === 'Pending' ? (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50 border-green-200">
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                                                        <XIcon size={16} />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button size="sm" variant="secondary">View Details</Button>
                                            )}
                                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
