import { TrendingUp, TrendingDown, Download, Calendar, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';

const transactions = [
    {
        id: 'TRX-9821',
        patient: 'Sarah Johnson',
        service: 'Video Consultation',
        date: 'Oct 24, 2023 at 10:30 AM',
        amount: '+$85.00',
        status: 'Completed',
        type: 'credit'
    },
    {
        id: 'TRX-9820',
        patient: 'Michael Chen',
        service: 'Clinic Visit',
        date: 'Oct 23, 2023 at 02:15 PM',
        amount: '+$120.00',
        status: 'Completed',
        type: 'credit'
    },
    {
        id: 'TRX-9819',
        patient: 'Platform Fee',
        service: 'Monthly Subscription',
        date: 'Oct 20, 2023 at 09:00 AM',
        amount: '-$50.00',
        status: 'Processed',
        type: 'debit'
    },
    {
        id: 'TRX-9818',
        patient: 'Emily Davis',
        service: 'Prescription Review',
        date: 'Oct 19, 2023 at 11:45 AM',
        amount: '+$45.00',
        status: 'Pending',
        type: 'credit'
    },
    {
        id: 'TRX-9817',
        patient: 'Payout',
        service: 'Withdrawal to Bank',
        date: 'Oct 15, 2023 at 04:30 PM',
        amount: '-$1,250.00',
        status: 'Completed',
        type: 'debit'
    }
];

export default function DoctorEarnings() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Earnings & Finance</h1>
                    <p className="text-gray-500">Track your revenue and transaction history</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => toast.success('Downloading earnings report...')}
                    >
                        <Download size={16} />
                        Export Report
                    </Button>
                    <Button
                        className="gap-2"
                        onClick={() => toast.info('Withdraw funds feature coming soon')}
                    >
                        <Wallet size={16} />
                        Withdraw Funds
                    </Button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Wallet size={24} className="text-white" />
                        </div>
                        <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">Available Balance</span>
                    </div>
                    <p className="text-primary-100 text-sm font-medium">Total Balance</p>
                    <h2 className="text-4xl font-bold mt-1">$3,450.00</h2>
                    <div className="mt-6 flex items-center gap-2 text-sm text-primary-100">
                        <span className="bg-white/20 rounded-full p-1"><TrendingUp size={12} /></span>
                        <span>+15% from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <TrendingUp size={24} className="text-green-600" />
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+8.2%</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Monthly Revenue</p>
                    <h2 className="text-3xl font-bold mt-1 text-gray-900">$8,240.50</h2>
                    <p className="mt-6 text-sm text-gray-400">Oct 1 - Oct 31, 2023</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Calendar size={24} className="text-blue-600" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Pending Payouts</p>
                    <h2 className="text-3xl font-bold mt-1 text-gray-900">$420.00</h2>
                    <p className="mt-6 text-sm text-gray-400">Expected by Nov 2, 2023</p>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info('Loading all transactions...')}
                    >
                        View All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-100">
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${trx.type === 'debit' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                                }`}>
                                                {trx.type === 'debit' ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{trx.patient}</p>
                                                <p className="text-xs text-gray-500">{trx.service}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {trx.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${trx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            trx.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold ${trx.type === 'debit' ? 'text-gray-900' : 'text-green-600'
                                        }`}>
                                        {trx.amount}
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
