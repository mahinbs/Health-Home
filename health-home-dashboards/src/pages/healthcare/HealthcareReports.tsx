import { Users, Calendar, Download, PieChart, ChevronDown, Activity, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const summaryCards = [
    { label: 'Total Revenue', value: '$45,230', change: '+12%', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Services Completed', value: '1,204', change: '+5%', icon: Activity, color: 'bg-blue-50 text-blue-600' },
    { label: 'New Patients', value: '86', change: '+8%', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Avg. Satisfaction', value: '4.8/5', change: '+2%', icon: PieChart, color: 'bg-orange-50 text-orange-600' },
];

export default function HealthcareReports() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-500">Performance metrics and insights</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <span>This Month</span>
                        <ChevronDown size={14} />
                    </Button>
                    <Button className="gap-2">
                        <Download size={16} />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${card.color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">{card.change}</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Visualizations Placeholders (representing charts) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Revenue Overview</h3>
                        <Button variant="ghost" size="sm">
                            <Calendar size={16} />
                        </Button>
                    </div>
                    <div className="h-64 flex items-end justify-between px-4 gap-2">
                        {[40, 60, 45, 75, 55, 80, 70, 90, 65, 85, 95, 80].map((h, i) => (
                            <div key={i} className="w-full bg-primary-100 hover:bg-primary-200 rounded-t-lg transition-all relative group h-full flex flex-col justify-end">
                                <div style={{ height: `${h}%` }} className="bg-primary-500 rounded-t-lg w-full relative">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${h * 500}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Service Category Distribution</h3>
                        <Button variant="ghost" size="sm">Details</Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Nursing Care', val: 45, color: 'bg-blue-500' },
                            { label: 'Physiotherapy', val: 30, color: 'bg-green-500' },
                            { label: 'Elderly Care', val: 15, color: 'bg-orange-500' },
                            { label: 'Post-Op Care', val: 10, color: 'bg-purple-500' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                    <span className="text-gray-500">{item.val}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-2">Insights</h4>
                        <p className="text-sm text-gray-600">Nursing care services have increased by 15% this month, primarily driven by post-operative home support requests.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
