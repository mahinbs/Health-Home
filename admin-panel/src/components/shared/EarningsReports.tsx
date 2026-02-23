import { motion } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, Download } from 'lucide-react';
import { cn } from '../ui/Button';

export function EarningsReports() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Earnings & Reports</h3>
                    <p className="text-gray-500 text-sm font-medium">Track your revenue, analyze trends, and download settlements</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer">
                        <option>This Month (Oct)</option>
                        <option>Last Month (Sep)</option>
                        <option>Last 3 Months</option>
                        <option>Year to Date</option>
                    </select>
                    <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-6 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500">
                        <DollarSign size={64} />
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl shadow-sm">
                            <DollarSign size={20} />
                        </div>
                        <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                            <ArrowUpRight size={12} /> +15.2%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                    <h4 className="text-3xl font-black text-gray-900">$8,450.00</h4>
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500">
                        <Calendar size={64} />
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl shadow-sm">
                            <Calendar size={20} />
                        </div>
                        <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                            <ArrowUpRight size={12} /> +5.4%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Bookings</p>
                    <h4 className="text-3xl font-black text-gray-900">124</h4>
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500">
                        <TrendingUp size={64} />
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl shadow-sm">
                            <TrendingUp size={20} />
                        </div>
                        <span className="flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                            <ArrowDownRight size={12} /> -2.1%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Avg. Earnings / Visit</p>
                    <h4 className="text-3xl font-black text-gray-900">$68.14</h4>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Service-wise Revenue</h4>
                    <div className="space-y-6">
                        {[
                            { name: 'Online Consultation', rev: '$3,200', pct: 45, color: 'bg-blue-500' },
                            { name: 'Physical Visit', rev: '$4,150', pct: 40, color: 'bg-emerald-500' },
                            { name: 'Home Visit', rev: '$1,100', pct: 15, color: 'bg-primary' }
                        ].map(svc => (
                            <div key={svc.name}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-gray-700">{svc.name}</span>
                                    <span className="text-sm font-black text-gray-900">{svc.rev}</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${svc.pct}%` }}
                                        transition={{ duration: 1 }}
                                        className={cn("h-full rounded-full", svc.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold text-gray-900">Recent Transactions</h4>
                        <button className="text-xs font-bold text-primary hover:text-primary-600 transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 'TRX-99821', desc: 'Settlement to Bank', date: 'Oct 15, 2023', amt: '-$2,450.00', status: 'Completed', type: 'out' },
                            { id: 'BKN-21004', desc: 'Online Consult - John Doe', date: 'Oct 18, 2023', amt: '+$75.00', status: 'Added', type: 'in' },
                            { id: 'BKN-21005', desc: 'Home Visit - S. Miller', date: 'Oct 18, 2023', amt: '+$120.00', status: 'Added', type: 'in' },
                            { id: 'BKN-21006', desc: 'Physical Visit - A. Smith', date: 'Oct 19, 2023', amt: '+$90.00', status: 'Pending', type: 'in' },
                        ].map((trx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-white/40 rounded-2xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-2 rounded-xl", trx.type === 'in' ? "bg-emerald-50 text-emerald-500" : "bg-gray-100 text-gray-500")}>
                                        <DollarSign size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-0.5">{trx.desc}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{trx.id} • {trx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn("text-sm font-black mb-0.5", trx.type === 'in' ? "text-emerald-500" : "text-gray-900")}>{trx.amt}</p>
                                    <p className="text-[10px] font-bold text-gray-400">{trx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
