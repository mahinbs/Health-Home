import { useState } from 'react';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import ProactiveBookingDialog from '../../components/feature/ProactiveBookingDialog';
import { useNavigate } from 'react-router-dom';

interface Caregiver {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  hourlyRate: string;
  image: string;
  available: string;
  introduction: string;
  certifications: string[];
  languages: string[];
  totalReviews: number;
  responseTime: string;
  services: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  popular: boolean;
}

export default function Homecare() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCaregiverData, setSelectedCaregiverData] = useState<Caregiver | null>(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    duration: '2',
    serviceType: '',
    notes: '',
    address: ''
  });
  const [proactiveServices, setProactiveServices] = useState({
    doctorConsultation: false,
    diagnosticXray: false,
    medicineDelivery: false
  });
  const [showProactiveDialog, setShowProactiveDialog] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<{caregiverId: string} | null>(null);

  const services: Service[] = [
    {
      id: '1',
      name: 'Personal Care',
      description: 'Bathing, grooming, dressing assistance',
      icon: 'ri-user-heart-line',
      duration: '2-4 hours',
      price: '$35/hour',
      popular: true
    },
    {
      id: '2',
      name: 'Nursing Care',
      description: 'Medical care, medication management',
      icon: 'ri-nurse-line',
      duration: '1-3 hours',
      price: '$45/hour',
      popular: true
    },
    {
      id: '3',
      name: 'IV Infusion',
      description: 'Intravenous infusion therapy at home',
      icon: 'ri-medicine-bottle-line',
      duration: '1-2 hours',
      price: '$60/visit',
      popular: true
    },
    {
      id: '7',
      name: 'Wound Dressing',
      description: 'Professional wound care and dressing',
      icon: 'ri-first-aid-kit-line',
      duration: '30 min - 1 hour',
      price: '$40/visit',
      popular: true
    },
    {
      id: '8',
      name: 'Catheter Care',
      description: 'Catheter insertion, maintenance, and care',
      icon: 'ri-hospital-line',
      duration: '30 min - 1 hour',
      price: '$50/visit',
      popular: false
    },
    {
      id: '4',
      name: 'Physiotherapy',
      description: 'Exercise assistance, mobility support',
      icon: 'ri-run-line',
      duration: '1-2 hours',
      price: '$55/hour',
      popular: true
    },
    {
      id: '5',
      name: 'Pregnancy Care',
      description: 'Prenatal and postnatal care support',
      icon: 'ri-parent-line',
      duration: '2-4 hours',
      price: '$40/hour',
      popular: false
    },
    {
      id: '6',
      name: 'Baby Care',
      description: 'Newborn and infant care assistance',
      icon: 'ri-bear-smile-line',
      duration: '2-6 hours',
      price: '$35/hour',
      popular: false
    }
  ];

  const caregivers: Caregiver[] = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      specialty: 'Certified Nursing Assistant',
      rating: 4.9,
      experience: '8 years',
      hourlyRate: '$45',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20caregiver%20in%20medical%20scrubs%2C%20warm%20caring%20smile%2C%20healthcare%20worker%20portrait%2C%20clean%20medical%20background%2C%20compassionate%20appearance%2C%20nursing%20professional&width=80&height=80&seq=care1&orientation=squarish',
      available: 'Available Today',
      introduction: 'Maria is a compassionate CNA with 8 years of experience in home healthcare. She specializes in personal care, medication management, and providing emotional support to patients and families.',
      certifications: ['Certified Nursing Assistant (CNA)', 'CPR/AED Certified', 'First Aid Certified', 'Dementia Care Specialist'],
      languages: ['English', 'Spanish'],
      totalReviews: 342,
      responseTime: '< 2 hours',
      services: ['Personal Care', 'Medical Care', 'Companionship']
    },
    {
      id: '2',
      name: 'James Thompson',
      specialty: 'Physical Therapist Assistant',
      rating: 4.8,
      experience: '6 years',
      hourlyRate: '$55',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20physical%20therapist%20in%20medical%20uniform%2C%20confident%20friendly%20expression%2C%20healthcare%20worker%20portrait%2C%20modern%20medical%20facility%20background%2C%20physical%20therapy%20specialist&width=80&height=80&seq=care2&orientation=squarish',
      available: 'Available Tomorrow',
      introduction: 'James is a skilled PTA who helps patients regain mobility and independence. He has extensive experience with post-surgery recovery, elderly care, and chronic condition management.',
      certifications: ['Physical Therapist Assistant License', 'CPR/AED Certified', 'Geriatric Rehabilitation Specialist'],
      languages: ['English'],
      totalReviews: 198,
      responseTime: '< 4 hours',
      services: ['Physical Therapy', 'Medical Care', 'Mobility Assistance']
    },
    {
      id: '3',
      name: 'Sarah Chen',
      specialty: 'Home Health Aide',
      rating: 4.9,
      experience: '5 years',
      hourlyRate: '$35',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20home%20health%20aide%2C%20gentle%20caring%20expression%2C%20healthcare%20worker%20in%20casual%20medical%20attire%2C%20home%20care%20setting%20background%2C%20compassionate%20caregiver&width=80&height=80&seq=care3&orientation=squarish',
      available: 'Available Now',
      introduction: 'Sarah provides comprehensive home health services with a focus on maintaining dignity and independence. She excels in personal care, household assistance, and building meaningful relationships with clients.',
      certifications: ['Home Health Aide Certification', 'CPR/AED Certified', 'Alzheimer\'s Care Training'],
      languages: ['English', 'Mandarin'],
      totalReviews: 267,
      responseTime: '< 1 hour',
      services: ['Personal Care', 'Household Help', 'Companionship']
    },
    {
      id: '4',
      name: 'Michael Davis',
      specialty: 'Licensed Practical Nurse',
      rating: 4.7,
      experience: '12 years',
      hourlyRate: '$50',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20nurse%20in%20medical%20scrubs%2C%20experienced%20confident%20appearance%2C%20healthcare%20professional%20portrait%2C%20clinical%20background%2C%20licensed%20practical%20nurse&width=80&height=80&seq=care4&orientation=squarish',
      available: 'Available in 2 hours',
      introduction: 'Michael is an experienced LPN specializing in complex medical care at home. He manages chronic conditions, administers medications, and coordinates with healthcare teams for optimal patient outcomes.',
      certifications: ['Licensed Practical Nurse (LPN)', 'IV Therapy Certified', 'Wound Care Specialist', 'Diabetes Management'],
      languages: ['English', 'French'],
      totalReviews: 156,
      responseTime: '< 3 hours',
      services: ['Medical Care', 'Medication Management', 'Wound Care']
    }
  ];

  const filteredCaregivers = selectedService 
    ? caregivers.filter(caregiver => 
        caregiver.services.some(service => 
          service.toLowerCase().includes(selectedService.toLowerCase())
        )
      )
    : caregivers;

  const handleBookCaregiver = (caregiverId: string) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    if (caregiver) {
      setSelectedCaregiverData(caregiver);
      setShowBookingModal(true);
    }
  };

  const proactiveServicesList = [
    {
      id: 'consultation',
      name: 'Doctor Consultation',
      description: 'Get expert medical advice at the same time',
      icon: 'ri-stethoscope-line',
      price: '$100',
      category: 'consultation' as const
    },
    {
      id: 'xray',
      name: 'X-Ray at Home',
      description: 'Diagnostic imaging at your doorstep',
      icon: 'ri-scanner-line',
      price: '₹800',
      category: 'diagnostic' as const
    },
    {
      id: 'medicine',
      name: 'Medicine Delivery',
      description: 'Get prescribed medicines delivered to your address',
      icon: 'ri-medicine-bottle-line',
      price: 'Free',
      category: 'medicine' as const
    }
  ];

  const handleProactiveYes = (service: typeof proactiveServicesList[0]) => {
    setShowProactiveDialog(false);
    
    // Update proactive services state
    if (service.category === 'consultation') {
      setProactiveServices({...proactiveServices, doctorConsultation: true});
    } else if (service.category === 'diagnostic') {
      setProactiveServices({...proactiveServices, diagnosticXray: true});
    } else if (service.category === 'medicine') {
      setProactiveServices({...proactiveServices, medicineDelivery: true});
    }
    
    // Continue with original booking
    if (pendingBooking) {
      const caregiver = caregivers.find(c => c.id === pendingBooking.caregiverId);
      if (caregiver) {
        setSelectedCaregiverData(caregiver);
        setShowBookingModal(true);
      }
    }
    setPendingBooking(null);
  };

  const handleProactiveNo = () => {
    setShowProactiveDialog(false);
    // Continue with original booking - dialog already closed, booking modal should remain open
    setPendingBooking(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCaregiverData) return;
    
    // Calculate total cost including proactive services
    const baseCost = parseInt(selectedCaregiverData.hourlyRate.replace('$', '')) * parseInt(bookingForm.duration);
    const doctorCost = proactiveServices.doctorConsultation ? 100 : 0;
    const xrayCost = proactiveServices.diagnosticXray ? 800 : 0;
    const totalCost = baseCost + doctorCost;
    
    // Navigate to booking confirmation page
    navigate('/homecare-booking-success', {
      state: {
        caregiver: selectedCaregiverData,
        bookingDetails: bookingForm,
        proactiveServices: proactiveServices,
        totalCost: totalCost,
        xrayCost: xrayCost
      }
    });
    
    setShowBookingModal(false);
    setSelectedCaregiverData(null);
    setBookingForm({
      date: '',
      time: '',
      duration: '2',
      serviceType: '',
      notes: '',
      address: ''
    });
    setProactiveServices({
      doctorConsultation: false,
      diagnosticXray: false,
      medicineDelivery: false
    });
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedCaregiverData(null);
    setProactiveServices({
      doctorConsultation: false,
      diagnosticXray: false,
      medicineDelivery: false
    });
  };

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const durations = ['1', '2', '3', '4', '6', '8'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation 
        title="Home Care Services" 
      />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-2xl p-6 relative overflow-hidden border border-pink-200/50 shadow-lg">
            <div className="relative z-10">
              <h1 className="text-xl font-bold text-gray-800 mb-2">Professional Home Care</h1>
              <p className="text-gray-600 text-sm mb-4">Compassionate care in the comfort of your home</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <i className="ri-shield-check-line text-pink-600"></i>
                  <span className="text-gray-700 font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-time-line text-pink-600"></i>
                  <span className="text-gray-700 font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img 
                src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20home%20with%20heart%20symbol%2C%20healthcare%20home%20icon%2C%20medical%20house%20illustration%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20blue%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=128&height=128&seq=homeicon&orientation=squarish"
                alt="Home Care"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services or caregivers..."
              className="w-full bg-white/95 backdrop-blur-sm border border-pink-100/50 rounded-xl px-4 py-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 shadow-md"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 text-lg"></i>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button 
              onClick={() => {
                // Navigate to service selection page or show service selection
                if (services.length > 0 && caregivers.length > 0) {
                  // Auto-select first service and show available caregivers
                  setSelectedService(services[0].name);
                  // Scroll to caregivers section
                  setTimeout(() => {
                    const element = document.getElementById('caregivers-section');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 animate-scale-in"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-calendar-check-line text-xl"></i>
                <span className="font-semibold">Book Now</span>
              </div>
            </button>
            <button 
              onClick={() => {
                const phoneNumber = 'tel:+18001234567';
                window.location.href = phoneNumber;
              }}
              className="bg-white/95 backdrop-blur-sm border border-pink-200/50 text-pink-600 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 animate-scale-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-phone-line text-xl"></i>
                <span className="font-semibold">Call Support</span>
              </div>
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Home Care Giver Services</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(selectedService === service.name ? '' : service.name)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left relative ${
                  selectedService === service.name
                    ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-800 border-pink-300 shadow-lg scale-105'
                    : 'bg-white/95 backdrop-blur-sm border-gray-200 text-gray-700 hover:border-pink-200 hover:shadow-md'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex flex-col space-y-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className={`${service.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{service.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 leading-tight">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{service.price}</span>
                      <span className="text-xs text-gray-400">{service.duration}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Available Caregivers */}
        <div id="caregivers-section" className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">Available Caregivers</h2>
            <button className="text-pink-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {filteredCaregivers.map((caregiver) => (
              <div key={caregiver.id} className="bg-white/95 backdrop-blur-sm border border-pink-100/50 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={caregiver.image} 
                      alt={caregiver.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{caregiver.name}</h3>
                        <p className="text-gray-600 text-xs mt-1">{caregiver.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 text-sm">{caregiver.hourlyRate}</p>
                        <p className="text-xs text-gray-500">per hour</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        <span className="text-xs text-gray-600">{caregiver.rating}</span>
                        <span className="text-xs text-gray-400">({caregiver.totalReviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line text-gray-400 text-xs"></i>
                        <span className="text-xs text-gray-600">{caregiver.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {caregiver.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">{caregiver.available}</span>
                      </div>
                      
                      <button
                        onClick={() => handleBookCaregiver(caregiver.id)}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Why Choose Our Home Care</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-rose-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <i className="ri-shield-check-line text-pink-600"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-sm mb-1">Licensed & Certified</h3>
                <p className="text-gray-600 text-xs">All our caregivers are licensed, certified, and background-checked professionals.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <i className="ri-heart-pulse-line text-emerald-600"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-sm mb-1">Personalized Care Plans</h3>
                <p className="text-gray-600 text-xs">Customized care plans tailored to individual needs and preferences.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-rose-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <i className="ri-customer-service-2-line text-pink-600"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-sm mb-1">24/7 Support</h3>
                <p className="text-gray-600 text-xs">Round-the-clock support and emergency assistance when you need it most.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200/50 rounded-xl p-5 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <i className="ri-alarm-warning-line text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 text-sm mb-1">Emergency Care</h3>
              <p className="text-red-600 text-xs mb-3">Need immediate home care assistance?</p>
              <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95">
                Call Emergency Line
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Booking Dialog */}
      <ProactiveBookingDialog
        isOpen={showProactiveDialog}
        onClose={() => {
          setShowProactiveDialog(false);
          setPendingBooking(null);
        }}
        onYes={handleProactiveYes}
        onNo={handleProactiveNo}
        services={proactiveServicesList}
        title="Recommended Services"
        message="We recommend these additional services for better care. Would you like to book any of them?"
      />

      {/* Booking Modal */}
      {showBookingModal && selectedCaregiverData && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate pr-2">Caregiver Profile & Booking</h2>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600 text-lg"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pb-28 sm:pb-32">

              {/* Caregiver Profile Section */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-4 mb-5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={selectedCaregiverData.image} 
                      alt={selectedCaregiverData.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedCaregiverData.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{selectedCaregiverData.specialty}</p>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="text-sm font-medium text-gray-800">{selectedCaregiverData.rating}</span>
                        <span className="text-xs text-gray-500">({selectedCaregiverData.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line text-gray-400 text-sm"></i>
                        <span className="text-xs text-gray-600">{selectedCaregiverData.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-semibold">{selectedCaregiverData.hourlyRate} per hour</p>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">{selectedCaregiverData.available}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">{selectedCaregiverData.totalReviews}</p>
                    <p className="text-xs text-gray-500">Total Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">{selectedCaregiverData.responseTime}</p>
                    <p className="text-xs text-gray-500">Response Time</p>
                  </div>
                </div>

                {/* Introduction */}
                <div className="mb-5">
                  <h4 className="font-medium text-gray-800 mb-2">About</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedCaregiverData.introduction}</p>
                </div>

                {/* Services */}
                <div className="mb-5">
                  <h4 className="font-medium text-gray-800 mb-3">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaregiverData.services.map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-5">
                  <h4 className="font-medium text-gray-800 mb-3">Certifications</h4>
                  <div className="space-y-2">
                    {selectedCaregiverData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-award-line text-blue-600 text-sm"></i>
                        <span className="text-sm text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaregiverData.languages.map((lang, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Service</label>
                  <select
                    value={bookingForm.serviceType}
                    onChange={(e) => {
                      const serviceType = e.target.value;
                      setBookingForm({...bookingForm, serviceType});
                      
                      // Show proactive dialog for Wound Dressing
                      if (serviceType === 'Wound Dressing' || serviceType.includes('Dressing')) {
                        setPendingBooking({ caregiverId: selectedCaregiverData.id });
                        setShowProactiveDialog(true);
                      }
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                    required
                  >
                    <option value="">Choose a service...</option>
                    {selectedCaregiverData.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingForm({...bookingForm, time})}
                        className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                          bookingForm.time === time
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-sm'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Duration (hours)</label>
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {durations.map((duration) => (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => setBookingForm({...bookingForm, duration})}
                        className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                          bookingForm.duration === duration
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-sm'
                        }`}
                      >
                        {duration}h
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Service Address</label>
                  <textarea
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                    placeholder="Enter your complete address..."
                    rows={2}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 resize-none"
                    required
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Special Instructions (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    placeholder="Any special care instructions or requirements..."
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 resize-none"
                  />
                </div>

                {/* Proactive Booking Suggestions */}
                {bookingForm.serviceType && (
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <i className="ri-lightbulb-flash-line text-pink-600 text-lg"></i>
                      <h4 className="font-semibold text-gray-900">Recommended Services</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">We recommend these additional services for better care:</p>
                    
                    <div className="space-y-3">
                      {/* Doctor Consultation */}
                      <label className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-pink-200 cursor-pointer hover:border-pink-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={proactiveServices.doctorConsultation}
                          onChange={(e) => setProactiveServices({...proactiveServices, doctorConsultation: e.target.checked})}
                          className="mt-1 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <i className="ri-stethoscope-line text-pink-600"></i>
                              <span className="font-medium text-gray-900 text-sm">Doctor Consultation</span>
                            </div>
                            <span className="text-xs text-gray-600">$100</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Get expert medical advice at the same time</p>
                        </div>
                      </label>

                      {/* Diagnostic X-Ray */}
                      <label className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-pink-200 cursor-pointer hover:border-pink-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={proactiveServices.diagnosticXray}
                          onChange={(e) => setProactiveServices({...proactiveServices, diagnosticXray: e.target.checked})}
                          className="mt-1 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <i className="ri-scanner-line text-pink-600"></i>
                              <span className="font-medium text-gray-900 text-sm">X-Ray at Home</span>
                            </div>
                            <span className="text-xs text-gray-600">₹800</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Diagnostic imaging at your doorstep</p>
                        </div>
                      </label>

                      {/* Medicine Delivery */}
                      <label className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-pink-200 cursor-pointer hover:border-pink-400 transition-colors">
                        <input
                          type="checkbox"
                          checked={proactiveServices.medicineDelivery}
                          onChange={(e) => setProactiveServices({...proactiveServices, medicineDelivery: e.target.checked})}
                          className="mt-1 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <i className="ri-medicine-bottle-line text-pink-600"></i>
                              <span className="font-medium text-gray-900 text-sm">Medicine Delivery</span>
                            </div>
                            <span className="text-xs text-gray-600">Free</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Get prescribed medicines delivered to your address</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Cost Summary */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Cost Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {bookingForm.duration} hours × {selectedCaregiverData.hourlyRate}
                      </span>
                      <span className="font-semibold text-gray-800">
                        ${parseInt(selectedCaregiverData.hourlyRate.replace('$', '')) * parseInt(bookingForm.duration)}
                      </span>
                    </div>
                    {proactiveServices.doctorConsultation && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Doctor Consultation</span>
                        <span className="font-semibold text-gray-800">$100</span>
                      </div>
                    )}
                    {proactiveServices.diagnosticXray && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">X-Ray at Home</span>
                        <span className="font-semibold text-gray-800">₹800</span>
                      </div>
                    )}
                    {proactiveServices.medicineDelivery && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Medicine Delivery</span>
                        <span className="font-semibold text-emerald-600">Free</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-lg text-gray-900">
                          ${parseInt(selectedCaregiverData.hourlyRate.replace('$', '')) * parseInt(bookingForm.duration) + (proactiveServices.doctorConsultation ? 100 : 0)}
                          {proactiveServices.diagnosticXray && ' + ₹800'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!bookingForm.date || !bookingForm.time || !bookingForm.serviceType || !bookingForm.address}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
                  >
                    Confirm Booking - ${parseInt(selectedCaregiverData.hourlyRate.replace('$', '')) * parseInt(bookingForm.duration) + (proactiveServices.doctorConsultation ? 100 : 0)}
                    {proactiveServices.diagnosticXray && ' + ₹800'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}