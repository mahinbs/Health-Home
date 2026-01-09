import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
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
    gender: 'Female'
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation title="Profile" />
      
      <div className="pt-24 pb-24">
        {/* Profile Header */}
        <div className="px-4 pb-6">
          <Card className="p-6 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border-pink-200/50">
            <div className="relative inline-block mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=Young%20Indian%20woman%20smiling%2C%20professional%20headshot%2C%20warm%20expression%2C%20casual%20clothing%2C%20clean%20background%2C%20portrait%20photography%20style%2C%20friendly%20and%20approachable%20appearance&width=120&height=120&seq=profile1&orientation=squarish"
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <i className="ri-check-line text-white text-xs"></i>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Riya Sharma</h2>
            <p className="text-gray-600 mb-2">riya.sharma@email.com</p>
            <p className="text-sm text-gray-500">+91 98765 43210</p>
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

        {/* Profile Options */}
        <div className="px-4 space-y-3">
          {profileOptions.map((option, index) => (
            <Card 
              key={option.id} 
              className="p-4 hover:border-pink-200 cursor-pointer animate-scale-in" 
              onClick={() => {
                const routes: Record<string, string> = {
                  'consultations': '/my-consultations',
                  'homecare': '/my-homecare-requests',
                  'rewards': '/my-rewards',
                  'health-locker': '/records',
                  'payment-history': '/payment-history',
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

              <Button
                onClick={() => {
                  alert('Profile updated successfully!');
                  setShowEditProfile(false);
                }}
                className="w-full"
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
