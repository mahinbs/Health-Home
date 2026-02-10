import { useState } from 'react';
import { Search, Filter, Calendar, Clock, FileText, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const bookings = [
    {
        id: 'BK-2001',
        patient: 'Theresa Webb',
        type: 'MRI Scan (Brain)',
        department: 'Radiology',
        doctor: 'Dr. Arlene McCoy',
        date: 'Oct 24, 2023',
        time: '11:00 AM',
        status: 'Confirmed',
        priority: 'Normal'
    },
    {
        id: 'BK-2002',
        patient: 'Ronald Richards',
        type: 'Blood Test (Complete Profile)',
        department: 'Pathology',
        doctor: '-',
        date: 'Oct 24, 2023',
        time: '09:30 AM',
        status: 'Pending',
        priority: 'High'
    },
    {
        id: 'BK-2003',
        patient: 'Courtney Henry',
        type: 'X-Ray (Chest)',
        department: 'Radiology',
        doctor: '-',
        date: 'Oct 25, 2023',
        time: '10:00 AM',
        status: 'Confirmed',
        priority: 'Normal'
    },
    {
        id: 'BK-2004',
        patient: 'Darrell Steward',
        type: 'General Consultation',
        department: 'General Medicine',
        doctor: 'Dr. Jenny Wilson',
        date: 'Oct 25, 2023',
        time: '02:00 PM',
        status: 'Cancelled',
        priority: 'Normal'
    }
];

export default function HospitalBookings() {
    const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

    const handleNewBooking = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Booking created successfully!');
        setIsNewBookingModalOpen(false);
    };
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                    <p className="text-gray-500">Manage diagnostic and consultation appointments</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => setIsNewBookingModalOpen(true)}
                >
                    <Calendar size={18} />
                    New Booking
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search patient, test type, or doctor..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Clock size={16} />
                            Today
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Filter size={16} />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{booking.patient}</span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <FileText size={10} /> {booking.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {booking.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col text-sm">
                                            <span className="font-medium text-gray-900">{booking.time}</span>
                                            <span className="text-gray-500 text-xs">{booking.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status === 'Pending' ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-green-600 hover:bg-green-50 border-green-200"
                                                        onClick={() => toast.success(`Approved booking for ${booking.patient}`)}
                                                    >
                                                        <CheckCircle size={16} />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 hover:bg-red-50 border-red-200"
                                                        onClick={() => toast.error(`Rejected booking for ${booking.patient}`)}
                                                    >
                                                        <XCircle size={16} />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => toast.info(`Viewing details for ${booking.patient}`)}
                                                >
                                                    View
                                                </Button>
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

            {/* New Booking Modal */}
            <Modal
                isOpen={isNewBookingModalOpen}
                onClose={() => setIsNewBookingModalOpen(false)}
                title="Create New Booking"
                size="lg"
            >
                <form onSubmit={handleNewBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                            <Input placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                            <Input placeholder="PT-2024-001" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                                <option value="">Select service</option>
                                <option value="diagnostic">Diagnostic Test</option>
                                <option value="consultation">OPD Consultation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Test/Service Name</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                                <option value="">Select test</option>
                                <option value="mri">MRI Scan</option>
                                <option value="ct">CT Scan</option>
                                <option value="xray">X-Ray</option>
                                <option value="blood">Blood Test</option>
                                <option value="ultrasound">Ultrasound</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                            <Input type="date" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                            <Input type="time" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referring Doctor (Optional)</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option value="">None</option>
                            <option value="1">Dr. Arlene McCoy</option>
                            <option value="2">Dr. Robert Fox</option>
                            <option value="3">Dr. Jenny Wilson</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            rows={3}
                            placeholder="Any special requirements or notes..."
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsNewBookingModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Create Booking
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
