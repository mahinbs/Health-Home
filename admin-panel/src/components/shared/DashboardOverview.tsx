import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '../ui/Button';

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: any;
    color: string;
}

export function StatCard({ label, value, change, isPositive, icon: Icon, color }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl text-white shadow-lg", color)}>
                    <Icon size={20} />
                </div>
                <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                    isPositive ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                )}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">{value}</h4>
            </div>
        </motion.div>
    );
}

export function DashboardOverview() {
    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue"
                    value="$12,840"
                    change="+12.5%"
                    isPositive={true}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-primary to-primary-600"
                />
                <StatCard
                    label="Total Bookings"
                    value="156"
                    change="+8.2%"
                    isPositive={true}
                    icon={Calendar}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard
                    label="Active Patients"
                    value="48"
                    change="-2.4%"
                    isPositive={false}
                    icon={Users}
                    color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                />
                <StatCard
                    label="Avg. Rating"
                    value="4.9"
                    change="+0.1"
                    isPositive={true}
                    icon={TrendingUp}
                    color="bg-gradient-to-br from-amber-500 to-amber-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Card */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Revenue Analytics</h4>
                            <p className="text-xs text-gray-500 font-medium">Daily revenue generated across all services</p>
                        </div>
                        <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                        {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className={cn(
                                        "w-full max-w-[40px] rounded-t-xl relative group cursor-pointer",
                                        i === 3 ? "bg-primary shadow-lg shadow-primary/20" : "bg-primary/20 hover:bg-primary/40 transition-colors"
                                    )}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${height * 20}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar - Status & Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <Activity size={24} />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                            <h5 className="text-xl font-bold mb-2">Service Status</h5>
                            <p className="text-white/70 text-sm font-medium mb-6">You are currently visible to patients for bookings.</p>
                            <button className="w-full py-3 bg-white text-primary font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                Go Offline
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Activity Feed</h4>
                        <div className="space-y-6">
                            {[
                                { label: 'New Booking', time: '2 mins ago', desc: 'Sarah Miller requested a Home Visit' },
                                { label: 'Payment Received', time: '1 hour ago', desc: 'Received $120 from John Doe' },
                                { label: 'Review Added', time: '3 hours ago', desc: 'Perfect service, thank you! - 5 Stars' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-gray-900">{item.label}</span>
                                            <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
