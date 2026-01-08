import { useState } from 'react';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
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
    notes: ''
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
      responseTime: '< 5 minutes'
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
      responseTime: '< 10 minutes'
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
      responseTime: '< 3 minutes'
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
      responseTime: '< 15 minutes'
    }
  ];

  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase())
    : doctors;

  const handleBookConsultation = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctorData(doctor);
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
      notes: ''
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
      <TopNavigation 
        title="Consult Doctor" 
        showBack={false}
      />
      
      <div className="pt-20 sm:pt-24 pb-20 sm:pb-24 px-4">
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
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
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
                          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
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
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  selectedSpecialty === specialty.name
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
              <div key={doctor.id} className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-pink-100/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
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
                        onClick={() => handleBookConsultation(doctor.id)}
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
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full h-[90vh] flex flex-col pb-24 animate-slide-up">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
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
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
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
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
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
            <div className="p-5 border-t border-gray-100">
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

      {/* Booking Modal */}
      {showBookingModal && selectedDoctorData && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto pb-24 animate-slide-up">
            <div className="p-5">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Doctor Profile & Booking</h2>
                <button
                  onClick={handleCloseModal}
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

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
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctorData.languages.map((lang, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingForm({...bookingForm, consultationType: 'video'})}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        bookingForm.consultationType === 'video'
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
                      onClick={() => setBookingForm({...bookingForm, consultationType: 'chat'})}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        bookingForm.consultationType === 'chat'
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
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
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
                        onClick={() => setBookingForm({...bookingForm, time})}
                        className={`p-2 rounded-lg border text-xs transition-all duration-300 ${
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

                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Symptoms or Concerns</label>
                  <textarea
                    value={bookingForm.symptoms}
                    onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                    placeholder="Describe your symptoms..."
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 resize-none"
                    required
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Additional Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    placeholder="Any additional information..."
                    rows={2}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
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

      <BottomNavigation />
    </div>
  );
}
