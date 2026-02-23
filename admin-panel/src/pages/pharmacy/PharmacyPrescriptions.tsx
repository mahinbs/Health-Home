import { Search, Filter, FileText, Check, X, Eye, TriangleAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const prescriptions = [
    {
        id: 'RX-8902',
        patient: 'Robert Fox',
        doctor: 'Dr. Emily Wilson',
        medications: 'Amoxicillin 500mg, Paracetamol',
        date: 'Oct 24, 2023',
        status: 'Pending Verification',
        priority: 'High'
    },
    {
        id: 'RX-8901',
        patient: 'Eleanor Pena',
        doctor: 'Dr. Sarah Smith',
        medications: 'Lisinopril 10mg',
        date: 'Oct 24, 2023',
        status: 'Verified',
        priority: 'Normal'
    },
    {
        id: 'RX-8900',
        patient: 'Wade Warren',
        doctor: 'Dr. James Doe',
        medications: 'Metformin 500mg, Insulin',
        date: 'Oct 23, 2023',
        status: 'Rejected',
        priority: 'Normal'
    }
];

export default function PharmacyPrescriptions() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Prescription Verification</h1>
                    <p className="text-gray-500">Review and verify patient prescriptions</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">history</Button>
                    <Button>Verify New</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <Input placeholder="Search prescription..." className="pl-9" />
                        </div>
                        <Button variant="outline">
                            <Filter size={16} />
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {prescriptions.map((rx) => (
                            <div key={rx.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between gap-4 hover:shadow-md transition-shadow">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-gray-900">{rx.id}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${rx.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                            rx.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            {rx.status}
                                        </span>
                                        {rx.priority === 'High' && (
                                            <span className="flex items-center gap-1 text-red-600 text-xs font-bold">
                                                <TriangleAlert size={12} /> High Priority
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 mb-1">Patient: {rx.patient}</p>
                                    <p className="text-xs text-gray-500 mb-2">Prescribed by {rx.doctor} • {rx.date}</p>
                                    <div className="bg-gray-50 px-3 py-2 rounded-lg inline-block">
                                        <p className="text-sm text-gray-700 font-medium">{rx.medications}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-col gap-2 justify-center">
                                    <Button size="sm" variant="outline" className="justify-start gap-2">
                                        <Eye size={16} /> View
                                    </Button>
                                    {rx.status === 'Pending Verification' && (
                                        <>
                                            <Button size="sm" className="justify-start gap-2 bg-green-600 hover:bg-green-700 text-white">
                                                <Check size={16} /> Approve
                                            </Button>
                                            <Button size="sm" variant="outline" className="justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50">
                                                <X size={16} /> Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details/Stats Column */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Pending Review Queue</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full text-orange-600 shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">12 Scripts</p>
                                        <p className="text-xs text-orange-700">Awaiting verification</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 my-4"></div>

                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Verification Guidelines</h4>
                                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                                    <li>Check patient identity match</li>
                                    <li>Verify dosage and frequency</li>
                                    <li>Check for drug interactions</li>
                                    <li>Confirm doctor's signature</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
