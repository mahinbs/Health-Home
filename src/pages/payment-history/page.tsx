
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface Payment {
  id: string;
  type: 'consultation' | 'pharmacy' | 'homecare' | 'subscription';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
}

interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
}

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filter, setFilter] = useState<'all' | 'consultation' | 'pharmacy' | 'homecare' | 'subscription'>('all');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState<'upi' | 'card' | null>(null);
  const [walletBalance] = useState(125.50);

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'upi',
      name: 'UPI',
      details: 'riya.sharma@paytm',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'Credit Card',
      details: '**** **** **** 4567',
      isDefault: false
    },
    {
      id: '3',
      type: 'card',
      name: 'Debit Card',
      details: '**** **** **** 1234',
      isDefault: false
    }
  ];

  const payments: Payment[] = [
    {
      id: '1',
      type: 'consultation',
      description: 'Dr. Sarah Johnson - Cardiology Consultation',
      amount: 120.00,
      date: '2024-01-24',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-20240124-001'
    },
    {
      id: '2',
      type: 'pharmacy',
      description: 'Pharmacy Order - Medications',
      amount: 45.50,
      date: '2024-01-23',
      status: 'completed',
      paymentMethod: 'UPI',
      transactionId: 'TXN-20240123-002'
    },
    {
      id: '3',
      type: 'homecare',
      description: 'Homecare Service - Personal Care',
      amount: 180.00,
      date: '2024-01-22',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-20240122-003'
    },
    {
      id: '4',
      type: 'consultation',
      description: 'Dr. Michael Chen - Dermatology Consultation',
      amount: 100.00,
      date: '2024-01-20',
      status: 'completed',
      paymentMethod: 'Debit Card',
      transactionId: 'TXN-20240120-004'
    },
    {
      id: '5',
      type: 'pharmacy',
      description: 'Pharmacy Order - Medical Equipment',
      amount: 89.99,
      date: '2024-01-19',
      status: 'pending',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-20240119-005'
    },
    {
      id: '6',
      type: 'subscription',
      description: 'Premium Health Plan - Monthly',
      amount: 29.99,
      date: '2024-01-15',
      status: 'completed',
      paymentMethod: 'Auto-debit',
      transactionId: 'TXN-20240115-006'
    }
  ];

  const filteredPayments = filter === 'all'
    ? payments
    : payments.filter(p => p.type === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return 'ri-video-line';
      case 'pharmacy': return 'ri-medicine-bottle-line';
      case 'homecare': return 'ri-heart-pulse-line';
      case 'subscription': return 'ri-vip-diamond-line';
      default: return 'ri-wallet-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600 bg-blue-50';
      case 'pharmacy': return 'text-pink-600 bg-pink-50';
      case 'homecare': return 'text-emerald-600 bg-emerald-50';
      case 'subscription': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Payment & Wallet" showCart={true} />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4">
        {/* Wallet Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white mb-6 animate-scale-in shadow-2xl">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-sm">
              <i className="ri-wallet-3-fill text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold mb-1">₹{walletBalance.toFixed(2)}</h2>
            <p className="text-pink-100">Wallet Balance</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-colors">
              <i className="ri-add-circle-line text-xl mb-1"></i>
              <p className="text-xs">Add Money</p>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-colors">
              <i className="ri-exchange-line text-xl mb-1"></i>
              <p className="text-xs">Transfer</p>
            </button>
          </div>
        </Card>

        {/* Payment Methods Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <button
              onClick={() => setShowAddPaymentModal(true)}
              className="text-pink-600 text-sm font-medium flex items-center"
            >
              <i className="ri-add-line mr-1"></i>
              Add New
            </button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      method.type === 'upi' ? 'bg-blue-50' :
                      method.type === 'card' ? 'bg-purple-50' :
                      'bg-pink-50'
                    }`}>
                      <i className={`${
                        method.type === 'upi' ? 'ri-phone-line text-blue-600' :
                        method.type === 'card' ? 'ri-bank-card-line text-purple-600' :
                        'ri-wallet-line text-pink-600'
                      } text-xl`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                      <p className="text-xs text-gray-600">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="ri-more-line"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Transaction History</h2>
          <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/50 mb-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-600 mb-1">This Month</p>
                <p className="font-semibold text-gray-900">₹{payments.filter(p => p.status === 'completed' && new Date(p.date).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Transactions</p>
                <p className="font-semibold text-gray-900">{payments.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="font-semibold text-orange-600">{payments.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'consultation', label: 'Consultations' },
              { id: 'pharmacy', label: 'Pharmacy' },
              { id: 'homecare', label: 'Homecare' },
              { id: 'subscription', label: 'Subscription' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                    : 'bg-white/95 text-gray-600 hover:bg-pink-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-3">
          {filteredPayments.length === 0 ? (
            <Card className="p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-wallet-line text-3xl text-pink-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-600 mb-4">You don't have any {filter === 'all' ? '' : filter} payments yet</p>
            </Card>
          ) : (
            filteredPayments.map((payment, index) => (
              <Card
                key={payment.id}
                className="p-4 cursor-pointer animate-scale-in"
                onClick={() => setSelectedPayment(payment)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${getTypeColor(payment.type).split(' ')[1]} rounded-xl flex items-center justify-center shadow-md`}>
                    <i className={`${getTypeIcon(payment.type)} ${getTypeColor(payment.type).split(' ')[0]} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{payment.description}</h3>
                        <p className="text-xs text-gray-600">{payment.date}</p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                          ${payment.amount.toFixed(2)}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <i className="ri-bank-card-line"></i>
                      <span>{payment.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-pink-400"></i>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Payment Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 ${getTypeColor(selectedPayment.type).split(' ')[1]} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <i className={`${getTypeIcon(selectedPayment.type)} ${getTypeColor(selectedPayment.type).split(' ')[0]} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedPayment.description}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    ${selectedPayment.amount.toFixed(2)}
                  </p>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Transaction Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transaction ID</span>
                    <span className="font-semibold text-gray-900 text-sm">{selectedPayment.transactionId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="font-semibold text-gray-900">{selectedPayment.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Method</span>
                    <span className="font-semibold text-gray-900">{selectedPayment.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </Card>

              {selectedPayment.status === 'completed' && (
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <i className="ri-download-line mr-2"></i>
                    Download Receipt
                  </Button>
                  <Button className="flex-1">
                    <i className="ri-share-line mr-2"></i>
                    Share
                  </Button>
                </div>
              )}

              {selectedPayment.status === 'pending' && (
                <Button className="w-full">
                  <i className="ri-time-line mr-2"></i>
                  Check Payment Status
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Payment Method</h2>
              <button
                onClick={() => {
                  setShowAddPaymentModal(false);
                  setPaymentMethodType(null);
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              {!paymentMethodType ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethodType('upi')}
                    className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <i className="ri-phone-line text-white text-xl"></i>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Add UPI</p>
                        <p className="text-xs text-gray-600">Google Pay, PhonePe, Paytm, etc.</p>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400 ml-auto"></i>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethodType('card')}
                    className="w-full p-4 bg-purple-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <i className="ri-bank-card-line text-white text-xl"></i>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Add Card</p>
                        <p className="text-xs text-gray-600">Credit or Debit Card</p>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400 ml-auto"></i>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setPaymentMethodType(null)}
                    className="flex items-center text-gray-600 mb-4"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    <span className="text-sm">Back</span>
                  </button>
                  
                  {paymentMethodType === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@paytm"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                      <Button className="w-full">
                        Verify & Add UPI
                      </Button>
                    </div>
                  )}

                  {paymentMethodType === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={3}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                      <Button className="w-full">
                        Add Card
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

