import {
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    Clock
} from 'lucide-react';

export default function LabOverview() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Lab Analytics</h1>
                    <p className="text-gray-500 font-medium">Real-time performance metrics for your diagnostic center.</p>
                </div>
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 p-2 rounded-2xl shadow-sm">
                    <button className="px-4 py-2 rounded-xl bg-white text-gray-900 font-bold text-xs shadow-sm shadow-black/5 transition-all hover:scale-[1.02]">Daily</button>
                    <button className="px-4 py-2 rounded-xl text-gray-400 font-bold text-xs hover:text-gray-900 transition-colors">Weekly</button>
                    <button className="px-4 py-2 rounded-xl text-gray-400 font-bold text-xs hover:text-gray-900 transition-colors">Monthly</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Calendar}
                    label="Today's Tests"
                    value="24"
                    trend="+12%"
                    color="primary"
                />
                <StatCard
                    icon={Users}
                    label="Patients"
                    value="18"
                    trend="+5%"
                    color="emerald"
                />
                <StatCard
                    icon={Clock}
                    label="Avg. Turnaround"
                    value="14h"
                    trend="-2h"
                    color="orange"
                />
                <StatCard
                    icon={DollarSign}
                    label="Net Revenue"
                    value="$1,240"
                    trend="+18%"
                    color="violet"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Tests */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">Recent Test Bookings</h3>
                        <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] overflow-hidden shadow-sm">
                        <div className="divide-y divide-white/20">
                            <RecentTestItem
                                patient="Robert Fox"
                                test="Full Body Checkup"
                                time="10:30 AM"
                                status="Processing"
                                avatar="https://i.pravatar.cc/150?u=robert"
                            />
                            <RecentTestItem
                                patient="Jenny Wilson"
                                test="Blood Glucose Test"
                                time="09:15 AM"
                                status="Completed"
                                avatar="https://i.pravatar.cc/150?u=jenny"
                            />
                            <RecentTestItem
                                patient="Guy Hawkins"
                                test="COVID-19 RT-PCR"
                                time="08:45 AM"
                                status="Pending"
                                avatar="https://i.pravatar.cc/150?u=guy"
                            />
                        </div>
                    </div>
                </div>

                {/* Status Insights */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Insights</h3>
                    <div className="p-8 rounded-[40px] bg-black text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h4 className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">Capacity Utilization</h4>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black">78%</span>
                                    <span className="text-emerald-400 font-bold text-xs mb-1">+5% from yesterday</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <InsightRow label="Quality Score" value="9.8" color="bg-primary" width="98%" />
                                <InsightRow label="Customer Satisfaction" value="4.9/5" color="bg-emerald-400" width="92%" />
                            </div>
                            <button className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-sm transition-all active:scale-95">
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, color }: any) {
    const colors: any = {
        primary: 'text-primary bg-primary/10 shadow-primary/5',
        emerald: 'text-emerald-500 bg-emerald-500/10 shadow-emerald-500/5',
        orange: 'text-orange-500 bg-orange-500/10 shadow-orange-500/5',
        violet: 'text-violet-500 bg-violet-500/10 shadow-violet-500/5'
    };

    return (
        <div className="p-8 rounded-[40px] bg-white border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${colors[color]}`}>
                <Icon size={28} />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                    <span className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {trend}
                    </span>
                </div>
            </div>
        </div>
    );
}

function RecentTestItem({ patient, test, time, status, avatar }: any) {
    const statusColors: any = {
        Processing: 'bg-orange-500 text-white shadow-orange-500/20',
        Completed: 'bg-emerald-500 text-white shadow-emerald-500/20',
        Pending: 'bg-primary text-white shadow-primary/20'
    };

    return (
        <div className="p-6 flex items-center justify-between group hover:bg-white/40 transition-colors">
            <div className="flex items-center gap-4">
                <img src={avatar} alt={patient} className="w-12 h-12 rounded-2xl object-cover shadow-md" />
                <div>
                    <h5 className="font-bold text-gray-900">{patient}</h5>
                    <p className="text-xs font-medium text-gray-400">{test}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{time}</span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg ${statusColors[status]}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

function InsightRow({ label, value, color, width }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-gray-400">{label}</span>
                <span className="text-white">{value}</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width }} />
            </div>
        </div>
    );
}
