import { useState } from 'react';
import { Activity, Users, DollarSign, TrendingUp, Calendar, Bed, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';

export default function HospitalReports() {
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [selectedRange, setSelectedRange] = useState('Last 30 Days');

    const handleDateRangeSelect = (range: string) => {
        setSelectedRange(range);
        toast.success(`Showing data for: ${range}`);
        setShowDateFilter(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hospital Analytics</h1>
                    <p className="text-gray-500">Operational performance and occupancy stats</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <div className="relative">
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={() => setShowDateFilter(!showDateFilter)}
                            >
                                <Calendar size={16} />
                                {selectedRange}
                            </Button>
                            {showDateFilter && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleDateRangeSelect('Last 7 Days')}>
                                        Last 7 Days
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleDateRangeSelect('Last 30 Days')}>
                                        Last 30 Days
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleDateRangeSelect('Last 3 Months')}>
                                        Last 3 Months
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" onClick={() => handleDateRangeSelect('Last Year')}>
                                        Last Year
                                    </button>
                                </div>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => toast.success('Downloading report...')}
                        >
                            <Download size={16} />
                            Export
                        </Button>
                    </div>
                    <Button>Download Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Bed size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Occupancy</p>
                            <h3 className="text-2xl font-bold text-gray-900">85%</h3>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
                        </div>
                    </div>
                    <span className="text-green-600 text-xs font-bold">+12% vs last month</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Patients</p>
                            <h3 className="text-2xl font-bold text-gray-900">3,405</h3>
                        </div>
                    </div>
                    <span className="text-purple-600 text-xs font-bold">+5% New Admissions</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Avg Wait Time</p>
                            <h3 className="text-2xl font-bold text-gray-900">14m</h3>
                        </div>
                    </div>
                    <span className="text-green-600 text-xs font-bold">-2m Improvement</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6">Department Performance</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Cardiology', val: 92, count: '450 patients' },
                            { label: 'Neurology', val: 78, count: '320 patients' },
                            { label: 'Orthopedics', val: 85, count: '380 patients' },
                            { label: 'General Medicine', val: 95, count: '600 patients' }
                        ].map((dept, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{dept.label}</span>
                                    <span className="text-gray-500">{dept.count}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${dept.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6">Upcoming Surgeries</h3>
                    <div className="space-y-4">
                        {[
                            { type: 'Cardiac Bypass', doctor: 'Dr. Arlene McCoy', time: '10:00 AM', room: 'OT-1' },
                            { type: 'Knee Replacement', doctor: 'Dr. Marvin McKinney', time: '12:30 PM', room: 'OT-3' },
                            { type: 'Appendectomy', doctor: 'Dr. Jenny Wilson', time: '02:00 PM', room: 'OT-2' }
                        ].map((surgery, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-900">{surgery.type}</p>
                                    <p className="text-xs text-gray-500">{surgery.doctor}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-primary-600 text-sm font-medium">
                                        <Activity size={14} /> {surgery.room}
                                    </div>
                                    <p className="text-xs text-gray-500">{surgery.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
