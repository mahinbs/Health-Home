import { useState } from 'react';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface DiagnosticCenter {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  charges: number;
  availableSlots: string[];
}

interface DiagnosticService {
  id: string;
  name: string;
  category: 'xray' | 'laboratory' | 'diagnostic-center';
  subCategory?: string;
  location: 'home' | 'hospital' | 'clinic' | 'lab';
  description: string;
  price: number;
  icon: string;
  centers?: DiagnosticCenter[];
}

export default function DiagnosticBooking() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'xray' | 'laboratory' | 'diagnostic-center' | null>(null);
  const [selectedService, setSelectedService] = useState<DiagnosticService | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    address: '',
    location: 'home' as 'home' | 'hospital' | 'clinic' | 'lab',
    centerId: ''
  });

  const services: DiagnosticService[] = [
    // X-Ray Services
    {
      id: 'xray-1',
      name: 'X-Ray at Home',
      category: 'xray',
      subCategory: 'Home Service',
      location: 'home',
      description: 'Portable X-ray service at your doorstep',
      price: 800,
      icon: 'ri-scanner-line'
    },
    {
      id: 'xray-2',
      name: 'X-Ray at Hospital',
      category: 'xray',
      subCategory: 'Hospital',
      location: 'hospital',
      description: 'X-ray services at hospital facility',
      price: 600,
      icon: 'ri-hospital-line'
    },
    {
      id: 'xray-3',
      name: 'X-Ray at Clinic',
      category: 'xray',
      subCategory: 'Clinic',
      location: 'clinic',
      description: 'X-ray services at nearby clinic',
      price: 700,
      icon: 'ri-building-line'
    },
    // Laboratory Services - Pathology
    {
      id: 'lab-path-home',
      name: 'Pathology Lab - Blood Collection at Home',
      category: 'laboratory',
      subCategory: 'Pathology',
      location: 'home',
      description: 'Complete blood count, biochemistry tests with home blood collection',
      price: 700,
      icon: 'ri-test-tube-line'
    },
    {
      id: 'lab-path-lab',
      name: 'Pathology Lab - Visit Lab',
      category: 'laboratory',
      subCategory: 'Pathology',
      location: 'lab',
      description: 'Complete blood count, biochemistry tests at lab facility',
      price: 500,
      icon: 'ri-test-tube-line'
    },
    // Laboratory Services - Microbiology
    {
      id: 'lab-micro-home',
      name: 'Microbiology Lab - Blood Collection at Home',
      category: 'laboratory',
      subCategory: 'Microbiology',
      location: 'home',
      description: 'Culture tests, sensitivity analysis with home sample collection',
      price: 800,
      icon: 'ri-microscope-line'
    },
    {
      id: 'lab-micro-lab',
      name: 'Microbiology Lab - Visit Lab',
      category: 'laboratory',
      subCategory: 'Microbiology',
      location: 'lab',
      description: 'Culture tests, sensitivity analysis at lab facility',
      price: 600,
      icon: 'ri-microscope-line'
    },
    // Laboratory Services - Biochemistry
    {
      id: 'lab-biochem-home',
      name: 'Biochemistry Lab - Blood Collection at Home',
      category: 'laboratory',
      subCategory: 'Biochemistry',
      location: 'home',
      description: 'Liver function, kidney function tests with home blood collection',
      price: 750,
      icon: 'ri-flask-line'
    },
    {
      id: 'lab-biochem-lab',
      name: 'Biochemistry Lab - Visit Lab',
      category: 'laboratory',
      subCategory: 'Biochemistry',
      location: 'lab',
      description: 'Liver function, kidney function tests at lab facility',
      price: 550,
      icon: 'ri-flask-line'
    },
    // Laboratory Services - Histopathology
    {
      id: 'lab-hist-home',
      name: 'Histopathology Lab - Sample Collection at Home',
      category: 'laboratory',
      subCategory: 'Histopathology',
      location: 'home',
      description: 'Tissue analysis and biopsy with home sample collection',
      price: 1400,
      icon: 'ri-file-search-line'
    },
    {
      id: 'lab-hist-lab',
      name: 'Histopathology Lab - Visit Lab',
      category: 'laboratory',
      subCategory: 'Histopathology',
      location: 'lab',
      description: 'Tissue analysis and biopsy reports at lab facility',
      price: 1200,
      icon: 'ri-file-search-line'
    },
    // Diagnostic Centers
    {
      id: 'diag-1',
      name: 'CT Scan Center',
      category: 'diagnostic-center',
      subCategory: 'CT Scan',
      location: 'hospital',
      description: 'CT scan with contrast and without contrast',
      price: 3000,
      icon: 'ri-scanner-2-line',
      centers: [
        {
          id: 'ct1',
          name: 'Apollo Diagnostics',
          address: '123 Medical Street, Mumbai',
          rating: 4.8,
          distance: '2.5 km',
          charges: 3000,
          availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
        },
        {
          id: 'ct2',
          name: 'Fortis Diagnostic Center',
          address: '456 Health Avenue, Mumbai',
          rating: 4.7,
          distance: '3.2 km',
          charges: 3200,
          availableSlots: ['10:00 AM', '12:00 PM', '03:00 PM']
        }
      ]
    },
    {
      id: 'diag-2',
      name: 'MRI Center',
      category: 'diagnostic-center',
      subCategory: 'MRI',
      location: 'hospital',
      description: 'MRI scan for detailed imaging',
      price: 5000,
      icon: 'ri-magnetic-line',
      centers: [
        {
          id: 'mri1',
          name: 'Max Healthcare Diagnostics',
          address: '789 Care Boulevard, Mumbai',
          rating: 4.9,
          distance: '4.1 km',
          charges: 5000,
          availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']
        },
        {
          id: 'mri2',
          name: 'AIIMS Diagnostic Center',
          address: '321 Wellness Road, Mumbai',
          rating: 4.6,
          distance: '5.5 km',
          charges: 4800,
          availableSlots: ['10:00 AM', '01:00 PM', '03:00 PM']
        }
      ]
    },
    {
      id: 'diag-3',
      name: 'Neuro Diagnostic Center',
      category: 'diagnostic-center',
      subCategory: 'Neuro',
      location: 'hospital',
      description: 'EEG, EMG, and neurological tests',
      price: 2500,
      icon: 'ri-brain-line',
      centers: [
        {
          id: 'neuro1',
          name: 'Neuro Care Diagnostics',
          address: '654 Brain Street, Mumbai',
          rating: 4.8,
          distance: '3.8 km',
          charges: 2500,
          availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM']
        },
        {
          id: 'neuro2',
          name: 'Brain Scan Center',
          address: '789 Neurology Avenue, Mumbai',
          rating: 4.7,
          distance: '4.5 km',
          charges: 2700,
          availableSlots: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM']
        },
        {
          id: 'neuro3',
          name: 'Advanced Neuro Diagnostics',
          address: '321 Neural Road, Mumbai',
          rating: 4.9,
          distance: '2.2 km',
          charges: 2800,
          availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
        }
      ]
    }
  ];

  const filteredServices = selectedCategory
    ? services.filter(s => s.category === selectedCategory)
    : services;

  const handleBookService = (service: DiagnosticService) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    alert('Diagnostic booking confirmed! You will receive a confirmation shortly.');
    setShowBookingModal(false);
    setSelectedService(null);
    setBookingForm({
      date: '',
      time: '',
      address: '',
      location: 'home',
      centerId: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation 
        title="Diagnostic Booking" 
      />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4">
        {/* Hero Section */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-2">Book Diagnostic Tests</h1>
            <p className="text-pink-100">X-Ray, Lab Tests, CT Scan, MRI & more</p>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Category</h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'xray' ? null : 'xray')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === 'xray'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <i className="ri-scanner-line text-2xl mb-2"></i>
              <p className="text-xs font-medium">X-Ray</p>
            </button>
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'laboratory' ? null : 'laboratory')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === 'laboratory'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <i className="ri-test-tube-line text-2xl mb-2"></i>
              <p className="text-xs font-medium">Laboratory</p>
            </button>
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'diagnostic-center' ? null : 'diagnostic-center')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === 'diagnostic-center'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300'
              }`}
            >
              <i className="ri-hospital-line text-2xl mb-2"></i>
              <p className="text-xs font-medium">Diagnostic</p>
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center">
                      <i className={`${service.icon} text-pink-600 text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      {service.subCategory && (
                        <p className="text-xs text-gray-500">{service.subCategory}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      <i className="ri-map-pin-line mr-1"></i>
                      {service.location === 'home' ? 'At Home' : 
                       service.location === 'hospital' ? 'Hospital' :
                       service.location === 'clinic' ? 'Clinic' : 'Lab'}
                    </span>
                    <span className="font-bold text-pink-600">₹{service.price}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleBookService(service)}
                  className="ml-4"
                  size="sm"
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Book {selectedService.name}</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Location Selection for X-Ray */}
                {selectedService.category === 'xray' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Location</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['home', 'hospital', 'clinic'].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setBookingForm({...bookingForm, location: loc as any})}
                          className={`p-3 rounded-lg border transition-all ${
                            bookingForm.location === loc
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md'
                              : 'bg-white border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          {loc.charAt(0).toUpperCase() + loc.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Selection for Laboratory */}
                {selectedService.category === 'laboratory' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Collection Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['home', 'lab'].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setBookingForm({...bookingForm, location: loc as any})}
                          className={`p-3 rounded-lg border transition-all ${
                            bookingForm.location === loc
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md'
                              : 'bg-white border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          {loc === 'home' ? 'Blood Collection at Home' : 'Visit Lab for Collection'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Center Selection for Diagnostic Centers */}
                {selectedService.centers && selectedService.centers.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Diagnostic Center</label>
                    <div className="space-y-2">
                      {selectedService.centers.map((center) => (
                        <button
                          key={center.id}
                          type="button"
                          onClick={() => setBookingForm({...bookingForm, centerId: center.id})}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            bookingForm.centerId === center.id
                              ? 'bg-pink-50 border-pink-500 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm">{center.name}</p>
                              <p className="text-xs text-gray-600">{center.address}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  <i className="ri-map-pin-line mr-1"></i>
                                  {center.distance}
                                </span>
                                <span className="text-xs text-yellow-600">★ {center.rating}</span>
                              </div>
                            </div>
                            <span className="font-bold text-pink-600">₹{center.charges}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(selectedService.centers?.find(c => c.id === bookingForm.centerId)?.availableSlots || 
                      ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']).map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingForm({...bookingForm, time})}
                        className={`p-2 rounded-lg border text-xs transition-all ${
                          bookingForm.time === time
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address for home service */}
                {(bookingForm.location === 'home' || selectedService.location === 'home') && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <textarea
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                      placeholder="Enter your complete address..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3"
                      required={bookingForm.location === 'home'}
                    />
                  </div>
                )}

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total Charges</span>
                    <span className="font-bold text-lg text-pink-600">
                      ₹{selectedService.centers?.find(c => c.id === bookingForm.centerId)?.charges || selectedService.price}
                    </span>
                  </div>
                  {selectedService.category === 'laboratory' && bookingForm.location === 'home' && (
                    <p className="text-xs text-gray-600 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Includes home collection charges
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={!bookingForm.date || !bookingForm.time}>
                  Confirm Booking
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

