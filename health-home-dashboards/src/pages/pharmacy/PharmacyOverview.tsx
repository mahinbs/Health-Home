import { ShoppingBag, TrendingUp, TriangleAlert, Truck, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const stats = [
    { label: 'New Orders', value: '15', icon: ShoppingBag, color: 'bg-orange-50 text-orange-600' },
    { label: 'Pending Delivery', value: '8', icon: Truck, color: 'bg-blue-50 text-blue-600' },
    { label: 'Low Stock Items', value: '3', icon: TriangleAlert, color: 'bg-red-50 text-red-600' },
    { label: 'Today\'s Sales', value: '$1,250', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
];

const orders = [
    {
        id: '#ORD-7829',
        customer: 'Esther Howard',
        items: 'Paracetamol (2), Vitamin C (1)',
        amount: '$45.00',
        status: 'New',
        date: 'Today, 10:23 AM',
    },
    {
        id: '#ORD-7828',
        customer: 'Cameron Williamson',
        items: 'Blood Pressure Monitor',
        amount: '$120.00',
        status: 'Processing',
        date: 'Today, 09:15 AM',
    },
    {
        id: '#ORD-7827',
        customer: 'Brooklyn Simmons',
        items: 'Insulin, Syringes',
        amount: '$85.50',
        status: 'Ready to Ship',
        date: 'Yesterday',
    },
    {
        id: '#ORD-7826',
        customer: 'Leslie Alexander',
        items: 'Antibiotics (Prescription)',
        amount: '$32.00',
        status: 'Delivered',
        date: 'Yesterday',
    },
];

const lowStockItems = [
    { name: 'Amoxicillin 500mg', stock: 12, category: 'Antibiotics' },
    { name: 'N95 Masks', stock: 5, category: 'Equipment' },
    { name: 'Digital Thermometer', stock: 2, category: 'Equipment' },
];

export default function PharmacyOverview() {
    return (
        <>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pharmacy Overview</h1>
                    <p className="text-gray-500">Track orders and manage inventory</p>
                </div>
                <div className="flex gap-2">
                    <Button>Add New Product</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <Input placeholder="Search order..." className="pl-9 w-[200px]" />
                                </div>
                                <Button variant="outline" className="px-3">
                                    <Filter size={16} />
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Amount</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{order.customer}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[150px]">{order.items}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'New' ? 'bg-orange-100 text-orange-800' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-gray-900">{order.amount}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="sm" variant="secondary">Manage</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Low Stock Alerts</h2>
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 Items</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {lowStockItems.map((item, i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-red-600 font-bold text-sm">{item.stock} left</p>
                                        <button className="text-xs text-primary-600 hover:underline mt-1">Restock</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <Button variant="outline" size="sm" className="w-full">
                                View Full Inventory
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
