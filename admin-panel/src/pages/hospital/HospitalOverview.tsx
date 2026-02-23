import { useState } from 'react';
import { Stethoscope, FileText, Activity, Users, Clock, Search, Filter, MoreVertical, UserPlus, CalendarClock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const stats = [
    { label: 'Diagnostic Bookings', value: '28', icon: Activity, color: 'bg-purple-50 text-purple-600' },
    { label: 'OPD Consultations', value: '45', icon: Stethoscope, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Doctors', value: '12', icon: Users, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Reports', value: '7', icon: FileText, color: 'bg-orange-50 text-orange-600' },
];

const bookings = [
    {
        id: 'BK-2024-001',
        patient: 'Theresa Webb',
        type: 'MRI Scan (Brain)',
        doctor: 'Dr. Arlene McCoy',
        time: 'Today, 11:00 AM',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        id: 'BK-2024-002',
        patient: 'Ronald Richards',
        type: 'Blood Test (Complete Profile)',
        doctor: '-',
        time: 'Today, 09:30 AM',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        id: 'BK-2024-003',
        patient: 'Courtney Henry',
        type: 'X-Ray (Chest)',
        doctor: '-',
        time: 'Tomorrow, 10:00 AM',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    },
];

export default function HospitalOverview() {
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
    const [isManageSlotsModalOpen, setIsManageSlotsModalOpen] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleAddDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Doctor added successfully!');
        setIsAddDoctorModalOpen(false);
    };

    const handleManageSlots = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Slots updated successfully!');
        setIsManageSlotsModalOpen(false);
    };

    const handleApprove = (booking: typeof bookings[0]) => {
        toast.success(`Approved booking for ${booking.patient}`);
    };

    const handleCheckIn = (booking: typeof bookings[0]) => {
        toast.success(`Checked in ${booking.patient}`);
    };

    return (
        <>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hospital Administration</h1>
                    <p className="text-gray-500">Overview of facility operations</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsManageSlotsModalOpen(true)} className="gap-2">
                        <CalendarClock size={18} />
                        Manage Slots
                    </Button>
                    <Button onClick={() => setIsAddDoctorModalOpen(true)} className="gap-2">
                        <UserPlus size={18} />
                        Add Doctor
                    </Button>
                </div>
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
                    <h2 className="text-lg font-bold text-gray-900">Today's Bookings</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <Input placeholder="Search patient..." className="pl-9 w-[250px]" />
                        </div>
                        <div className="relative">
                            <Button
                                variant="outline"
                                className="px-3 gap-2"
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                            >
                                <Filter size={16} />
                                Filter
                            </Button>
                            {showFilterMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Showing all bookings'); setShowFilterMenu(false); }}>
                                        All Bookings
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering confirmed bookings'); setShowFilterMenu(false); }}>
                                        Confirmed Only
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering pending bookings'); setShowFilterMenu(false); }}>
                                        Pending Only
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service / Test</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Referred By</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img src={booking.image} alt={booking.patient} className="h-10 w-10 rounded-full object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{booking.patient}</p>
                                                <p className="text-xs text-gray-500">{booking.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Activity size={16} className="text-primary-500" />
                                            <span className="text-sm font-medium text-gray-900">{booking.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{booking.doctor}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={14} />
                                            {booking.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status === 'Pending' ? (
                                                <Button size="sm" onClick={() => handleApprove(booking)}>Approve</Button>
                                            ) : (
                                                <Button size="sm" variant="secondary" onClick={() => handleCheckIn(booking)}>Check In</Button>
                                            )}
                                            <button
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                                onClick={() => toast.info('More options coming soon')}
                                            >
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

            {/* Add Doctor Modal */}
            <Modal
                isOpen={isAddDoctorModalOpen}
                onClose={() => setIsAddDoctorModalOpen(false)}
                title="Add New Doctor"
                size="lg"
            >
                <form onSubmit={handleAddDoctor} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input placeholder="Dr. John Doe" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                                <option value="">Select specialization</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="General Medicine">General Medicine</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input type="email" placeholder="doctor@hospital.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <Input type="tel" placeholder="+1 (555) 000-0000" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                            <Input placeholder="MD-123456" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                            <Input type="number" placeholder="5" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                        <Input type="number" placeholder="100" required />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsAddDoctorModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Add Doctor
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Manage Slots Modal */}
            <Modal
                isOpen={isManageSlotsModalOpen}
                onClose={() => setIsManageSlotsModalOpen(false)}
                title="Manage Doctor Slots"
                size="lg"
            >
                <form onSubmit={handleManageSlots} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                            <option value="">Choose a doctor</option>
                            <option value="1">Dr. Arlene McCoy - Cardiology</option>
                            <option value="2">Dr. Robert Fox - Neurology</option>
                            <option value="3">Dr. Jenny Wilson - Pediatrics</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <Input type="date" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <Input type="time" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <Input type="time" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slot Duration (minutes)</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsManageSlotsModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save Slots
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
