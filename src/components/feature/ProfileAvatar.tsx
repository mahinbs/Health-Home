import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileAvatar() {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Profile data - in a real app, this would come from context/state
  const userName = 'Riya Sharma';
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const avatarImageUrl = "https://readdy.ai/api/search-image?query=Young%20Indian%20woman%20smiling%2C%20professional%20headshot%2C%20warm%20expression%2C%20casual%20clothing%2C%20clean%20background%2C%20portrait%20photography%20style%2C%20friendly%20and%20approachable%20appearance&width=120&height=120&seq=profile1&orientation=squarish";

  return (
    <button
      onClick={() => navigate('/profile')}
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-gradient-to-br from-pink-200 to-rose-200 border-2 border-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 relative flex-shrink-0 animate-pulse-subtle"
    >
      {!imageError ? (
        <img
          src={avatarImageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-rose-400">
          <span className="text-white text-xs sm:text-sm font-bold">{userInitials}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-ping"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
    </button>
  );
}

