import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import {
    Stethoscope,
    Building2,
    Pill,
    Activity,
    UserCircle,
    ShieldCheck,
    FlaskConical,
    Heart,
    Accessibility
} from 'lucide-react';

const roles = [
    { id: 'admin', title: 'Admin', icon: ShieldCheck, color: 'text-amber-500 bg-amber-50' },
    { id: 'doctor', title: 'Doctor', icon: Stethoscope, color: 'text-blue-500 bg-blue-50' },
    { id: 'medical-officer', title: 'Med-Officer', icon: Activity, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'nurse', title: 'Nurse', icon: UserCircle, color: 'text-rose-500 bg-rose-50' },
    { id: 'physiotherapist', title: 'Physio', icon: Accessibility, color: 'text-indigo-500 bg-indigo-50' },
    { id: 'caretaker', title: 'Caretaker', icon: Heart, color: 'text-pink-500 bg-pink-50' },
    { id: 'pharmacy', title: 'Pharmacy', icon: Pill, color: 'text-orange-500 bg-orange-50' },
    { id: 'laboratory', title: 'Laboratory', icon: FlaskConical, color: 'text-cyan-500 bg-cyan-50' },
    { id: 'hospital', title: 'Hospital', icon: Building2, color: 'text-purple-500 bg-purple-50' },
];



export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(roles[1].id); // Default to Doctor
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login based on selected role
        login(email, selectedRole);
        navigate(`/${selectedRole}/overview`);
    };

    return (
        <div className="min-h-screen flex bg-[#FDF2F7] relative overflow-hidden font-sans">
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
                            <h2 className="text-5xl font-black text-gray-900 leading-[1.1]">The Modern Hub for <span className="text-primary">Healthcare</span> Professionals.</h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md">
                                Empowering doctors, labs, and caregivers with a seamless, role-based platform to manage services and bookings.
                            </p>
                        </div>

                        <div className="flex items-center gap-8 pt-4">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-gray-900">1.2M+</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Patients Managed</p>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-200" />
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-gray-900">15k+</h3>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Trusted Partners</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Login Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-center"
                >
                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-primary/5">
                        <div className="mb-10">
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 text-sm font-medium">Please select your service role to sign in</p>
                        </div>

                        {/* Role Selection Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3 mb-10 max-h-[220px] overflow-y-auto no-scrollbar p-1">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRole === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border-2 ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.05]'
                                            : 'border-transparent bg-gray-50/50 hover:bg-gray-100/50'
                                            }`}
                                    >
                                        <div className={`p-2.5 rounded-xl mb-2 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/20' : role.color}`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-primary' : 'text-gray-500'}`}>
                                            {role.title}
                                        </span>
                                        {isSelected && (
                                            <motion.div layoutId="role-indicator" className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Professional Email</label>
                                <Input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-14 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Security Key</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-14 rounded-2xl bg-white border-gray-100 shadow-sm focus:border-primary transition-all px-5"
                                />
                            </div>

                            <Button type="submit" className="w-full h-15 rounded-2xl bg-primary hover:bg-primary-600 text-white font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 py-6">
                                Sign In to {roles.find(r => r.id === selectedRole)?.title} Portal
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm font-bold text-gray-500 mb-6">
                                Don't have a partner account?{' '}
                                <Link to="/signup" className="text-primary hover:text-primary-600 transition-colors">
                                    Apply Now
                                </Link>
                            </p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest pt-6 border-t border-gray-100">
                                Secure Partner Portal • Health@Home v2.0
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
