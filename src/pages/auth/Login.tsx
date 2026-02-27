import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/base/Button';
const toast = {
    success: (msg: string) => console.log('SUCCESS:', msg),
    error: (msg: string) => console.log('ERROR:', msg)
};
import {
    Phone,
    Lock,
    ArrowRight,
    Heart
} from 'lucide-react';

export default function PatientLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Welcome back!");
        navigate('/');
    };

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
                    key="login-form"
                    className="max-w-md w-full space-y-8"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Enter your credentials to access your health dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4 pt-4">
                        <div className="space-y-4">
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
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                                Forgot Password?
                            </button>
                        </div>

                        <Button type="submit" className="w-full h-14 mt-4 rounded-2xl bg-black hover:bg-gray-900 text-white font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10">
                            Sign In
                            <ArrowRight className="ml-2 inline" size={18} />
                        </Button>
                    </form>

                    <div className="pt-8 text-center border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                            Don't have an account yet?{' '}
                            <Link to="/auth/signup" className="text-black font-black hover:underline underline-offset-4">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
