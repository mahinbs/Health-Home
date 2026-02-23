import { Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const activeServices = [
    {
        id: 'SRV-201',
        patient: 'Robert Fox',
        service: 'Nursing Care - 12h Shift',
        caregiver: 'Jenny Wilson',
        location: '123 Main St, Springfield',
        startTime: '08:00 AM',
        endTime: '08:00 PM',
        status: 'In Progress',
        progress: 65,
        notes: 'Patient vitals stable. Medication administered at 10 AM.'
    },
    {
        id: 'SRV-202',
        patient: 'Eleanor Pena',
        service: 'Physiotherapy Session',
        caregiver: 'Devon Lane',
        location: '456 Oak Ave, Springfield',
        startTime: '02:00 PM',
        endTime: '03:30 PM',
        status: 'Scheduled',
        progress: 0,
        notes: 'Focus on lower back exercises.'
    },
    {
        id: 'SRV-203',
        patient: 'Wade Warren',
        service: 'Elderly Companion Care',
        caregiver: 'Albert Flores',
        location: '789 Pine Ln, Springfield',
        startTime: '09:00 AM',
        endTime: '01:00 PM',
        status: 'Completed',
        progress: 100,
        notes: 'Walk in the park. Lunch preparation.'
    }
];

export default function HealthcareActiveServices() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Active Services</h1>
                <p className="text-gray-500">Real-time tracking of ongoing healthcare services</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{service.patient}</h3>
                                    <p className="text-sm text-gray-500">{service.service}</p>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${service.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                    service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        'bg-orange-100 text-orange-800'
                                    }`}>
                                    {service.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span>{service.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${service.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${service.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-gray-400" />
                                    <span>Caregiver: <span className="font-medium text-gray-900">{service.caregiver}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{service.startTime} - {service.endTime}</span>
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    {service.location}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
                                <span className="font-medium text-gray-900">Latest Note: </span>
                                {service.notes}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                                <Button size="sm" className="flex-1 gap-1">
                                    Track Live <ArrowRight size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
