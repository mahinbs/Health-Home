
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface Consultation {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  mode: 'Video Call' | 'Voice Call' | 'Chat' | 'In-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  avatar: string;
  rating?: number;
  notes?: string;
}

export default function MyConsultations() {
  const navigate = useNavigate();
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const consultations: Consultation[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-25',
      time: '10:00 AM',
      mode: 'Video Call',
      status: 'upcoming',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20stethoscope%20around%20neck%2C%20medical%20office%20background%2C%20soft%20lighting%2C%20healthcare%20professional%20portrait%2C%20clean%20and%20trustworthy%20appearance&width=80&height=80&seq=doc1&orientation=squarish'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2024-01-20',
      time: '2:30 PM',
      mode: 'Video Call',
      status: 'completed',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20doctor%20in%20white%20coat%2C%20friendly%20expression%2C%20medical%20background%2C%20healthcare%20specialist%20portrait%2C%20clean%20and%20professional%20appearance&width=80&height=80&seq=doc2&orientation=squarish',
      rating: 5,
      notes: 'Prescribed medication for skin condition'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      date: '2024-01-18',
      time: '11:00 AM',
      mode: 'Chat',
      status: 'completed',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20pediatric%20doctor%2C%20warm%20and%20caring%20expression%2C%20white%20medical%20coat%2C%20child-friendly%20medical%20office%20background%2C%20healthcare%20professional%20portrait&width=80&height=80&seq=doc3&orientation=squarish',
      rating: 5
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: '2024-01-15',
      time: '3:00 PM',
      mode: 'In-person',
      status: 'cancelled',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20orthopedic%20doctor%2C%20confident%20expression%2C%20white%20medical%20coat%2C%20modern%20medical%20facility%20background%2C%20healthcare%20specialist%20portrait&width=80&height=80&seq=doc4&orientation=squarish'
    }
  ];

  const filteredConsultations = filter === 'all'
    ? consultations
    : consultations.filter(c => c.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation title="My Consultations" showBack={true} onBack={() => navigate('/profile')} showCart={true} />
      
      <div className="pt-20 sm:pt-24 pb-20 sm:pb-24 px-4">
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'upcoming', label: 'Upcoming' },
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

        {/* Consultations List */}
        <div className="space-y-3">
          {filteredConsultations.length === 0 ? (
            <Card className="p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-calendar-line text-3xl text-pink-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No consultations found</h3>
              <p className="text-gray-600 mb-4">You don't have any {filter === 'all' ? '' : filter} consultations yet</p>
              <Button onClick={() => navigate('/consult')}>
                Book a Consultation
              </Button>
            </Card>
          ) : (
            filteredConsultations.map((consultation, index) => (
              <Card
                key={consultation.id}
                className="p-4 cursor-pointer animate-scale-in"
                onClick={() => setSelectedConsultation(consultation)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={consultation.avatar}
                    alt={consultation.doctorName}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{consultation.doctorName}</h3>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(consultation.status)}`}>
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <i className="ri-calendar-line"></i>
                        <span>{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line"></i>
                        <span>{consultation.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-video-line"></i>
                        <span>{consultation.mode}</span>
                      </div>
                    </div>
                    {consultation.rating && (
                      <div className="flex items-center space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-fill text-sm ${
                              i < consultation.rating! ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                    )}
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

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto pb-24 animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Consultation Details</h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedConsultation.avatar}
                    alt={selectedConsultation.doctorName}
                    className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedConsultation.doctorName}</h3>
                    <p className="text-sm text-gray-600 mb-2">{selectedConsultation.specialty}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedConsultation.status)}`}>
                      {selectedConsultation.status.charAt(0).toUpperCase() + selectedConsultation.status.slice(1)}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Appointment Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Date</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedConsultation.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-time-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Time</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedConsultation.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-video-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Mode</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedConsultation.mode}</span>
                  </div>
                </div>
              </Card>

              {selectedConsultation.notes && (
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{selectedConsultation.notes}</p>
                </Card>
              )}

              {selectedConsultation.status === 'upcoming' && (
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <i className="ri-calendar-line mr-2"></i>
                    Reschedule
                  </Button>
                  <Button className="flex-1">
                    <i className="ri-video-line mr-2"></i>
                    Join Now
                  </Button>
                </div>
              )}

              {selectedConsultation.status === 'completed' && (
                <Button variant="outline" className="w-full">
                  <i className="ri-file-text-line mr-2"></i>
                  View Prescription
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

