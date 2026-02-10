import { useState } from 'react';
import { Search, Filter, Plus, Package, AlertCircle, Pencil, Trash, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const inventory = [
    {
        id: 'INV-001',
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        stock: 45,
        minStock: 50,
        price: '$12.50',
        status: 'Low Stock',
        supplier: 'MediCorp Inc.'
    },
    {
        id: 'INV-002',
        name: 'Paracetamol 650mg',
        category: 'Pain Relief',
        stock: 120,
        minStock: 80,
        price: '$5.00',
        status: 'In Stock',
        supplier: 'HealthPharma'
    },
    {
        id: 'INV-003',
        name: 'Vitamin C 1000mg',
        category: 'Supplements',
        stock: 20,
        minStock: 25,
        price: '$8.99',
        status: 'Low Stock',
        supplier: 'WellnessLabs'
    },
    {
        id: 'INV-004',
        name: 'Insulin Glargine',
        category: 'Diabetes',
        stock: 15,
        minStock: 10,
        price: '$45.00',
        status: 'In Stock',
        supplier: 'MediCorp Inc.'
    },
    {
        id: 'INV-005',
        name: 'Metformin 500mg',
        category: 'Diabetes',
        stock: 5,
        minStock: 30,
        price: '$10.50',
        status: 'Out of Stock',
        supplier: 'HealthPharma'
    }
];

export default function PharmacyInventory() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-500">Track stock levels and manage products</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => toast.success('Opening add product form...')}
                >
                    <Plus size={18} />
                    Add Product
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <h3 className="text-2xl font-bold text-gray-900">1,240</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-full">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Low Stock Items</p>
                        <h3 className="text-2xl font-bold text-gray-900">23</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-red-50 text-red-600 rounded-full">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Out of Stock</p>
                        <h3 className="text-2xl font-bold text-gray-900">5</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search product name, category, or ID..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => toast.success('Exporting inventory...')}
                        >
                            <Filter size={16} />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                            <span className="text-xs text-gray-500">{item.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.stock} <span className="text-xs text-gray-400 font-normal">/ {item.minStock} min</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                            item.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-gray-400 hover:text-primary-600 p-1">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="text-gray-400 hover:text-red-600 p-1">
                                                <Trash size={16} />
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
