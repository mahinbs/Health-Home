
import { useState } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function UpcomingAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. Savita',
      specialty: 'Dermatologist',
      date: 'Today',
      time: '3:30 PM',
      mode: 'Voice /Video Call',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20with%20warm%20smile%2C%20medical%20coat%2C%20stethoscope%2C%20friendly%20appearance%2C%20medical%20photography%20style%2C%20clean%20white%20background%2C%20professional%20headshot%2C%20confident%20and%20caring%20expression&width=80&height=80&seq=doc1&orientation=squarish'
    },
    {
      id: 2,
      doctorName: 'Dr. Rajesh',
      specialty: 'Cardiologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      mode: 'In-person',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20doctor%20with%20kind%20smile%2C%20medical%20coat%2C%20stethoscope%2C%20experienced%20appearance%2C%20medical%20photography%20style%2C%20clean%20white%20background%2C%20professional%20headshot%2C%20trustworthy%20and%20professional%20expression&width=80&height=80&seq=doc2&orientation=squarish'
    }
  ];

  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Appointments</h2>
      
      {appointments.length > 0 ? (
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <Card 
              key={appointment.id} 
              className="p-4 cursor-pointer animate-scale-in"
              onClick={() => setSelectedAppointment(appointment)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.avatar}
                  alt={appointment.doctorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-medium text-emerald-600">
                      {appointment.date}, {appointment.time}
                    </span>
                    <span className="text-xs text-gray-500">— {appointment.mode}</span>
                  </div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-calendar-line text-2xl text-gray-400"></i>
          </div>
          <p className="text-gray-600 mb-2">No appointments yet</p>
          <p className="text-sm text-gray-500">Book your first one today!</p>
        </Card>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto pb-24 animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedAppointment.avatar}
                    alt={selectedAppointment.doctorName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.doctorName}</h3>
                    <p className="text-sm text-gray-600">{selectedAppointment.specialty}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span className="text-sm font-semibold text-gray-800">4.9</span>
                      <span className="text-xs text-gray-500">(1,247 reviews)</span>
                    </div>
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
                    <span className="font-semibold text-gray-900">{selectedAppointment.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-time-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Time</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedAppointment.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-video-line text-pink-600"></i>
                      <span className="text-sm text-gray-600">Mode</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedAppointment.mode}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Consultation Type</h4>
                <p className="text-sm text-gray-600 mb-3">General Consultation</p>
                <div className="bg-pink-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">
                    <i className="ri-information-line text-pink-600 mr-1"></i>
                    Please join 5 minutes before the scheduled time
                  </p>
                </div>
              </Card>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
