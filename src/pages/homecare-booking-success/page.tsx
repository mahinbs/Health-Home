
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function HomecareBookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { caregiver, bookingDetails, totalCost } = location.state || {};

  if (!caregiver || !bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
        <TopNavigation title="Booking" showBack={true} onBack={() => navigate('/homecare')} />
        <div className="pt-24 pb-24 px-4 flex items-center justify-center min-h-[calc(100vh-120px)]">
          <Card className="p-8 text-center">
            <p className="text-gray-600">No booking details found</p>
            <Button onClick={() => navigate('/homecare')} className="mt-4">
              Go Back
            </Button>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation title="Booking Confirmed" showBack={false} showCart={true} />
      
      <div className="pt-24 pb-24 px-4">
        <Card className="p-6 text-center mb-6 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-subtle">
            <i className="ri-check-line text-4xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your homecare service has been scheduled</p>
        </Card>

        <div className="space-y-4 mb-6">
          <Card className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/50">
            <h3 className="font-semibold text-gray-900 mb-4">Caregiver Details</h3>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={caregiver.image}
                alt={caregiver.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{caregiver.name}</h4>
                <p className="text-sm text-gray-600">{caregiver.specialty}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <i className="ri-star-fill text-yellow-400 text-sm"></i>
                  <span className="text-sm font-semibold text-gray-800">{caregiver.rating}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-calendar-line text-pink-600"></i>
                  <span className="text-sm text-gray-600">Date</span>
                </div>
                <span className="font-semibold text-gray-900">{bookingDetails.date || 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-time-line text-pink-600"></i>
                  <span className="text-sm text-gray-600">Time</span>
                </div>
                <span className="font-semibold text-gray-900">{bookingDetails.time || 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-timer-line text-pink-600"></i>
                  <span className="text-sm text-gray-600">Duration</span>
                </div>
                <span className="font-semibold text-gray-900">{bookingDetails.duration} hours</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-service-line text-pink-600"></i>
                  <span className="text-sm text-gray-600">Service</span>
                </div>
                <span className="font-semibold text-gray-900">{bookingDetails.serviceType || 'Not selected'}</span>
              </div>
              {bookingDetails.address && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-start space-x-2">
                    <i className="ri-map-pin-line text-pink-600 mt-1"></i>
                    <div className="flex-1">
                      <span className="text-sm text-gray-600 block mb-1">Address</span>
                      <span className="text-sm font-semibold text-gray-900">{bookingDetails.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/50">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Cost</span>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ${totalCost || 0}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {caregiver.hourlyRate} per hour × {bookingDetails.duration} hours
            </p>
          </Card>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate('/homecare')} className="w-full">
            Book Another Service
          </Button>
          <Button variant="outline" onClick={() => navigate('/')} className="w-full">
            Go to Home
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

