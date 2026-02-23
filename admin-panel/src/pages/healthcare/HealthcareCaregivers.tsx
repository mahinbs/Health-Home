import { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, Shield, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const caregivers = [
    {
        id: 1,
        name: 'Jenny Wilson',
        role: 'Registered Nurse',
        rating: 4.9,
        reviews: 124,
        status: 'On Duty',
        location: 'Springfield North',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
        phone: '+1 (555) 123-4567',
        specialties: ['Elderly Care', 'Post-Op']
    },
    {
        id: 2,
        name: 'Devon Lane',
        role: 'Physiotherapist',
        rating: 4.8,
        reviews: 89,
        status: 'Available',
        location: 'Springfield South',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150',
        phone: '+1 (555) 234-5678',
        specialties: ['Rehab', 'Massage']
    },
    {
        id: 3,
        name: 'Albert Flores',
        role: 'Home Health Aide',
        rating: 4.7,
        reviews: 56,
        status: 'On Duty',
        location: 'Downtown',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
        phone: '+1 (555) 345-6789',
        specialties: ['Daily Living', 'Mobility']
    },
    {
        id: 4,
        name: 'Kathryn Murphy',
        role: 'Nurse Practitioner',
        rating: 5.0,
        reviews: 42,
        status: 'On Leave',
        location: 'Westside',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150&h=150',
        phone: '+1 (555) 456-7890',
        specialties: ['Critical Care', 'Palliative']
    },
    {
        id: 5,
        name: 'Guy Hawkins',
        role: 'Physical Therapist',
        rating: 4.6,
        reviews: 38,
        status: 'Available',
        location: 'Eastside',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150',
        phone: '+1 (555) 567-8901',
        specialties: ['Sports Injury', 'Orthopedics']
    }
];

export default function HealthcareCaregivers() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCaregivers = caregivers.filter(cg =>
        cg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cg.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Caregiver Management</h1>
                    <p className="text-gray-500">Manage staff schedules and assignments</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => toast.success('Opening add caregiver form...')}
                >
                    <UserPlus size={18} />
                    Add New Caregiver
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                        placeholder="Search caregivers by name or role..."
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="gap-2 bg-white"
                    onClick={() => toast.info('Filter options coming soon')}
                >
                    <Filter size={16} />
                    Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaregivers.map((cg) => (
                    <div key={cg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <img src={cg.image} alt={cg.name} className="h-16 w-16 rounded-full object-cover border-2 border-gray-100" />
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cg.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                                    cg.status === 'Available' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {cg.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900">{cg.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{cg.role}</p>

                            <div className="flex items-center gap-1 text-sm text-yellow-500 mb-4">
                                <Star size={16} fill="currentColor" />
                                <span className="font-medium">{cg.rating}</span>
                                <span className="text-gray-400">({cg.reviews} reviews)</span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    {cg.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" />
                                    {cg.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-gray-400" />
                                    <div className="flex gap-1 flex-wrap">
                                        {cg.specialties.map((spec, i) => (
                                            <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => toast.info(`Viewing ${cg.name}'s profile`)}
                                >
                                    View Profile
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => toast.success(`Assigning task to ${cg.name}`)}
                                >
                                    Assign Task
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
