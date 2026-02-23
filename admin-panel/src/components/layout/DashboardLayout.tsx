import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, X, Bell, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui/Button';
import { UserRole } from '../../types/auth';

interface SidebarItem {
    icon: any;
    label: string;
    path: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    userName?: string;
    role: UserRole;
    sidebarItems: SidebarItem[];
}

export function DashboardLayout({ children, userName = "Professional", role, sidebarItems }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSignOut = () => {
        navigate('/login');
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col backdrop-blur-xl bg-white/80 border-r border-white/20 shadow-xl overflow-hidden">
            <div className="flex h-24 items-center px-8 border-b border-gray-100/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Health@Home</h1>
                        <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Service Panel</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-8 no-scrollbar">
                <nav className="space-y-2 px-4">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden',
                                    isActive
                                        ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className={cn(
                                        "p-2 rounded-lg transition-all duration-300",
                                        isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-primary"
                                    )}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="font-semibold tracking-tight">{item.label}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="h-6 w-1 rounded-full bg-primary relative z-10"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-100/50 bg-gray-50/50">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
                >
                    <div className="p-2 rounded-lg bg-red-50 text-red-400 group-hover:bg-red-100 group-hover:text-red-600 transition-all">
                        <LogOut size={18} />
                    </div>
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#FDF2F7] overflow-hidden font-sans">
            {/* Background Sophisticated Gradient */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen w-screen -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
                    >
                        <SidebarContent />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden w-72 lg:block relative z-20">
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden relative z-10">
                {/* Header */}
                <header className="flex h-20 items-center justify-between px-6 lg:px-10 border-b border-white/40 backdrop-blur-md bg-white/40 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="rounded-xl p-2.5 text-gray-500 hover:bg-white/60 hover:text-primary transition-all lg:hidden shadow-sm"
                        >
                            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <div className="hidden lg:block">
                            <h2 className="text-xl font-bold text-gray-800">Welcome back, {userName}!</h2>
                            <p className="text-xs text-gray-500 font-medium">Have a great day at {role.toLowerCase().replace('_', ' ')} panel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-white/60 hover:text-primary transition-all shadow-sm bg-white/40 group">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-white" />
                        </button>

                        <div className="h-10 w-[1px] bg-gray-200 hidden sm:block" />

                        <div className="flex items-center gap-3 pl-2 sm:pl-0">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-tight">{userName}</p>
                                <p className="text-[11px] text-primary font-bold uppercase tracking-wide">{role}</p>
                            </div>
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-white flex items-center justify-center text-primary shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                                <UserIcon size={22} fill="currentColor" fillOpacity={0.2} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 no-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
