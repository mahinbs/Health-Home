import { TrendingUp, DollarSign, Calendar, ShoppingBag, CreditCard, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const recentSales = [
    {
        id: '#SALE-20921',
        customer: 'Walk-in Customer',
        items: 3,
        total: '$45.00',
        method: 'Cash',
        time: '10 mins ago'
    },
    {
        id: '#SALE-20920',
        customer: 'Sarah Johnson',
        items: 5,
        total: '$120.50',
        method: 'Insurance',
        time: '25 mins ago'
    },
    {
        id: '#SALE-20919',
        customer: 'Michael Chen',
        items: 1,
        total: '$12.00',
        method: 'Credit Card',
        time: '1 hour ago'
    }
];

export default function PharmacySales() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sales & Revenue</h1>
                    <p className="text-gray-500">Track daily sales and financial performance</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        Today <ChevronDown size={14} />
                    </Button>
                    <Button className="gap-2">
                        <CreditCard size={18} />
                        New PO
                    </Button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-green-600 text-xs font-bold">+12%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium uppercase">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900">$1,250.00</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <ShoppingBag size={20} />
                        </div>
                        <span className="text-blue-600 text-xs font-bold">+5%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium uppercase">Orders</p>
                    <h3 className="text-2xl font-bold text-gray-900">45</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-purple-600 text-xs font-bold">+8%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium uppercase">Avg. Order Value</p>
                    <h3 className="text-2xl font-bold text-gray-900">$27.80</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs font-medium uppercase">Pending Claims</p>
                    <h3 className="text-2xl font-bold text-gray-900">$3,450.00</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Revenue Trend</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-primary-500"></span> Sales</span>
                            <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Target</span>
                        </div>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between px-4 pb-4">
                        {/* Mock Chart Bars */}
                        {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
                            <div key={i} className="w-full mx-1 bg-white rounded-t-sm h-full relative group">
                                <div className="absolute bottom-0 w-full bg-white/40 rounded-t-sm h-[70%]"></div>
                                <div
                                    className="absolute bottom-0 w-full bg-primary-500 rounded-t-sm transition-all hover:bg-primary-600"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentSales.map((sale) => (
                            <div key={sale.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-gray-900">{sale.customer}</span>
                                    <span className="font-bold text-gray-900">{sale.total}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{sale.items} items • {sale.method}</span>
                                    <span>{sale.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 text-center">
                        <Button variant="ghost" size="sm" className="w-full text-primary-600">View All Transactions</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
