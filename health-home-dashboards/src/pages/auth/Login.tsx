import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Stethoscope, Building2, Pill, Activity } from 'lucide-react';

const roles = [
    { id: 'doctor', title: 'Doctor', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
    { id: 'healthcare', title: 'Healthcare', icon: Activity, color: 'bg-green-100 text-green-600' },
    { id: 'pharmacy', title: 'Pharmacy', icon: Pill, color: 'bg-orange-100 text-orange-600' },
    { id: 'hospital', title: 'Hospital', icon: Building2, color: 'bg-purple-100 text-purple-600' },
];

export default function Login() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(roles[0].id);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        navigate(`/${selectedRole}/dashboard`);
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 grid md:grid-cols-[55%,1fr] bg-white">
                {/* Left Side - Hero */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-primary-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-6">Health Home Partner Portal</h1>
                        <p className="text-lg text-primary-100 mb-8">
                            Manage your practice, orders, and patients seamlessly with our comprehensive dashboard solution.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <h3 className="font-bold text-2xl mb-1">24/7</h3>
                                <p className="text-primary-100 text-sm">Access Anywhere</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <h3 className="font-bold text-2xl mb-1">100%</h3>
                                <p className="text-primary-100 text-sm">Secure Data</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Please select your role to continue</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            const isSelected = selectedRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 border-2 ${isSelected
                                        ? 'border-primary-500 bg-primary-50 scale-105 shadow-sm'
                                        : 'border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg mb-2 ${role.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className={`text-xs font-medium ${isSelected ? 'text-primary-700' : 'text-gray-600'}`}>
                                        {role.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded text-primary-600 focus:ring-primary-500" />
                                Remember me
                            </label>
                            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                Forgot password?
                            </a>
                        </div> */}

                        <Button type="submit" className="w-full" size="lg">
                            Sign In as {roles.find(r => r.id === selectedRole)?.title}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
