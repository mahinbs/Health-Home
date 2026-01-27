import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Profile() {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Riya Sharma',
    email: 'riya.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123 Health Street, Mumbai, India',
    dateOfBirth: '1995-05-15',
    gender: 'Female',
    height: 165, // cm
    weight: 65.2, // kg
    bmi: 24.8,
    lifestyle: 'active', // sedentary or active
    dailyActivities: ['Walking', 'Yoga', 'Meditation'],
    healthIssues: ['Vitamin D Deficiency', 'Mild Anemia'],
    googleLinked: true
  });

  const [healthRecords, setHealthRecords] = useState([
    {
      id: '1',
      type: 'Lab Report',
      name: 'Vitamin D Test',
      date: '2024-01-15',
      result: 'Deficient',
      value: '15 ng/mL',
      recommendation: 'Requires Vitamin D supplements and diet rich in Vitamin D',
      fileUrl: null,
      fileType: null
    },
    {
      id: '2',
      type: 'Lab Report',
      name: 'Complete Blood Count',
      date: '2024-01-15',
      result: 'Mild Anemia',
      value: 'Hemoglobin: 11.2 g/dL',
      recommendation: 'Iron supplements and iron-rich diet recommended',
      fileUrl: null,
      fileType: null
    }
  ]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [suggestedDoctors, setSuggestedDoctors] = useState<any[]>([]);
  const [newHealthRecord, setNewHealthRecord] = useState({
    name: '',
    date: '',
    type: 'text' as 'text' | 'file',
    textContent: '',
    file: null as File | null,
    fileUrl: null as string | null,
    fileType: null as 'pdf' | 'image' | null
  });
  const profileOptions = [
    {
      id: 'consultations',
      title: 'My Consultations',
      icon: 'ri-video-line',
      description: 'View past and upcoming appointments'
    },
    {
      id: 'homecare',
      title: 'My Homecare Requests',
      icon: 'ri-heart-pulse-line',
      description: 'Track your home care services'
    },
    {
      id: 'rewards',
      title: 'My Rewards',
      icon: 'ri-gift-line',
      description: 'Health credits and achievements'
    },
    {
      id: 'health-locker',
      title: 'My Health Locker',
      icon: 'ri-file-text-line',
      description: 'Prescriptions, reports, and records'
    },
    {
      id: 'payment-history',
      title: 'Payment History',
      icon: 'ri-wallet-line',
      description: 'View all transactions'
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      icon: 'ri-customer-service-line',
      description: 'Get assistance and FAQs'
    },
    {
      id: 'connections',
      title: 'Professional Connections',
      icon: 'ri-team-line',
      description: 'Connect with healthcare professionals'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Profile" />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-24">
        {/* Profile Header */}
        <div className="px-4 pb-6">
          <Card className="p-6 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border-pink-200/50">
            <div className="relative inline-block mb-4">
              <img
                src={profileImage || "https://readdy.ai/api/search-image?query=Young%20Indian%20woman%20smiling%2C%20professional%20headshot%2C%20warm%20expression%2C%20casual%20clothing%2C%20clean%20background%2C%20portrait%20photography%20style%2C%20friendly%20and%20approachable%20appearance&width=120&height=120&seq=profile1&orientation=squarish"}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e: any) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setProfileImage(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-2 border-white shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                title="Change Profile Picture"
              >
                <i className="ri-camera-line text-white text-xs"></i>
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Riya Sharma</h2>
            <p className="text-gray-600 mb-2">riya.sharma@email.com</p>
            <p className="text-sm text-gray-500">+91 98765 43210</p>
            {profileData.googleLinked && (
              <div className="flex items-center justify-center mt-2">
                <i className="ri-google-fill text-blue-500 mr-1"></i>
                <span className="text-xs text-gray-600">Linked with Google</span>
              </div>
            )}
            <Button 
              className="mt-4" 
              size="sm" 
              variant="outline"
              onClick={() => setShowEditProfile(true)}
            >
              Edit Profile
            </Button>
          </Card>
        </div>

        {/* Health Metrics Summary */}
        <div className="px-4 pb-6">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Health Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">BMI</p>
                <p className="text-lg font-bold text-gray-900">{profileData.bmi}</p>
                <p className="text-xs text-emerald-600">Normal</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Lifestyle</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{profileData.lifestyle}</p>
                <p className="text-xs text-pink-600">
                  {profileData.dailyActivities.length} activities
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-2">Daily Activities</p>
              <div className="flex flex-wrap gap-2">
                {profileData.dailyActivities.map((activity, index) => (
                  <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Health Issues */}
        <div className="px-4 pb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Health Issues</h3>
              <button className="text-pink-600 text-xs font-medium">Add Issue</button>
            </div>
            {profileData.healthIssues.length > 0 ? (
              <div className="space-y-2">
                {profileData.healthIssues.map((issue, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{issue}</p>
                        {healthRecords.find(r => r.name.includes(issue.split(' ')[0])) && (
                          <p className="text-xs text-gray-600 mt-1">
                            <i className="ri-file-text-line mr-1"></i>
                            Report available
                          </p>
                        )}
                      </div>
                      <button className="text-red-600 text-xs">
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No health issues recorded</p>
            )}
          </Card>
        </div>

        {/* Connected Health Records */}
        <div className="px-4 pb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Health Records</h3>
              <button
                onClick={() => setShowEditProfile(true)}
                className="text-pink-600 text-xs font-medium flex items-center"
              >
                <i className="ri-edit-line mr-1"></i>
                Add Record
              </button>
            </div>
            <div className="space-y-3">
              {healthRecords.map((record) => (
                <div key={record.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{record.name}</p>
                      <p className="text-xs text-gray-600">{record.date}</p>
                    </div>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      {record.result}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">Value: {record.value}</p>
                  {record.fileUrl && (
                    <div className="mb-2">
                      <a
                        href={record.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <i className="ri-file-pdf-line mr-1"></i>
                        View {record.fileType === 'pdf' ? 'PDF' : 'Image'}
                      </a>
                    </div>
                  )}
                  <div className="bg-white rounded p-2 mt-2">
                    <p className="text-xs font-medium text-gray-900 mb-1">Recommendation:</p>
                    <p className="text-xs text-gray-700">{record.recommendation}</p>
                  </div>
                  {suggestedDoctors.length > 0 && record.id === '1' && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs font-medium text-gray-900 mb-2">Suggested Doctors:</p>
                      <div className="space-y-2">
                        {suggestedDoctors.map((doctor, idx) => (
                          <div key={idx} className="bg-white rounded p-2 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium text-gray-900">{doctor.name}</p>
                              <p className="text-xs text-gray-600">{doctor.specialty}</p>
                            </div>
                            <button
                              onClick={() => navigate('/consult')}
                              className="text-xs text-pink-600 font-medium"
                            >
                              Consult
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Profile Options */}
        <div className="px-4 space-y-3">
          {profileOptions.filter(opt => opt.id !== 'connections').map((option, index) => (
            <Card 
              key={option.id} 
              className="p-4 hover:border-pink-200 cursor-pointer animate-scale-in" 
              onClick={() => {
                if (option.id === 'connections') {
                  // Show connections feature in modal or separate view
                  return;
                }
                const routes: Record<string, string> = {
                  'consultations': '/my-consultations',
                  'homecare': '/my-homecare-requests',
                  'rewards': '/my-rewards',
                  'health-locker': '/records',
                  'payment-history': '/payment',
                  'help-support': '/help-support'
                };
                navigate(routes[option.id] || '/profile');
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-md">
                  <i className={`${option.icon} text-xl text-pink-600`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-pink-400"></i>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <div className="px-4 mt-8">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
            onClick={() => console.log('Logout')}
          >
            <i className="ri-logout-box-line mr-2"></i>
            Logout
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Edit Profile</h2>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={profileData.gender}
                  onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={profileData.height}
                    onChange={(e) => {
                      const height = parseFloat(e.target.value);
                      const weight = profileData.weight;
                      const bmi = weight / ((height / 100) ** 2);
                      setProfileData({...profileData, height, bmi: parseFloat(bmi.toFixed(1))});
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={profileData.weight}
                    onChange={(e) => {
                      const weight = parseFloat(e.target.value);
                      const height = profileData.height;
                      const bmi = weight / ((height / 100) ** 2);
                      setProfileData({...profileData, weight, bmi: parseFloat(bmi.toFixed(1))});
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BMI: {profileData.bmi}</label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      profileData.bmi < 18.5 ? 'bg-blue-500' :
                      profileData.bmi < 25 ? 'bg-green-500' :
                      profileData.bmi < 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((profileData.bmi / 40) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileData({...profileData, lifestyle: 'sedentary'})}
                    className={`p-3 rounded-xl border ${
                      profileData.lifestyle === 'sedentary'
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    Sedentary
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileData({...profileData, lifestyle: 'active'})}
                    className={`p-3 rounded-xl border ${
                      profileData.lifestyle === 'active'
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    Active
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Activities</label>
                <div className="space-y-2">
                  {['Walking', 'Running', 'Yoga', 'Gym', 'Swimming', 'Cycling', 'Meditation'].map((activity) => (
                    <label key={activity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profileData.dailyActivities.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData({
                              ...profileData,
                              dailyActivities: [...profileData.dailyActivities, activity]
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              dailyActivities: profileData.dailyActivities.filter(a => a !== activity)
                            });
                          }
                        }}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link Google Account</label>
                <button
                  type="button"
                  onClick={() => setProfileData({...profileData, googleLinked: !profileData.googleLinked})}
                  className={`w-full p-3 rounded-xl border ${
                    profileData.googleLinked
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <i className="ri-google-fill mr-2"></i>
                  {profileData.googleLinked ? 'Linked with Google' : 'Link Google Account'}
                </button>
              </div>

              {/* Health Records Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Health Records</h3>
                
                {/* Record Type Selection */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Record Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewHealthRecord({...newHealthRecord, type: 'text'})}
                      className={`p-2 rounded-lg border text-xs ${
                        newHealthRecord.type === 'text'
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <i className="ri-file-text-line mr-1"></i>
                      Text Entry
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewHealthRecord({...newHealthRecord, type: 'file'})}
                      className={`p-2 rounded-lg border text-xs ${
                        newHealthRecord.type === 'file'
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <i className="ri-file-upload-line mr-1"></i>
                      Upload File
                    </button>
                  </div>
                </div>

                {/* Text Entry Option */}
                {newHealthRecord.type === 'text' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Record Name *</label>
                      <input
                        type="text"
                        value={newHealthRecord.name}
                        onChange={(e) => setNewHealthRecord({...newHealthRecord, name: e.target.value})}
                        placeholder="e.g., Blood Test Report"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Record Date *</label>
                      <input
                        type="date"
                        value={newHealthRecord.date}
                        onChange={(e) => setNewHealthRecord({...newHealthRecord, date: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Record Details *</label>
                      <textarea
                        value={newHealthRecord.textContent}
                        onChange={(e) => setNewHealthRecord({...newHealthRecord, textContent: e.target.value})}
                        placeholder="Enter test results, symptoms, diagnosis, or any health-related information..."
                        rows={5}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newHealthRecord.name || !newHealthRecord.date || !newHealthRecord.textContent.trim()) {
                          alert('Please fill in all required fields');
                          return;
                        }
                        
                        // Analyze text content for medical issues
                        const textLower = newHealthRecord.textContent.toLowerCase();
                        let detectedIssues: string[] = [];
                        let suggestedDocs: any[] = [];

                        if (textLower.includes('cardiac') || textLower.includes('heart') || textLower.includes('chest pain')) {
                          detectedIssues.push('Cardiac Issues');
                          suggestedDocs.push({ name: 'Dr. Sarah Johnson', specialty: 'Cardiology', id: '1' });
                        }
                        if (textLower.includes('diabetes') || textLower.includes('sugar') || textLower.includes('glucose')) {
                          detectedIssues.push('Diabetes');
                          suggestedDocs.push({ name: 'Dr. Michael Chen', specialty: 'Endocrinology', id: '2' });
                        }
                        if (textLower.includes('anemia') || textLower.includes('hemoglobin') || textLower.includes('iron')) {
                          detectedIssues.push('Anemia');
                          suggestedDocs.push({ name: 'Dr. Emily Rodriguez', specialty: 'Hematology', id: '3' });
                        }
                        if (textLower.includes('vitamin d') || textLower.includes('vitamin deficiency')) {
                          detectedIssues.push('Vitamin D Deficiency');
                          suggestedDocs.push({ name: 'Dr. James Wilson', specialty: 'Internal Medicine', id: '4' });
                        }
                        if (textLower.includes('blood pressure') || textLower.includes('hypertension') || textLower.includes('bp')) {
                          detectedIssues.push('Hypertension');
                          suggestedDocs.push({ name: 'Dr. Sarah Johnson', specialty: 'Cardiology', id: '1' });
                        }

                        // Add detected issues to health issues if not already present
                        detectedIssues.forEach(issue => {
                          if (!profileData.healthIssues.includes(issue)) {
                            setProfileData({
                              ...profileData,
                              healthIssues: [...profileData.healthIssues, issue]
                            });
                          }
                        });

                        // Create new health record
                        const newRecord = {
                          id: Date.now().toString(),
                          type: 'Text Report',
                          name: newHealthRecord.name,
                          date: newHealthRecord.date,
                          result: detectedIssues.length > 0 ? detectedIssues[0] : 'Normal',
                          value: newHealthRecord.textContent.substring(0, 100) + '...',
                          recommendation: detectedIssues.length > 0 
                            ? `Based on your record, we recommend consulting with a ${suggestedDocs[0]?.specialty || 'specialist'}`
                            : 'No immediate concerns detected',
                          fileUrl: null,
                          fileType: null
                        };

                        setHealthRecords([...healthRecords, newRecord]);
                        
                        if (suggestedDocs.length > 0) {
                          setSuggestedDoctors(suggestedDocs);
                        }

                        // Reset form
                        setNewHealthRecord({
                          name: '',
                          date: '',
                          type: 'text',
                          textContent: '',
                          file: null,
                          fileUrl: null,
                          fileType: null
                        });

                        alert('Health record added successfully!');
                      }}
                      className="w-full py-2 bg-pink-500 text-white rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors"
                    >
                      <i className="ri-save-line mr-1"></i>
                      Save Health Record
                    </button>
                  </div>
                )}

                {/* File Upload Option */}
                {newHealthRecord.type === 'file' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Record Name *</label>
                      <input
                        type="text"
                        value={newHealthRecord.name}
                        onChange={(e) => setNewHealthRecord({...newHealthRecord, name: e.target.value})}
                        placeholder="e.g., Blood Test Report"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Record Date *</label>
                      <input
                        type="date"
                        value={newHealthRecord.date}
                        onChange={(e) => setNewHealthRecord({...newHealthRecord, date: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Upload File (Image or PDF) *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNewHealthRecord({...newHealthRecord, file});
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const fileUrl = event.target?.result as string;
                                setNewHealthRecord({
                                  ...newHealthRecord,
                                  file,
                                  fileUrl,
                                  fileType: file.type.includes('pdf') ? 'pdf' : 'image'
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="health-record-upload"
                        />
                        <label
                          htmlFor="health-record-upload"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <i className="ri-file-upload-line text-4xl text-gray-400 mb-2"></i>
                          <span className="text-sm text-gray-600 mb-1">Tap to upload</span>
                          <span className="text-xs text-gray-500">Supports JPG, PNG, PDF</span>
                        </label>
                        {newHealthRecord.file && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-700">
                              <i className="ri-file-check-line text-green-600 mr-1"></i>
                              {newHealthRecord.file.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newHealthRecord.name || !newHealthRecord.date || !newHealthRecord.file) {
                          alert('Please fill in all required fields and upload a file');
                          return;
                        }

                        // Analyze filename and suggest doctors
                        const fileNameLower = newHealthRecord.file.name.toLowerCase();
                        let suggestedDocs: any[] = [];

                        if (fileNameLower.includes('cardiac') || fileNameLower.includes('ecg') || fileNameLower.includes('heart')) {
                          suggestedDocs.push({ name: 'Dr. Sarah Johnson', specialty: 'Cardiology', id: '1' });
                        }
                        if (fileNameLower.includes('blood') || fileNameLower.includes('cbc') || fileNameLower.includes('hemoglobin')) {
                          suggestedDocs.push({ name: 'Dr. Emily Rodriguez', specialty: 'Hematology', id: '3' });
                        }
                        if (fileNameLower.includes('xray') || fileNameLower.includes('scan') || fileNameLower.includes('mri')) {
                          suggestedDocs.push({ name: 'Dr. James Wilson', specialty: 'Radiology', id: '4' });
                        }
                        if (fileNameLower.includes('diabetes') || fileNameLower.includes('sugar') || fileNameLower.includes('glucose')) {
                          suggestedDocs.push({ name: 'Dr. Michael Chen', specialty: 'Endocrinology', id: '2' });
                        }

                        // If no specific match, suggest general practitioners
                        if (suggestedDocs.length === 0) {
                          suggestedDocs.push({ name: 'Dr. Sarah Johnson', specialty: 'General Medicine', id: '1' });
                        }

                        const newRecord = {
                          id: Date.now().toString(),
                          type: newHealthRecord.fileType === 'pdf' ? 'PDF Report' : 'Image Report',
                          name: newHealthRecord.name,
                          date: newHealthRecord.date,
                          result: 'Pending Review',
                          value: '',
                          recommendation: suggestedDocs.length > 0 
                            ? `Based on your report, we recommend consulting with ${suggestedDocs[0].specialty}`
                            : 'Please consult with a healthcare professional',
                          fileUrl: newHealthRecord.fileUrl,
                          fileType: newHealthRecord.fileType
                        };

                        setHealthRecords([...healthRecords, newRecord]);
                        setSuggestedDoctors(suggestedDocs);

                        // Reset form
                        setNewHealthRecord({
                          name: '',
                          date: '',
                          type: 'file',
                          textContent: '',
                          file: null,
                          fileUrl: null,
                          fileType: null
                        });

                        alert('Health record uploaded successfully!');
                      }}
                      className="w-full py-2 bg-pink-500 text-white rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors"
                    >
                      <i className="ri-upload-cloud-line mr-1"></i>
                      Upload Health Record
                    </button>
                  </div>
                )}

                {/* Show Suggested Doctors */}
                {suggestedDoctors.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                      <i className="ri-user-star-line text-pink-600 mr-1"></i>
                      Recommended Doctors
                    </h4>
                    <div className="space-y-2">
                      {suggestedDoctors.map((doctor, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 flex items-center justify-between border border-pink-200">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{doctor.name}</p>
                            <p className="text-xs text-gray-600">{doctor.specialty}</p>
                          </div>
                          <button
                            onClick={() => navigate('/consult')}
                            className="px-3 py-1.5 bg-pink-500 text-white rounded-lg text-xs font-semibold hover:bg-pink-600 transition-colors"
                          >
                            Consult
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  alert('Profile updated successfully!');
                  setShowEditProfile(false);
                }}
                className="w-full mt-4"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
