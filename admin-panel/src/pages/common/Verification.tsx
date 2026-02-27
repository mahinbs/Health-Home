import { useState } from 'react';
import {
    ShieldCheck,
    Upload,
    FileText,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Building2,
    CreditCard,
    FileSignature,
    XCircle
} from 'lucide-react';
import { Button, cn } from '../../components/ui/Button';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

const REQUIRED_DOCUMENTS = [
    { id: 'government_id', title: 'Government ID (Aadhaar/Other)', icon: CreditCard, description: 'Required for identity verification' },
    { id: 'degree', title: 'Professional Degree/Certificate', icon: FileSignature, description: 'Proof of professional qualification' },
    { id: 'registration', title: 'Registration Certificate', icon: ShieldCheck, description: 'Medical/Nursing/Physio Council registration' },
    { id: 'address_proof', title: 'Clinic/Lab Address Proof', icon: Building2, description: 'Electricity bill, Rent agreement, etc.' },
    { id: 'gst', title: 'GST Number (Optional)', icon: FileText, description: 'If applicable for your entity' },
];

interface VerificationProps {
    onComplete?: () => void;
    isSignupFlow?: boolean;
}

export default function Verification({ onComplete, isSignupFlow = false }: VerificationProps) {
    const { user, updateVerificationStatus } = useAuth();
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, File | null>>({});

    // Status is now derived from AuthContext or fixed if in signup flow
    const status = isSignupFlow ? 'not_started' : (user?.verificationStatus || 'not_started');

    const handleFileChange = (id: string, file: File | null) => {
        setUploadedDocs(prev => ({ ...prev, [id]: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const essentialDocs = REQUIRED_DOCUMENTS.filter(doc => doc.id !== 'gst');
        const missingDocs = essentialDocs.filter(doc => !uploadedDocs[doc.id]);

        if (missingDocs.length > 0) {
            toast.error(`Please upload all required documents: ${missingDocs.map(d => d.title).join(', ')}`);
            return;
        }

        if (isSignupFlow) {
            onComplete?.();
        } else {
            updateVerificationStatus('pending');
        }
        toast.success("Verification documents submitted successfully!");
    };

    if (status === 'pending') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center animate-pulse shadow-lg shadow-orange-500/10">
                    <ShieldCheck size={48} />
                </div>
                <div className="space-y-2 max-w-md">
                    <h2 className="text-3xl font-black text-gray-900">Verification Pending</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Our compliance team is reviewing your documents. This typically takes 24-48 hours. You will be notified via email once approved.
                    </p>
                </div>
                <Button variant="outline" onClick={() => updateVerificationStatus('not_started')} className="rounded-2xl px-8 h-12">
                    Withdraw & Re-submit
                </Button>
            </div>
        );
    }

    if (status === 'approved') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2 max-w-md">
                    <h2 className="text-3xl font-black text-gray-900">Account Verified</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Congratulations! Your account is now fully verified and visible to patients on the Health@Home marketplace.
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'rejected') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/10">
                    <XCircle size={48} />
                </div>
                <div className="space-y-2 max-w-md">
                    <h2 className="text-3xl font-black text-gray-900">Verification Rejected</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Your application was not approved due to incomplete or unclear documentation. Please review the requirements and re-submit.
                    </p>
                </div>
                <Button onClick={() => updateVerificationStatus('not_started')} className="rounded-2xl bg-rose-500 hover:bg-rose-600 text-white px-8 h-12">
                    Re-upload Documents
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-6">
            {!isSignupFlow && (
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Professional Verification</h1>
                    <p className="text-gray-500 font-medium">Upload necessary documents to activate your profile on the marketplace.</p>
                </div>
            )}

            <div className={cn(
                "bg-white/40 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl shadow-primary/5",
                isSignupFlow ? "p-4 border-none shadow-none bg-transparent backdrop-blur-none" : "p-8 lg:p-12"
            )}>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {REQUIRED_DOCUMENTS.map((doc) => (
                            <div key={doc.id} className="relative group">
                                <div className={`p-6 rounded-3xl border-2 transition-all duration-300 ${uploadedDocs[doc.id] ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 bg-white/50 hover:border-primary/20 hover:bg-white'}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-2xl ${uploadedDocs[doc.id] ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg transition-all'}`}>
                                            <doc.icon size={20} />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-bold text-gray-900 text-sm">{doc.title}</h4>
                                            <p className="text-xs text-gray-400 font-medium">{doc.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="relative flex items-center justify-center w-full h-12 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                                            />
                                            {uploadedDocs[doc.id] ? (
                                                <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                                    <CheckCircle2 size={14} />
                                                    {uploadedDocs[doc.id]?.name}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                                    <Upload size={14} />
                                                    Upload Document
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 rounded-[32px] bg-rose-50/50 border border-rose-100 flex items-start gap-4">
                        <AlertCircle className="text-rose-500 shrink-0" size={24} />
                        <div className="space-y-1">
                            <h5 className="font-bold text-rose-900 text-sm">Mandatory Requirement</h5>
                            <p className="text-xs text-rose-600 font-medium leading-relaxed">
                                Please ensure all documents are clear and legible. Rejection of documents may lead to delays in profile activation. Only PDF or image formats (JPG/PNG) are accepted.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary-600 text-white font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                            Submit for Verification
                            <ChevronRight className="ml-2" size={18} />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
