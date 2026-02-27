import { useState } from 'react';
import {
    ShieldCheck,
    Check,
    X,
    Eye,
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

const MOCK_REQUESTS = [
    {
        id: 'VR-101',
        providerName: 'Dr. Sarah Johnson',
        role: 'Doctor',
        date: 'Oct 26, 2023',
        status: 'pending',
        documents: ['Aadhaar', 'Degree', 'Registration']
    },
    {
        id: 'VR-102',
        providerName: 'Michael Ross',
        role: 'Physiotherapist',
        date: 'Oct 25, 2023',
        status: 'pending',
        documents: ['Government ID', 'Physio License']
    },
    {
        id: 'VR-103',
        providerName: 'Lifeline Laboratory',
        role: 'Laboratory',
        date: 'Oct 24, 2023',
        status: 'pending',
        documents: ['GST', 'Address Proof', 'Registration']
    },
];

export default function VerificationRequests() {
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        setRequests(prev =>
            prev.map(r => r.id === id ? { ...r, status: action } : r)
        );
        toast.success(`Request ${id} ${action} successfully`);
    };

    const filteredRequests = requests.filter(r =>
        r.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
                    <p className="text-gray-500 font-medium text-sm">Review professional documents of service providers</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search providers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white min-w-[240px]"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 rounded-xl">
                        <Filter size={18} />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-white/40">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Request ID</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Provider</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Documents</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                        {filteredRequests.map((req) => (
                            <tr key={req.id} className="hover:bg-white/40 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg">
                                        {req.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{req.providerName}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{req.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                                        <Calendar size={14} />
                                        {req.date}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {req.documents.map((doc, idx) => (
                                            <span key={idx} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                                {doc}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={req.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" title="View Documents">
                                            <Eye size={18} />
                                        </button>
                                        {req.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(req.id, 'approved')}
                                                    className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req.id, 'rejected')}
                                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-gray-200 text-gray-400">
                    <ShieldCheck size={64} className="mb-4 opacity-10" />
                    <p className="font-bold uppercase tracking-widest text-sm text-center px-4">No matching verification requests</p>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const configs: any = {
        pending: {
            icon: Clock,
            label: 'Pending',
            className: 'text-orange-500 bg-orange-50'
        },
        approved: {
            icon: Check,
            label: 'Approved',
            className: 'text-emerald-500 bg-emerald-50'
        },
        rejected: {
            icon: AlertCircle,
            label: 'Rejected',
            className: 'text-rose-500 bg-rose-50'
        }
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return (
        <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg w-fit ${config.className}`}>
            <Icon size={12} />
            {config.label}
        </span>
    );
}
