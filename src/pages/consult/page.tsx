import { useState } from 'react';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import ProactiveBookingDialog from '../../components/feature/ProactiveBookingDialog';
import Button from '../../components/base/Button';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: string;
  image: string;
  available: string;
  introduction: string;
  education: string[];
  certifications: string[];
  languages: string[];
  totalReviews: number;
  successRate: string;
  responseTime: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone: string;
  hospitalRating: number;
  services: string[];
  freelancingCities: string[];
  weeklyOPD: {
    day: string;
    time: string;
    location: string;
  }[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  message: string;
  timestamp: string;
  doctorName?: string;
}

export default function Consult() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedDoctorData, setSelectedDoctorData] = useState<Doctor | null>(null);
  const [showProactiveDialog, setShowProactiveDialog] = useState(false);
  const [proactiveServices, setProactiveServices] = useState({
    homecareDressing: false,
    diagnosticXray: false,
    medicineDelivery: false
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'doctor',
      message: 'Hello! I\'m Dr. Sarah Johnson. How can I help you today?',
      timestamp: '10:30 AM',
      doctorName: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      sender: 'user',
      message: 'Hi Doctor, I\'ve been experiencing chest pain for the past few days.',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      sender: 'doctor',
      message: 'I understand your concern. Can you describe the type of pain? Is it sharp, dull, or burning? And does it occur during specific activities?',
      timestamp: '10:33 AM',
      doctorName: 'Dr. Sarah Johnson'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    consultationType: 'video',
    symptoms: '',
    notes: '',
    clinicalPictures: [] as File[],
    isSecondOpinion: false,
    shareHealthRecords: false,
    basicData: {
      age: '',
      gender: '',
      height: '',
      weight: '',
      bloodPressure: '',
      allergies: '',
      currentMedications: ''
    },
    doctorQuestions: [] as { question: string; answer: string }[]
  });
  const [showDoctorQuestions, setShowDoctorQuestions] = useState(false);
  const [showEditDoctorProfile, setShowEditDoctorProfile] = useState(false);
  const [editableDoctorData, setEditableDoctorData] = useState<Doctor | null>(null);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [showHospitalOnboarding, setShowHospitalOnboarding] = useState(false);
  const [hospitalForm, setHospitalForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    rating: 0,
    image: null as File | null,
    services: [] as string[],
    doctors: [] as any[]
  });
  const [newService, setNewService] = useState('');
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    experience: '',
    price: '',
    available: true
  });

  // AI Diagnostic Assistant States
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showAIResults, setShowAIResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const specialties = [
    { name: 'General', icon: 'ri-stethoscope-line' },
    { name: 'Cardiology', icon: 'ri-heart-pulse-line' },
    { name: 'Dermatology', icon: 'ri-user-heart-line' },
    { name: 'Orthopedics', icon: 'ri-wheelchair-line' },
    { name: 'Pediatrics', icon: 'ri-bear-smile-line' },
    { name: 'Neurology', icon: 'ri-brain-line' },
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      experience: '15 years',
      price: '$120',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20stethoscope%20around%20neck%2C%20medical%20office%20background%2C%20soft%20lighting%2C%20healthcare%20professional%20portrait%2C%20clean%20and%20trustworthy%20appearance&width=80&height=80&seq=doc1&orientation=squarish',
      available: 'Available Now',
      introduction: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and interventional procedures.',
      education: ['MD - Harvard Medical School', 'Residency - Johns Hopkins Hospital', 'Fellowship - Mayo Clinic Cardiology'],
      certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support (ACLS)', 'Interventional Cardiology Certification'],
      languages: ['English', 'Spanish', 'French'],
      totalReviews: 1247,
      successRate: '98%',
      responseTime: '< 5 minutes',
      hospitalName: 'Apollo Hospitals',
      hospitalAddress: '123 Medical Street, Mumbai, Maharashtra 400001',
      hospitalPhone: '+91 22 1234 5678',
      hospitalRating: 4.8,
      services: ['Cardiac Consultation', 'ECG', 'Echocardiography', 'Stress Test', 'Second Opinion'],
      freelancingCities: ['Mumbai', 'Pune', 'Delhi'],
      weeklyOPD: [
        { day: 'Monday', time: '9:00 AM - 1:00 PM', location: 'Apollo Hospitals, Mumbai' },
        { day: 'Wednesday', time: '2:00 PM - 6:00 PM', location: 'Apollo Hospitals, Mumbai' },
        { day: 'Friday', time: '10:00 AM - 2:00 PM', location: 'Apollo Hospitals, Pune' }
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      experience: '12 years',
      price: '$100',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20doctor%20in%20white%20coat%2C%20friendly%20expression%2C%20medical%20background%2C%20healthcare%20specialist%20portrait%2C%20clean%20and%20professional%20appearance&width=80&height=80&seq=doc2&orientation=squarish',
      available: 'Available in 30 min',
      introduction: 'Dr. Michael Chen is a renowned dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions, acne, and performing advanced dermatological procedures.',
      education: ['MD - Stanford University School of Medicine', 'Residency - UCSF Dermatology', 'Fellowship - Mohs Surgery'],
      certifications: ['Board Certified in Dermatology', 'Mohs Surgery Certification', 'Cosmetic Dermatology Certification'],
      languages: ['English', 'Mandarin', 'Cantonese'],
      totalReviews: 892,
      successRate: '96%',
      responseTime: '< 10 minutes',
      hospitalName: 'Fortis Healthcare',
      hospitalAddress: '456 Health Avenue, Mumbai, Maharashtra 400052',
      hospitalPhone: '+91 22 2345 6789',
      hospitalRating: 4.7,
      services: ['Skin Consultation', 'Acne Treatment', 'Cosmetic Procedures', 'Second Opinion'],
      freelancingCities: ['Mumbai', 'Bangalore'],
      weeklyOPD: [
        { day: 'Tuesday', time: '10:00 AM - 2:00 PM', location: 'Fortis Healthcare, Mumbai' },
        { day: 'Thursday', time: '3:00 PM - 7:00 PM', location: 'Fortis Healthcare, Mumbai' },
        { day: 'Saturday', time: '11:00 AM - 3:00 PM', location: 'Fortis Healthcare, Bangalore' }
      ]
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      experience: '10 years',
      price: '$90',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20pediatric%20doctor%2C%20warm%20and%20caring%20expression%2C%20white%20medical%20coat%2C%20child-friendly%20medical%20office%20background%2C%20healthcare%20professional%20portrait&width=80&height=80&seq=doc3&orientation=squarish',
      available: 'Available Now',
      introduction: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. She specializes in developmental pediatrics and childhood nutrition.',
      education: ['MD - University of Pennsylvania', 'Residency - Children\'s Hospital of Philadelphia', 'Fellowship - Developmental Pediatrics'],
      certifications: ['Board Certified in Pediatrics', 'Pediatric Advanced Life Support (PALS)', 'Developmental Pediatrics Certification'],
      languages: ['English', 'Spanish', 'Portuguese'],
      totalReviews: 1156,
      successRate: '99%',
      responseTime: '< 3 minutes',
      hospitalName: 'Max Super Specialty Hospital',
      hospitalAddress: '789 Children\'s Care Boulevard, Mumbai, Maharashtra 400070',
      hospitalPhone: '+91 22 3456 7890',
      hospitalRating: 4.9,
      services: ['Pediatric Consultation', 'Child Development Assessment', 'Nutrition Counseling', 'Second Opinion'],
      freelancingCities: ['Mumbai', 'Pune'],
      weeklyOPD: [
        { day: 'Monday', time: '10:00 AM - 2:00 PM', location: 'Max Super Specialty Hospital, Mumbai' },
        { day: 'Wednesday', time: '2:00 PM - 6:00 PM', location: 'Max Super Specialty Hospital, Mumbai' },
        { day: 'Friday', time: '11:00 AM - 3:00 PM', location: 'Max Super Specialty Hospital, Pune' }
      ]
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      experience: '18 years',
      price: '$150',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20orthopedic%20doctor%2C%20confident%20expression%2C%20white%20medical%20coat%2C%20modern%20medical%20facility%20background%2C%20healthcare%20specialist%20portrait&width=80&height=80&seq=doc4&orientation=squarish',
      available: 'Available in 1 hour',
      introduction: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine, joint replacement, and trauma surgery. He has helped thousands of patients regain mobility and return to active lifestyles.',
      education: ['MD - Duke University School of Medicine', 'Residency - Hospital for Special Surgery', 'Fellowship - Sports Medicine & Arthroscopy'],
      certifications: ['Board Certified in Orthopedic Surgery', 'Sports Medicine Certification', 'Arthroscopic Surgery Certification'],
      languages: ['English', 'German'],
      totalReviews: 743,
      successRate: '97%',
      responseTime: '< 15 minutes',
      hospitalName: 'Wockhardt Hospitals',
      hospitalAddress: '321 Orthopedic Center Road, Mumbai, Maharashtra 400018',
      hospitalPhone: '+91 22 4567 8901',
      hospitalRating: 4.6,
      services: ['Orthopedic Consultation', 'Sports Medicine', 'Joint Replacement', 'Trauma Surgery', 'Second Opinion'],
      freelancingCities: ['Mumbai', 'Delhi', 'Bangalore'],
      weeklyOPD: [
        { day: 'Tuesday', time: '9:00 AM - 1:00 PM', location: 'Wockhardt Hospitals, Mumbai' },
        { day: 'Thursday', time: '2:00 PM - 6:00 PM', location: 'Wockhardt Hospitals, Mumbai' },
        { day: 'Saturday', time: '10:00 AM - 2:00 PM', location: 'Wockhardt Hospitals, Delhi' }
      ]
    }
  ];

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase())
    : doctors;

  const handleBookConsultation = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctorData(doctor);
      // Show proactive dialog for consultation booking
      setShowProactiveDialog(true);
    }
  };

  const proactiveServicesList = [
    {
      id: 'homecare',
      name: 'Wound Dressing at Home',
      description: 'Professional wound care and dressing service',
      icon: 'ri-first-aid-kit-line',
      price: '$40/visit',
      category: 'homecare' as const
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
    if (service.category === 'homecare') {
      setProactiveServices({ ...proactiveServices, homecareDressing: true });
    } else if (service.category === 'diagnostic') {
      setProactiveServices({ ...proactiveServices, diagnosticXray: true });
    } else if (service.category === 'medicine') {
      setProactiveServices({ ...proactiveServices, medicineDelivery: true });
    }

    // Continue with consultation booking
    if (selectedDoctorData) {
      setShowBookingModal(true);
    }
  };

  const handleProactiveNo = () => {
    setShowProactiveDialog(false);
    // Continue with consultation booking
    if (selectedDoctorData) {
      setShowBookingModal(true);
    }
  };

  const handleOpenChat = () => {
    setShowChatModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');

      // Simulate doctor response after 2 seconds
      setTimeout(() => {
        const doctorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'doctor',
          message: 'Thank you for sharing that information. Based on what you\'ve described, I\'d recommend scheduling a video consultation for a more detailed examination. Would you like me to help you book an appointment?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          doctorName: 'Dr. Sarah Johnson'
        };
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset form and close modal
    setShowBookingModal(false);
    setSelectedDoctorData(null);
    setBookingForm({
      date: '',
      time: '',
      consultationType: 'video',
      symptoms: '',
      notes: '',
      clinicalPictures: [],
      isSecondOpinion: false,
      basicData: {
        age: '',
        gender: '',
        height: '',
        weight: '',
        bloodPressure: '',
        allergies: '',
        currentMedications: ''
      },
      doctorQuestions: []
    });

    // Show success message
    alert('Consultation booked successfully!');
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedDoctorData(null);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIAnalysis = () => {
    if (!aiInput.trim() && uploadedFiles.length === 0) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAIResults(true);
    }, 2000);
  };

  const closeAIAssistant = () => {
    setShowAIAssistant(false);
    setAiInput('');
    setUploadedFiles([]);
    setShowAIResults(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation
        title="Consult Doctor"
      />

      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-32 sm:pb-36 px-4">
        {/* Proactive Booking Dialog */}
        <ProactiveBookingDialog
          isOpen={showProactiveDialog}
          onClose={() => {
            setShowProactiveDialog(false);
            if (selectedDoctorData) {
              setShowBookingModal(true);
            }
          }}
          onYes={handleProactiveYes}
          onNo={handleProactiveNo}
          services={proactiveServicesList}
          title="Recommended Services"
          message="We recommend these additional services for comprehensive care. Would you like to book any of them?"
        />

        {/* AI Assistant Modal */}
        {showAIAssistant && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto pb-24 animate-slide-up">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <i className="ri-robot-2-fill text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">AI Health Assistant</h2>
                    <p className="text-xs text-gray-500">Get instant health insights</p>
                  </div>
                </div>
                <button
                  onClick={closeAIAssistant}
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <div className="p-5 space-y-5">
                {!showAIResults ? (
                  <>
                    {/* Upload Section */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Upload Medical Reports or X-rays
                      </label>
                      <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6 bg-purple-50/50">
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <i className="ri-upload-cloud-2-line text-purple-600 text-3xl"></i>
                          </div>
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            Tap to upload files
                          </p>
                          <p className="text-xs text-gray-500">
                            Supports images and PDF files
                          </p>
                        </label>
                      </div>

                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-200"
                            >
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <i className="ri-file-line text-purple-600"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFile(index)}
                                className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0 ml-2"
                              >
                                <i className="ri-close-line text-red-600 text-sm"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Symptoms Input */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Describe Your Symptoms or Concerns
                      </label>
                      <textarea
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="E.g., I have been experiencing chest pain and shortness of breath for the past 3 days..."
                        rows={5}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 resize-none"
                      />
                    </div>

                    {/* Analyze Button */}
                    <button
                      onClick={handleAIAnalysis}
                      disabled={!aiInput.trim() && uploadedFiles.length === 0}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 active:scale-95"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-sparkling-2-fill text-xl"></i>
                          <span>Analyze with AI</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    {/* AI Analysis Results */}
                    <div className="space-y-5">
                      {/* Condition Information */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i className="ri-heart-pulse-fill text-white text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">Possible Condition</h3>
                            <p className="text-sm text-gray-600">Based on your symptoms and reports</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Cardiovascular Concern</h4>
                          <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            Your symptoms of chest pain and shortness of breath may indicate a cardiovascular issue.
                            This could range from minor conditions like anxiety or muscle strain to more serious concerns
                            requiring immediate medical attention.
                          </p>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                              Moderate Priority
                            </div>
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              Consult Soon
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 text-sm">Key Information:</h4>
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <i className="ri-checkbox-circle-fill text-blue-600 text-sm mt-0.5"></i>
                              <p className="text-sm text-gray-700">Chest pain can have multiple causes - cardiac, respiratory, or musculoskeletal</p>
                            </div>
                            <div className="flex items-start space-x-2">
                              <i className="ri-checkbox-circle-fill text-blue-600 text-sm mt-0.5"></i>
                              <p className="text-sm text-gray-700">Shortness of breath may indicate reduced oxygen supply or lung function issues</p>
                            </div>
                            <div className="flex items-start space-x-2">
                              <i className="ri-checkbox-circle-fill text-blue-600 text-sm mt-0.5"></i>
                              <p className="text-sm text-gray-700">Early consultation can help rule out serious conditions and provide peace of mind</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Doctors */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                          <i className="ri-stethoscope-line text-purple-600 mr-2"></i>
                          Recommended Specialists
                        </h3>
                        <div className="space-y-3">
                          {/* Cardiologist */}
                          <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 shadow-sm">
                            <div className="flex items-start space-x-3">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                  src="https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20stethoscope%20around%20neck%2C%20medical%20office%20background%2C%20soft%20lighting%2C%20healthcare%20professional%20portrait%2C%20clean%20and%20trustworthy%20appearance&width=80&height=80&seq=doc1&orientation=squarish"
                                  alt="Dr. Sarah Johnson"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Dr. Sarah Johnson</h4>
                                    <p className="text-gray-500 text-xs mt-0.5">Cardiology Specialist</p>
                                  </div>
                                  <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                                    <i className="ri-star-fill text-yellow-500 text-xs"></i>
                                    <span className="text-xs font-semibold text-gray-800">4.9</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="flex items-center space-x-1">
                                    <i className="ri-time-line text-gray-400 text-xs"></i>
                                    <span className="text-xs text-gray-600">15 years exp</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-green-600 font-medium">Available Now</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-pink-600 text-sm">$120/session</p>
                                  <button
                                    onClick={() => {
                                      handleBookConsultation('1');
                                      closeAIAssistant();
                                    }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-600 flex items-start">
                                <i className="ri-information-fill text-purple-600 mr-1 mt-0.5"></i>
                                <span>Highly recommended for cardiovascular concerns and heart health assessment</span>
                              </p>
                            </div>
                          </div>

                          {/* General Physician */}
                          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-start space-x-3">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                  src="https://readdy.ai/api/search-image?query=Professional%20female%20pediatric%20doctor%2C%20warm%20and%20caring%20expression%2C%20white%20medical%20coat%2C%20child-friendly%20medical%20office%20background%2C%20healthcare%20professional%20portrait&width=80&height=80&seq=doc3&orientation=squarish"
                                  alt="Dr. Emily Rodriguez"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Dr. Emily Rodriguez</h4>
                                    <p className="text-gray-500 text-xs mt-0.5">General Physician</p>
                                  </div>
                                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <i className="ri-star-fill text-yellow-500 text-xs"></i>
                                    <span className="text-xs font-semibold text-gray-800">4.9</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="flex items-center space-x-1">
                                    <i className="ri-time-line text-gray-400 text-xs"></i>
                                    <span className="text-xs text-gray-600">10 years exp</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-green-600 font-medium">Available Now</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-pink-600 text-sm">$90/session</p>
                                  <button
                                    onClick={() => {
                                      handleBookConsultation('3');
                                      closeAIAssistant();
                                    }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-600 flex items-start">
                                <i className="ri-information-fill text-blue-600 mr-1 mt-0.5"></i>
                                <span>Good for initial assessment and general health concerns</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Important Notice */}
                      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-alarm-warning-fill text-white text-lg"></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-red-900 mb-1 text-sm">Important Notice</h4>
                            <p className="text-xs text-red-800 leading-relaxed mb-2">
                              This AI analysis is for informational purposes only and should not replace professional medical advice.
                              If you experience severe chest pain, difficulty breathing, or other emergency symptoms, please call
                              emergency services immediately.
                            </p>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors">
                              <i className="ri-phone-fill mr-1"></i>
                              Call Emergency
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setShowAIResults(false);
                            setAiInput('');
                            setUploadedFiles([]);
                          }}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-white/40 transition-colors"
                        >
                          New Analysis
                        </button>
                        <button
                          onClick={closeAIAssistant}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, symptoms..."
              className="w-full bg-white/95 backdrop-blur-sm border border-pink-100/50 rounded-2xl px-4 py-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 shadow-md"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 text-lg"></i>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button className="bg-white/95 backdrop-blur-sm text-pink-600 rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-100/50">
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-video-line text-xl"></i>
                <span className="font-semibold text-sm">Voice /Video Call</span>
              </div>
            </button>
            <button
              onClick={handleOpenChat}
              className="bg-white/95 backdrop-blur-sm text-pink-600 rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-100/50"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-chat-3-line text-xl"></i>
                <span className="font-semibold text-sm">Chat</span>
              </div>
            </button>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 px-1">Choose Specialty</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty.name}
                onClick={() => setSelectedSpecialty(selectedSpecialty === specialty.name ? '' : specialty.name)}
                className={`p-4 rounded-2xl transition-all duration-300 ${selectedSpecialty === specialty.name
                    ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                    : 'bg-white/95 backdrop-blur-sm text-gray-700 hover:shadow-md hover:scale-105 border border-pink-100/50'
                  }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className={`${specialty.icon} text-xl`}></i>
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">{specialty.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base font-semibold text-gray-800">Available Doctors</h2>
            <button className="text-pink-600 text-sm font-medium">View All</button>
          </div>

          <div className="space-y-3">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-pink-100/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedDoctorData(doctor);
                      setShowBookingModal(true);
                    }}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      setSelectedDoctorData(doctor);
                      setShowBookingModal(true);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{doctor.name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">{doctor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 text-sm">{doctor.price}</p>
                        <p className="text-xs text-gray-400">per session</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        <span className="text-xs text-gray-600">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line text-gray-400 text-xs"></i>
                        <span className="text-xs text-gray-600">{doctor.experience}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">{doctor.available}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookConsultation(doctor.id);
                        }}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
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

        {/* Hospitals Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base font-semibold text-gray-800">Hospitals & Healthcare Centers</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHospitalOnboarding(true)}
                className="text-pink-600 text-sm font-medium flex items-center"
              >
                <i className="ri-add-line mr-1"></i>
                Onboard Hospital
              </button>
              <button
                onClick={() => setShowHospitalModal(true)}
                className="text-pink-600 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                id: '1',
                name: 'Apollo Hospitals',
                address: '123 Medical Street, Mumbai',
                rating: 4.8,
                services: ['Blood Tests', 'X-Ray', 'ECG', 'Consultation'],
                doctorsCount: 15,
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80'
              },
              {
                id: '2',
                name: 'Fortis Healthcare',
                address: '456 Health Avenue, Mumbai',
                rating: 4.7,
                services: ['Lab Tests', 'MRI', 'CT Scan', 'Consultation'],
                doctorsCount: 12,
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80'
              },
              {
                id: '3',
                name: 'Max Super Specialty Hospital',
                address: '789 Care Boulevard, Mumbai',
                rating: 4.9,
                services: ['Blood Tests', 'Ultrasound', 'Consultation', 'Surgery'],
                doctorsCount: 20,
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80'
              }
            ].map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => {
                  setSelectedHospital(hospital);
                  setShowHospitalModal(true);
                }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-pink-100/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{hospital.name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">{hospital.address}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        <span className="text-xs text-gray-600">{hospital.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {hospital.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-xs">
                          {service}
                        </span>
                      ))}
                      {hospital.services.length > 3 && (
                        <span className="text-xs text-gray-500">+{hospital.services.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <i className="ri-user-line"></i>
                        <span>{hospital.doctorsCount} Doctors</span>
                      </div>
                      <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-red-100/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <i className="ri-alarm-warning-line text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Emergency Consultation</h3>
              <p className="text-gray-500 text-xs mb-3">Need immediate medical attention?</p>
              <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                Call Emergency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full h-[calc(100vh-2rem)] sm:h-[90vh] flex flex-col animate-slide-up">
            {/* Chat Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20female%20doctor%20in%20white%20coat%2C%20warm%20smile%2C%20stethoscope%20around%20neck%2C%20medical%20office%20background%2C%20soft%20lighting%2C%20healthcare%20professional%20portrait%2C%20clean%20and%20trustworthy%20appearance&width=40&height=40&seq=chatdoc&orientation=squarish"
                    alt="Dr. Sarah Johnson"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Dr. Sarah Johnson</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseChatModal}
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-4 pb-20 sm:pb-24">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'doctor' && (
                      <p className="text-xs text-gray-500 mb-1 ml-3">{message.doctorName}</p>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${message.sender === 'user'
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex-shrink-0 p-3 sm:p-4 md:p-5 border-t border-gray-100 bg-white z-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 3.5rem)' }}>
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-gray-100 border-none rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-attachment-line text-sm"></i>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
                >
                  <i className="ri-send-plane-fill text-lg"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Doctor Profile Modal */}
      {showEditDoctorProfile && editableDoctorData && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Edit Doctor Profile</h2>
              <button
                onClick={() => {
                  setShowEditDoctorProfile(false);
                  setEditableDoctorData(null);
                }}
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                <div className="space-y-2">
                  {['Cardiac Consultation', 'ECG', 'Echocardiography', 'Stress Test', 'Second Opinion', 'General Consultation'].map((service) => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editableDoctorData.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditableDoctorData({
                              ...editableDoctorData,
                              services: [...editableDoctorData.services, service]
                            });
                          } else {
                            setEditableDoctorData({
                              ...editableDoctorData,
                              services: editableDoctorData.services.filter(s => s !== service)
                            });
                          }
                        }}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Freelancing Cities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Freelancing Cities</label>
                <div className="space-y-2">
                  {['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map((city) => (
                    <label key={city} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editableDoctorData.freelancingCities.includes(city)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditableDoctorData({
                              ...editableDoctorData,
                              freelancingCities: [...editableDoctorData.freelancingCities, city]
                            });
                          } else {
                            setEditableDoctorData({
                              ...editableDoctorData,
                              freelancingCities: editableDoctorData.freelancingCities.filter(c => c !== city)
                            });
                          }
                        }}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Weekly OPD Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weekly OPD Schedule</label>
                <div className="space-y-3">
                  {editableDoctorData.weeklyOPD.map((opd, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                          <select
                            value={opd.day}
                            onChange={(e) => {
                              const newOPD = [...editableDoctorData.weeklyOPD];
                              newOPD[index].day = e.target.value;
                              setEditableDoctorData({ ...editableDoctorData, weeklyOPD: newOPD });
                            }}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs"
                          >
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="text"
                            value={opd.time}
                            onChange={(e) => {
                              const newOPD = [...editableDoctorData.weeklyOPD];
                              newOPD[index].time = e.target.value;
                              setEditableDoctorData({ ...editableDoctorData, weeklyOPD: newOPD });
                            }}
                            placeholder="9:00 AM - 1:00 PM"
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={opd.location}
                            onChange={(e) => {
                              const newOPD = [...editableDoctorData.weeklyOPD];
                              newOPD[index].location = e.target.value;
                              setEditableDoctorData({ ...editableDoctorData, weeklyOPD: newOPD });
                            }}
                            placeholder="Hospital name"
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newOPD = editableDoctorData.weeklyOPD.filter((_, i) => i !== index);
                          setEditableDoctorData({ ...editableDoctorData, weeklyOPD: newOPD });
                        }}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setEditableDoctorData({
                        ...editableDoctorData,
                        weeklyOPD: [...editableDoctorData.weeklyOPD, { day: 'Monday', time: '', location: '' }]
                      });
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-pink-300 hover:text-pink-600 transition-colors"
                  >
                    <i className="ri-add-line mr-1"></i>
                    Add OPD Slot
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  // Update the selected doctor data
                  const updatedDoctor = doctors.find(d => d.id === editableDoctorData.id);
                  if (updatedDoctor) {
                    // In real app, this would update the backend
                    alert('Profile updated successfully!');
                    setSelectedDoctorData(editableDoctorData);
                  }
                  setShowEditDoctorProfile(false);
                  setEditableDoctorData(null);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedDoctorData && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate pr-2">Doctor Profile & Booking</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditableDoctorData(selectedDoctorData);
                    setShowEditDoctorProfile(true);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors flex-shrink-0"
                  title="Edit Profile"
                >
                  <i className="ri-edit-line text-blue-600 text-sm"></i>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0"
                >
                  <i className="ri-close-line text-gray-600 text-lg"></i>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 pb-32 sm:pb-36">

              {/* Doctor Profile Section */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                {/* Basic Info */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={selectedDoctorData.image}
                      alt={selectedDoctorData.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">{selectedDoctorData.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{selectedDoctorData.specialty}</p>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="text-sm font-medium text-gray-800">{selectedDoctorData.rating}</span>
                        <span className="text-xs text-gray-500">({selectedDoctorData.totalReviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line text-gray-400 text-sm"></i>
                        <span className="text-xs text-gray-600">{selectedDoctorData.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-pink-600 font-semibold text-sm">{selectedDoctorData.price} per session</p>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">{selectedDoctorData.available}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">{selectedDoctorData.successRate}</p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">{selectedDoctorData.totalReviews}</p>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">{selectedDoctorData.responseTime}</p>
                    <p className="text-xs text-gray-500">Response</p>
                  </div>
                </div>

                {/* Introduction */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">About</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedDoctorData.introduction}</p>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">Education & Training</h4>
                  <div className="space-y-2">
                    {selectedDoctorData.education.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-graduation-cap-line text-pink-600 text-sm"></i>
                        <span className="text-sm text-gray-600">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">Certifications</h4>
                  <div className="space-y-2">
                    {selectedDoctorData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-award-line text-pink-600 text-sm"></i>
                        <span className="text-sm text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctorData.languages.map((lang, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hospital Details */}
                {selectedDoctorData.hospitalName && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3 text-sm flex items-center">
                      <i className="ri-hospital-line text-pink-600 mr-2"></i>
                      Hospital & Consultation Details
                    </h4>
                    <div className="bg-white rounded-xl p-4 space-y-4 border border-gray-100 shadow-sm">
                      {/* Hospital Name & Rating */}
                      <div className="pb-3 border-b border-gray-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-base mb-1">{selectedDoctorData.hospitalName}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                <span className="text-sm text-gray-700 font-medium">{selectedDoctorData.hospitalRating || 'N/A'}</span>
                              </div>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-600">Multi-specialty Hospital</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      {selectedDoctorData.hospitalAddress && (
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="ri-map-pin-line text-pink-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Address</p>
                            <p className="text-sm text-gray-900 leading-relaxed mb-2">{selectedDoctorData.hospitalAddress}</p>
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(selectedDoctorData.hospitalAddress)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-pink-600 font-medium flex items-center hover:text-pink-700"
                            >
                              <i className="ri-navigation-line mr-1"></i>
                              Get Directions
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Contact */}
                      {selectedDoctorData.hospitalPhone && (
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="ri-phone-line text-blue-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Contact Number</p>
                            <a
                              href={`tel:${selectedDoctorData.hospitalPhone.replace(/\s/g, '')}`}
                              className="text-sm text-gray-900 font-medium hover:text-pink-600 flex items-center"
                            >
                              {selectedDoctorData.hospitalPhone}
                              <i className="ri-phone-fill ml-2 text-pink-600"></i>
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Hospital Facilities */}
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Hospital Facilities</p>
                        <div className="grid grid-cols-2 gap-2">
                          {['Emergency Services', 'ICU', 'Pharmacy', 'Lab Services', 'Ambulance', 'Parking'].map((facility, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <i className="ri-checkbox-circle-fill text-emerald-500 text-xs"></i>
                              <span className="text-xs text-gray-700">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Consultation Charges */}
                      <div className="pt-3 border-t border-gray-100 bg-pink-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-600">Consultation Fee</p>
                          <p className="text-base font-bold text-pink-600">{selectedDoctorData.price}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Follow-up Consultation</span>
                          <span className="text-gray-900 font-medium">50% off</span>
                        </div>
                      </div>

                      {/* Hospital Timings */}
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Hospital Timings</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Monday - Friday</span>
                            <span className="text-gray-900 font-medium">8:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Saturday</span>
                            <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Sunday</span>
                            <span className="text-gray-900 font-medium">Emergency Only</span>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="pt-3 border-t border-gray-100 bg-red-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <i className="ri-alarm-warning-line text-red-600"></i>
                          <p className="text-xs font-semibold text-red-900">Emergency Contact</p>
                        </div>
                        <a href="tel:108" className="text-sm font-bold text-red-700">108 / +91 22 1234 5678</a>
                        <p className="text-xs text-red-600 mt-1">Available 24/7</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services */}
                {selectedDoctorData.services && selectedDoctorData.services.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm">Services Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctorData.services.map((service, index) => (
                        <span key={index} className="bg-pink-50 px-3 py-1 rounded-full text-xs text-pink-700 border border-pink-200">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weekly OPD Schedule */}
                {selectedDoctorData.weeklyOPD && selectedDoctorData.weeklyOPD.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm">Weekly OPD Schedule</h4>
                    <div className="space-y-2">
                      {selectedDoctorData.weeklyOPD.map((opd, index) => (
                        <div key={index} className="bg-white rounded-lg p-2 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-xs text-gray-900">{opd.day}</span>
                            <span className="text-xs text-gray-600">{opd.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{opd.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Freelancing Cities */}
                {selectedDoctorData.freelancingCities && selectedDoctorData.freelancingCities.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm">Available in Cities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctorData.freelancingCities.map((city, index) => (
                        <span key={index} className="bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700 border border-blue-200">
                          <i className="ri-map-pin-line mr-1"></i>
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingForm({ ...bookingForm, consultationType: 'video' })}
                      className={`p-3 rounded-xl border transition-all duration-300 ${bookingForm.consultationType === 'video'
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <i className="ri-video-line"></i>
                        <span className="font-medium text-sm">Voice /Video Call</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingForm({ ...bookingForm, consultationType: 'chat' })}
                      className={`p-3 rounded-xl border transition-all duration-300 ${bookingForm.consultationType === 'chat'
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <i className="ri-chat-3-line"></i>
                        <span className="font-medium text-sm">Chat</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300"
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
                        onClick={() => setBookingForm({ ...bookingForm, time })}
                        className={`p-2 rounded-lg border text-xs transition-all duration-300 ${bookingForm.time === time
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-105'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-sm'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Second Opinion Option - Made More Prominent */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingForm.isSecondOpinion}
                      onChange={(e) => setBookingForm({ ...bookingForm, isSecondOpinion: e.target.checked })}
                      className="mt-1 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <i className="ri-user-star-line text-purple-600"></i>
                        <span className="text-sm font-semibold text-gray-900">Second Opinion Consultation</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">Recommended</span>
                      </div>
                      <p className="text-xs text-gray-600">Get expert second opinion on your condition from another specialist</p>
                    </div>
                  </label>
                </div>

                {/* Basic Data Section */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                      <i className="ri-file-text-line text-blue-600 mr-2"></i>
                      Basic Health Data
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowDoctorQuestions(!showDoctorQuestions)}
                      className="text-xs text-blue-600 font-medium"
                    >
                      {showDoctorQuestions ? 'Hide' : 'Show'} Details
                    </button>
                  </div>

                  {showDoctorQuestions && (
                    <div className="space-y-3 mt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Age</label>
                          <input
                            type="number"
                            value={bookingForm.basicData.age}
                            onChange={(e) => setBookingForm({
                              ...bookingForm,
                              basicData: { ...bookingForm.basicData, age: e.target.value }
                            })}
                            placeholder="Years"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                          <select
                            value={bookingForm.basicData.gender}
                            onChange={(e) => setBookingForm({
                              ...bookingForm,
                              basicData: { ...bookingForm.basicData, gender: e.target.value }
                            })}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Height (cm)</label>
                          <input
                            type="number"
                            value={bookingForm.basicData.height}
                            onChange={(e) => setBookingForm({
                              ...bookingForm,
                              basicData: { ...bookingForm.basicData, height: e.target.value }
                            })}
                            placeholder="cm"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg)</label>
                          <input
                            type="number"
                            value={bookingForm.basicData.weight}
                            onChange={(e) => setBookingForm({
                              ...bookingForm,
                              basicData: { ...bookingForm.basicData, weight: e.target.value }
                            })}
                            placeholder="kg"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Blood Pressure</label>
                        <input
                          type="text"
                          value={bookingForm.basicData.bloodPressure}
                          onChange={(e) => setBookingForm({
                            ...bookingForm,
                            basicData: { ...bookingForm.basicData, bloodPressure: e.target.value }
                          })}
                          placeholder="e.g., 120/80"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Allergies</label>
                        <input
                          type="text"
                          value={bookingForm.basicData.allergies}
                          onChange={(e) => setBookingForm({
                            ...bookingForm,
                            basicData: { ...bookingForm.basicData, allergies: e.target.value }
                          })}
                          placeholder="List any allergies"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Current Medications</label>
                        <input
                          type="text"
                          value={bookingForm.basicData.currentMedications}
                          onChange={(e) => setBookingForm({
                            ...bookingForm,
                            basicData: { ...bookingForm.basicData, currentMedications: e.target.value }
                          })}
                          placeholder="List current medications"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Symptoms or Concerns</label>
                  <textarea
                    value={bookingForm.symptoms}
                    onChange={(e) => setBookingForm({ ...bookingForm, symptoms: e.target.value })}
                    placeholder="Describe your symptoms in detail..."
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 resize-none"
                    required
                  />
                </div>

                {/* Clinical Pictures Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Clinical Pictures (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setBookingForm({
                            ...bookingForm,
                            clinicalPictures: Array.from(e.target.files)
                          });
                        }
                      }}
                      className="hidden"
                      id="clinical-pictures"
                    />
                    <label
                      htmlFor="clinical-pictures"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                      <span className="text-sm text-gray-600 mb-1">Tap to upload images</span>
                      <span className="text-xs text-gray-500">Supports JPG, PNG</span>
                    </label>
                    {bookingForm.clinicalPictures.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {bookingForm.clinicalPictures.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Clinical ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setBookingForm({
                                  ...bookingForm,
                                  clinicalPictures: bookingForm.clinicalPictures.filter((_, i) => i !== index)
                                });
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor Questions Section */}
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                      <i className="ri-question-line text-purple-600 mr-2"></i>
                      Doctor's Pre-Consultation Questions
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Answer these questions to help the doctor prepare for your consultation and reduce consultation time.
                  </p>

                  {/* Sample questions - In real app, these would come from doctor's profile */}
                  <div className="space-y-3">
                    {[
                      { question: 'How long have you been experiencing these symptoms?', answer: '' },
                      { question: 'Have you tried any medications or treatments?', answer: '' },
                      { question: 'Is there a family history of similar conditions?', answer: '' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-purple-100">
                        <p className="text-xs font-medium text-gray-900 mb-2">{item.question}</p>
                        <textarea
                          placeholder="Your answer..."
                          rows={2}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
                          onChange={(e) => {
                            const newQuestions = [...bookingForm.doctorQuestions];
                            if (!newQuestions[index]) {
                              newQuestions[index] = { question: item.question, answer: '' };
                            }
                            newQuestions[index].answer = e.target.value;
                            setBookingForm({ ...bookingForm, doctorQuestions: newQuestions });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Health Records Option */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingForm.shareHealthRecords}
                      onChange={(e) => setBookingForm({ ...bookingForm, shareHealthRecords: e.target.checked })}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <i className="ri-file-shield-line text-blue-600"></i>
                        <span className="text-sm font-semibold text-gray-900">Share Health Records with Doctor</span>
                      </div>
                      <p className="text-xs text-gray-600">Allow the doctor to access your uploaded health records, images, and PDFs for better consultation. You can choose what to share.</p>
                    </div>
                  </label>
                </div>

                {/* Prescription Request Option */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <i className="ri-file-prescription-line text-emerald-600"></i>
                        <span className="text-sm font-semibold text-gray-900">Request Prescription</span>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">₹50 min</span>
                      </div>
                      <p className="text-xs text-gray-600">Request a prescription from the doctor with minimum charge. Doctor can add suggestions.</p>
                    </div>
                  </label>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Additional Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="Any additional information..."
                    rows={2}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 pb-20 sm:pb-24">
                  <button
                    type="submit"
                    disabled={!bookingForm.date || !bookingForm.time || !bookingForm.symptoms}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
                  >
                    Confirm Booking - {selectedDoctorData.price}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Details Modal */}
      {showHospitalModal && selectedHospital && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate pr-2">{selectedHospital.name}</h2>
              <button
                onClick={() => {
                  setShowHospitalModal(false);
                  setSelectedHospital(null);
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600 text-lg"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 pb-32 sm:pb-36">
              <div className="mb-4">
                <img
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center space-x-2 mb-2">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="font-semibold text-gray-800">{selectedHospital.rating}</span>
                  <span className="text-gray-500 text-sm">• {selectedHospital.address}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Available Services</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedHospital.services.map((service: string, idx: number) => (
                    <div key={idx} className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <i className="ri-checkbox-circle-fill text-pink-600"></i>
                        <span className="text-sm text-gray-800">{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Available Doctors ({selectedHospital.doctorsCount})</h3>
                <div className="space-y-3">
                  {doctors.slice(0, 3).map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => {
                        setSelectedDoctorData(doctor);
                        setShowHospitalModal(false);
                        setShowBookingModal(true);
                      }}
                      className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/40">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{doctor.name}</p>
                        <p className="text-xs text-gray-600">{doctor.specialty}</p>
                      </div>
                      <button className="text-pink-600 text-sm font-medium">Book</button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowHospitalModal(false);
                  setSelectedHospital(null);
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Onboarding Modal */}
      {showHospitalOnboarding && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate pr-2">Onboard Hospital</h2>
              <button
                onClick={() => {
                  setShowHospitalOnboarding(false);
                  setHospitalForm({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    rating: 0,
                    image: null,
                    services: [],
                    doctors: []
                  });
                  setNewService('');
                  setNewDoctor({
                    name: '',
                    specialty: '',
                    experience: '',
                    price: '',
                    available: true
                  });
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600 text-lg"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 pb-32 sm:pb-36">
              <div className="space-y-5">
                {/* Hospital Basic Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Hospital Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name *</label>
                      <input
                        type="text"
                        value={hospitalForm.name}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, name: e.target.value })}
                        placeholder="Enter hospital name"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <textarea
                        value={hospitalForm.address}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, address: e.target.value })}
                        placeholder="Enter full address"
                        rows={3}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={hospitalForm.phone}
                          onChange={(e) => setHospitalForm({ ...hospitalForm, phone: e.target.value })}
                          placeholder="+91 1234567890"
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={hospitalForm.email}
                          onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                          placeholder="hospital@example.com"
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Image</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setHospitalForm({ ...hospitalForm, image: e.target.files[0] });
                            }
                          }}
                          className="hidden"
                          id="hospital-image"
                        />
                        <label
                          htmlFor="hospital-image"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                          <span className="text-sm text-gray-600 mb-1">Tap to upload hospital image</span>
                          <span className="text-xs text-gray-500">Supports JPG, PNG</span>
                        </label>
                        {hospitalForm.image && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-700">
                              <i className="ri-file-check-line text-green-600 mr-1"></i>
                              {hospitalForm.image.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Services Provided</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="Add service (e.g., Blood Tests, X-Ray)"
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newService.trim()) {
                            setHospitalForm({
                              ...hospitalForm,
                              services: [...hospitalForm.services, newService.trim()]
                            });
                            setNewService('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (newService.trim()) {
                            setHospitalForm({
                              ...hospitalForm,
                              services: [...hospitalForm.services, newService.trim()]
                            });
                            setNewService('');
                          }
                        }}
                        className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    {hospitalForm.services.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {hospitalForm.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs flex items-center space-x-2"
                          >
                            <span>{service}</span>
                            <button
                              onClick={() => {
                                setHospitalForm({
                                  ...hospitalForm,
                                  services: hospitalForm.services.filter((_, i) => i !== idx)
                                });
                              }}
                              className="hover:text-pink-900"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctors Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Associated Doctors</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Doctor Name *</label>
                          <input
                            type="text"
                            value={newDoctor.name}
                            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                            placeholder="Dr. Name"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Specialty *</label>
                          <input
                            type="text"
                            value={newDoctor.specialty}
                            onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                            placeholder="Cardiology, etc."
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
                          <input
                            type="text"
                            value={newDoctor.experience}
                            onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                            placeholder="e.g., 10 years"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Consultation Price</label>
                          <input
                            type="text"
                            value={newDoctor.price}
                            onChange={(e) => setNewDoctor({ ...newDoctor, price: e.target.value })}
                            placeholder="₹500"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (newDoctor.name.trim() && newDoctor.specialty.trim()) {
                            setHospitalForm({
                              ...hospitalForm,
                              doctors: [...hospitalForm.doctors, { ...newDoctor }]
                            });
                            setNewDoctor({
                              name: '',
                              specialty: '',
                              experience: '',
                              price: '',
                              available: true
                            });
                          }
                        }}
                        className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors"
                      >
                        <i className="ri-add-line mr-1"></i>
                        Add Doctor
                      </button>
                    </div>

                    {hospitalForm.doctors.length > 0 && (
                      <div className="space-y-2">
                        {hospitalForm.doctors.map((doctor, idx) => (
                          <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{doctor.name}</p>
                              <p className="text-xs text-gray-600">{doctor.specialty}</p>
                              {doctor.experience && (
                                <p className="text-xs text-gray-500">{doctor.experience}</p>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setHospitalForm({
                                  ...hospitalForm,
                                  doctors: hospitalForm.doctors.filter((_, i) => i !== idx)
                                });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      if (!hospitalForm.name || !hospitalForm.address || !hospitalForm.phone || !hospitalForm.email) {
                        alert('Please fill in all required fields');
                        return;
                      }
                      alert('Hospital onboarded successfully!');
                      setShowHospitalOnboarding(false);
                      setHospitalForm({
                        name: '',
                        address: '',
                        phone: '',
                        email: '',
                        rating: 0,
                        image: null,
                        services: [],
                        doctors: []
                      });
                      setNewService('');
                      setNewDoctor({
                        name: '',
                        specialty: '',
                        experience: '',
                        price: '',
                        available: true
                      });
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    Submit Hospital Onboarding
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
