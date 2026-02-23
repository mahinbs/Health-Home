import { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const doctors = [
    {
        id: 1,
        name: 'Dr. Arlene McCoy',
        specialty: 'Cardiology',
        department: 'Heart & Vascular',
        status: 'Available',
        patients: '245',
        rating: 4.9,
        email: 'arlene.mccoy@hospital.com',
        phone: '+1 (555) 123-4567',
        experience: '15 years',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        id: 2,
        name: 'Dr. Robert Fox',
        specialty: 'Neurology',
        department: 'Brain & Spine',
        status: 'In Surgery',
        patients: '189',
        rating: 4.8,
        email: 'robert.fox@hospital.com',
        phone: '+1 (555) 234-5678',
        experience: '12 years',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        id: 3,
        name: 'Dr. Jenny Wilson',
        specialty: 'Pediatrics',
        department: 'Child Care',
        status: 'Available',
        patients: '312',
        rating: 4.9,
        email: 'jenny.wilson@hospital.com',
        phone: '+1 (555) 345-6789',
        experience: '10 years',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
        id: 4,
        name: 'Dr. Kristin Watson',
        specialty: 'Pediatrician',
        department: 'Pediatrics',
        status: 'Available',
        patients: '1.5k',
        rating: 4.7,
        email: 'kristin.watson@hospital.com',
        phone: '+1 (555) 456-7890',
        experience: '8 years',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150',
    }
];

export default function HospitalDoctors() {
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleAddDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Doctor added successfully!');
        setIsAddDoctorModalOpen(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Medical Staff</h1>
                    <p className="text-gray-500">Directory of doctors and specialists</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => setIsAddDoctorModalOpen(true)}
                >
                    <Plus size={18} />
                    Add Doctor
                </Button>
            </div>

            <div className="flex gap-4 mb-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input placeholder="Search doctor by name or specialty..." className="pl-9" />
                </div>
                <div className="relative">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                        <Filter size={16} />
                        Filter
                    </Button>
                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Showing all doctors'); setShowFilterMenu(false); }}>
                                All Specializations
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering Cardiology'); setShowFilterMenu(false); }}>
                                Cardiology
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering Neurology'); setShowFilterMenu(false); }}>
                                Neurology
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => { toast.info('Filtering Pediatrics'); setShowFilterMenu(false); }}>
                                Pediatrics
                            </button>
                        </div>
                    )}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                            <Input type="number" placeholder="5" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                            <Input type="number" placeholder="100" required />
                        </div>
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

            {/* View Profile Modal */}
            {selectedDoctor && (
                <Modal
                    isOpen={!!selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                    title="Doctor Profile"
                    size="lg"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className="h-20 w-20 rounded-full object-cover" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                                <p className="text-primary-600 font-medium">{selectedDoctor.specialty}</p>
                                <p className="text-sm text-gray-500">{selectedDoctor.experience} experience</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <p className="text-gray-900">{selectedDoctor.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                <p className="text-gray-900">{selectedDoctor.phone}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Patients</label>
                                <p className="text-gray-900">{selectedDoctor.patients}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedDoctor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedDoctor.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setSelectedDoctor(null)} className="flex-1">
                                Close
                            </Button>
                            <Button className="flex-1" onClick={() => { toast.success('Scheduling appointment...'); setSelectedDoctor(null); }}>
                                Schedule Appointment
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                                <img src={doc.image} alt={doc.name} className="h-24 w-24 rounded-full object-cover border-4 border-gray-50 group-hover:border-primary-50 transition-colors" />
                                <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${doc.status === 'Available' ? 'bg-green-500' :
                                    doc.status === 'In Surgery' ? 'bg-purple-500' :
                                        'bg-gray-400'
                                    }`} title={doc.status}></span>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
                            <p className="text-primary-600 text-sm font-medium mb-1">{doc.specialty}</p>
                            <p className="text-gray-500 text-xs mb-4">{doc.department}</p>

                            <div className="flex justify-center gap-6 text-sm text-gray-600 mb-6 border-t border-b border-gray-50 py-3">
                                <div>
                                    <p className="font-bold text-gray-900">{doc.patients}</p>
                                    <p className="text-xs">Patients</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{doc.rating}</p>
                                    <p className="text-xs">Rating</p>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-center">
                                <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0 flex items-center justify-center">
                                    <Phone size={14} />
                                </Button>
                                <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0 flex items-center justify-center">
                                    <Mail size={14} />
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 rounded-full"
                                    onClick={() => setSelectedDoctor(doc)}
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
