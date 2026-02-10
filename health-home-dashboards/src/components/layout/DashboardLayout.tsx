import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui/Button';

interface SidebarItem {
    icon: any;
    label: string;
    path: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'doctor' | 'healthcare' | 'pharmacy' | 'hospital';
    sidebarItems: SidebarItem[];
}

export function DashboardLayout({ children, role, sidebarItems }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSignOut = () => {
        navigate('/login');
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-white border-r border-gray-200">
            <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
                <h1 className="text-xl font-bold text-primary-600">Health Home</h1>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
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
                        className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
                    >
                        <SidebarContent />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden w-64 lg:block">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8 shadow-sm">
                    <button
                        onClick={toggleSidebar}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                {role.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-700 capitalize hidden sm:block">
                                {role} Portal
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
