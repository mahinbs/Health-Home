import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/base/Button';
const toast = {
    success: (msg: string) => console.log('SUCCESS:', msg),
    error: (msg: string) => console.log('ERROR:', msg)
};
import {
    User,
    Mail,
    Phone,
    Lock,
    CheckCircle2,
    ArrowRight,
    Heart
} from 'lucide-react';

export default function PatientSignup() {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('otp');
        toast.success("OTP sent to your phone/email!");
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 6) {
            setStep('success');
            toast.success("Welcome to Health@Home!");
        } else {
            toast.error("Please enter a valid 6-digit OTP");
        }
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-6 font-sans">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="mx-auto w-24 h-24 rounded-full bg-green-50 text-green-500 flex items-center justify-center shadow-lg">
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-gray-900 leading-tight">Account Created!</h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Your health journey begins today. Welcome to the most premium healthcare ecosystem.
                        </p>
                    </div>
                    <Button onClick={() => navigate('/')} className="w-full h-14 rounded-2xl bg-black hover:bg-gray-900 text-white font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95">
                        Go to Home
                        <ArrowRight className="ml-2 inline" size={18} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <div className="p-8 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                    <Heart className="text-white" size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter">Health@Home</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={step}
                    className="max-w-md w-full space-y-8"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                            {step === 'form' ? 'Join Health@Home' : 'Verify Identity'}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {step === 'form'
                                ? 'Premium healthcare, delivered at your doorstep.'
                                : 'Enter the code sent to ' + (formData.phone || formData.email)}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'form' ? (
                            <motion.form
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleSignup}
                                className="space-y-4 pt-4"
                            >
                                <div className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Create Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-14 mt-6 rounded-2xl bg-black hover:bg-gray-900 text-white font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10">
                                    Create Account
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleVerifyOTP}
                                className="space-y-8 pt-4"
                            >
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            className="w-12 h-14 text-center text-xl font-black bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                        />
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <Button type="submit" className="w-full h-14 rounded-2xl bg-black hover:bg-gray-900 text-white font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10">
                                        Verify OTP
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('form')}
                                        className="w-full text-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                    >
                                        Change Contact Details
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="pt-8 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="text-black font-black hover:underline underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
