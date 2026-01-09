
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface HomecareRequest {
  id: string;
  caregiverName: string;
  specialty: string;
  serviceType: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  address: string;
  avatar: string;
  totalCost: number;
}

export default function MyHomecareRequests() {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<HomecareRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled'>('all');

  const requests: HomecareRequest[] = [
    {
      id: '1',
      caregiverName: 'Maria Rodriguez',
      specialty: 'Certified Nursing Assistant',
      serviceType: 'Personal Care',
      date: '2024-01-26',
      time: '10:00 AM',
      duration: '4 hours',
      status: 'scheduled',
      address: '123 Health Street, Mumbai, India',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20caregiver%20in%20medical%20scrubs%2C%20warm%20caring%20smile%2C%20healthcare%20worker%20portrait%2C%20clean%20medical%20background%2C%20compassionate%20appearance%2C%20nursing%20professional&width=80&height=80&seq=care1&orientation=squarish',
      totalCost: 180
    },
    {
      id: '2',
      caregiverName: 'James Thompson',
      specialty: 'Physical Therapist Assistant',
      serviceType: 'Physiotherapy',
      date: '2024-01-24',
      time: '2:00 PM',
      duration: '2 hours',
      status: 'completed',
      address: '123 Health Street, Mumbai, India',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20physical%20therapist%20in%20medical%20uniform%2C%20confident%20friendly%20expression%2C%20healthcare%20worker%20portrait%2C%20modern%20medical%20facility%20background%2C%20physical%20therapy%20specialist&width=80&height=80&seq=care2&orientation=squarish',
      totalCost: 110
    },
    {
      id: '3',
      caregiverName: 'Sarah Chen',
      specialty: 'Home Health Aide',
      serviceType: 'Nursing Care',
      date: '2024-01-22',
      time: '9:00 AM',
      duration: '3 hours',
      status: 'completed',
      address: '123 Health Street, Mumbai, India',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20home%20health%20aide%2C%20gentle%20caring%20expression%2C%20healthcare%20worker%20in%20casual%20medical%20attire%2C%20home%20care%20setting%20background%2C%20compassionate%20caregiver&width=80&height=80&seq=care3&orientation=squarish',
      totalCost: 105
    }
  ];

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation title="My Homecare Requests" showBack={true} onBack={() => navigate('/profile')} showCart={true} />
      
      <div className="pt-20 sm:pt-24 pb-20 sm:pb-24 px-4">
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'scheduled', label: 'Scheduled' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' }
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

        {/* Requests List */}
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <Card className="p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-heart-pulse-line text-3xl text-pink-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600 mb-4">You don't have any {filter === 'all' ? '' : filter} homecare requests yet</p>
              <Button onClick={() => navigate('/homecare')}>
                Book Homecare Service
              </Button>
            </Card>
          ) : (
            filteredRequests.map((request, index) => (
              <Card
                key={request.id}
                className="p-4 cursor-pointer animate-scale-in"
                onClick={() => setSelectedRequest(request)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={request.avatar}
                    alt={request.caregiverName}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{request.caregiverName}</h3>
                        <p className="text-sm text-gray-600">{request.serviceType}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <i className="ri-calendar-line"></i>
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line"></i>
                        <span>{request.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-timer-line"></i>
                        <span>{request.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate">{request.address}</p>
                      <p className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-sm">
                        ${request.totalCost}
                      </p>
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

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedRequest.avatar}
                    alt={selectedRequest.caregiverName}
                    className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedRequest.caregiverName}</h3>
                    <p className="text-sm text-gray-600 mb-2">{selectedRequest.specialty}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Service Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-service-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Service Type</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRequest.serviceType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Date</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRequest.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-time-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Time</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRequest.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-timer-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedRequest.duration}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-start space-x-2">
                      <i className="ri-map-pin-line text-pink-600 mt-1"></i>
                      <div className="flex-1">
                        <span className="text-sm text-gray-600 block mb-1">Address</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Cost</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    ${selectedRequest.totalCost}
                  </span>
                </div>
              </Card>

              {selectedRequest.status === 'scheduled' && (
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <i className="ri-calendar-line mr-2"></i>
                    Reschedule
                  </Button>
                  <Button className="flex-1">
                    <i className="ri-phone-line mr-2"></i>
                    Contact Caregiver
                  </Button>
                </div>
              )}

              {selectedRequest.status === 'completed' && (
                <Button variant="outline" className="w-full">
                  <i className="ri-star-line mr-2"></i>
                  Rate Service
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

