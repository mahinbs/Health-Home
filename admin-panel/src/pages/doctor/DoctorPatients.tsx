import { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, FileText, Calendar, Phone, Mail, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const patients = [
    {
        id: 'P001',
        name: 'Sarah Johnson',
        age: 28,
        gender: 'Female',
        condition: 'Migraine',
        lastVisit: 'Oct 24, 2023',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 123-4567'
    },
    {
        id: 'P002',
        name: 'Michael Chen',
        age: 45,
        gender: 'Male',
        condition: 'Hypertension',
        lastVisit: 'Oct 22, 2023',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        email: 'm.chen@example.com',
        phone: '+1 (555) 234-5678'
    },
    {
        id: 'P003',
        name: 'Emily Davis',
        age: 32,
        gender: 'Female',
        condition: 'Flu',
        lastVisit: 'Oct 20, 2023',
        status: 'Recovered',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
        email: 'emily.d@example.com',
        phone: '+1 (555) 345-6789'
    },
    {
        id: 'P004',
        name: 'James Wilson',
        age: 56,
        gender: 'Male',
        condition: 'Cardiac Checkup',
        lastVisit: 'Oct 15, 2023',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
        email: 'j.wilson@example.com',
        phone: '+1 (555) 456-7890'
    },
    {
        id: 'P005',
        name: 'Lisa Anderson',
        age: 41,
        gender: 'Female',
        condition: 'Diabetes Type 2',
        lastVisit: 'Oct 10, 2023',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
        email: 'lisa.a@example.com',
        phone: '+1 (555) 567-8901'
    }
];

export default function DoctorPatients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (patient: typeof patients[0]) => {
        toast.success(`Viewing details for ${patient.name}`);
    };

    const handleViewRecords = (patient: typeof patients[0]) => {
        toast.info(`Loading medical records for ${patient.name}`);
    };

    const handleAddPatient = () => {
        setIsAddModalOpen(true);
    };

    const handleSubmitNewPatient = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('New patient added successfully!');
        setIsAddModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
                    <p className="text-gray-500">Manage patient records and history</p>
                </div>
                <Button onClick={handleAddPatient} className="gap-2">
                    <UserPlus size={18} />
                    Add New Patient
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search by name or condition..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Showing all patients'); setShowFilterMenu(false); }}>
                                    All Patients
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering active patients'); setShowFilterMenu(false); }}>
                                    Active Only
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering recovered patients'); setShowFilterMenu(false); }}>
                                    Recovered Only
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Info</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Condition</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img src={patient.image} alt={patient.name} className="h-10 w-10 rounded-full object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                                                <p className="text-xs text-gray-500">{patient.age} yrs • {patient.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Mail size={12} /> {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Phone size={12} /> {patient.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={14} />
                                            {patient.lastVisit}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                                            {patient.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-500 hover:text-primary-600"
                                                onClick={() => handleViewDetails(patient)}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-500 hover:text-primary-600"
                                                onClick={() => handleViewRecords(patient)}
                                                title="View Medical Records"
                                            >
                                                <FileText size={16} />
                                            </Button>
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

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing {filteredPatients.length} patients</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" onClick={() => toast.info('Loading next page...')}>Next</Button>
                    </div>
                </div>
            </div>

            {/* Add Patient Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Patient"
                size="lg"
            >
                <form onSubmit={handleSubmitNewPatient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input placeholder="Enter patient name" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <Input type="number" placeholder="Age" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <Input type="tel" placeholder="+1 (555) 000-0000" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input type="email" placeholder="patient@example.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Condition</label>
                        <Input placeholder="e.g., Hypertension, Diabetes" required />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Add Patient
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
