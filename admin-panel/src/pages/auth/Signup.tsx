import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
import {
    Stethoscope,
    Building2,
    Pill,
    Activity,
    UserCircle,
    FlaskConical,
    Heart,
    Accessibility,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import Verification from '../common/Verification';

// Exclude admin from signup
const roles = [
    { id: 'doctor', title: 'Doctor', icon: Stethoscope, color: 'text-blue-500 bg-blue-50' },
    { id: 'medical-officer', title: 'Officer', icon: Activity, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'nurse', title: 'Nurse', icon: UserCircle, color: 'text-rose-500 bg-rose-50' },
    { id: 'physiotherapist', title: 'Physio', icon: Accessibility, color: 'text-indigo-500 bg-indigo-50' },
    { id: 'caretaker', title: 'Caretaker', icon: Heart, color: 'text-pink-500 bg-pink-50' },
    { id: 'pharmacy', title: 'Pharmacy', icon: Pill, color: 'text-orange-500 bg-orange-50' },
    { id: 'laboratory', title: 'Laboratory', icon: FlaskConical, color: 'text-cyan-500 bg-cyan-50' },
    { id: 'hospital', title: 'Hospital', icon: Building2, color: 'text-purple-500 bg-purple-50' },
];

export default function Signup() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(roles[0].id); // Default to Doctor
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
    const [step, setStep] = useState<'form' | 'otp' | 'verification' | 'success'>('form');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending OTP
        setStep('otp');
        toast.success("OTP sent to your phone/email!");
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 6) {
            // Simulate verification
            setStep('verification');
            toast.success("Account verified successfully!");
        } else {
            toast.error("Please enter a valid 6-digit OTP");
        }
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDF2F7] p-6 font-sans">
                <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-10 lg:p-16 max-w-lg w-full text-center shadow-2xl shadow-primary/5">
                    <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <ShieldCheck size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">KYC Verification Pending</h2>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">
                        Thank you for applying to join the Health@Home network as a <span className="text-primary font-bold">{roles.find(r => r.id === selectedRole)?.title}</span>. Your professional documents are being reviewed by our compliance team. This typically takes 24-48 hours. You will be notified via email once approved.
                    </p>
                    <Button onClick={() => navigate('/login')} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-600 text-white font-black text-sm tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                        Return to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDF2F7] relative overflow-hidden font-sans">
            {/* Sophisticated Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />

            <div className="flex-1 lg:grid lg:grid-cols-2 max-w-7xl mx-auto w-full p-6 lg:p-12 self-center z-10">
                {/* Left Side - Hero / Brand */}
                <div className="hidden lg:flex flex-col justify-center p-12 pr-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-xl shadow-primary/20">
                                <span className="text-white font-black text-3xl">H</span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 leading-tight">Health@Home</h1>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs">Partner Ecosystem</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-gray-900 leading-[1.1]">Join the Modern <span className="text-primary">Healthcare</span> Network.</h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md">
                                Expand your reach. Apply to join our platform to manage your services, bookings, and patients through one unified, premium dashboard.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Signup Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-center py-8"
                >
                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-primary/5">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 mb-2">
                                {step === 'verification' ? 'Professional Verification' : 'Partner Application'}
                            </h2>
                            <p className="text-gray-500 text-sm font-medium">
                                {step === 'verification'
                                    ? 'Upload necessary documents to activate your profile'
                                    : 'Select your role and provide your professional details'}
                            </p>
                        </div>

                        {step !== 'verification' && step !== 'otp' && (
                            /* Role Selection Grid */
                            <div className="grid grid-cols-4 lg:grid-cols-4 gap-3 mb-8 max-h-[160px] overflow-y-auto no-scrollbar p-1">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    const isSelected = selectedRole === role.id;
                                    return (
                                        <button
                                            type="button"
                                            key={role.id}
                                            onClick={() => setSelectedRole(role.id)}
                                            className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border-2 ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.05]'
                                                : 'border-transparent bg-gray-50/50 hover:bg-gray-100/50'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-xl mb-1.5 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/20' : role.color}`}>
                                                <Icon size={16} />
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-tighter ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                                                {role.title}
                                            </span>
                                            {isSelected && (
                                                <motion.div layoutId="signup-role-indicator" className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                    <div className="w-1 h-1 bg-white rounded-full" />
                                                </motion.div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {step === 'verification' ? (
                            <Verification isSignupFlow onComplete={() => setStep('success')} />
                        ) : step === 'form' ? (
                            <form onSubmit={handleSignup} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name / Entity</label>
                                        <Input
                                            type="text"
                                            name="fullName"
                                            placeholder="Dr. Sarah Johnson"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-4"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contact Number</label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            placeholder="+1 234 567 8900"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-4"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Professional Email</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="sarah.j@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-4"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Create Password</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-4"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-600 text-white font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                                        Apply for {roles.find(r => r.id === selectedRole)?.title} Access
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP} className="space-y-8">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm font-medium mb-6">
                                        A 6-digit verification code has been sent to <br />
                                        <span className="text-primary font-bold">{formData.phone || formData.email}</span>
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`otp-${idx}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                className="w-12 h-14 text-center text-xl font-black bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white rounded-2xl transition-all outline-none"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-600 text-white font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                                        Verify & Complete Application
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('form')}
                                        className="w-full text-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-8 text-center border-t border-gray-100 pt-6">
                            <p className="text-sm font-bold text-gray-500">
                                Already a registered partner?{' '}
                                <Link to="/login" className="text-primary hover:text-primary-600 transition-colors">
                                    Sign In here
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div >
        </div >
    );
}
