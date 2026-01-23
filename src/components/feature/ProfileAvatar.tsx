import { useNavigate } from 'react-router-dom';

export default function ProfileAvatar() {
  const navigate = useNavigate();
  
  // Profile data - in a real app, this would come from context/state
  const userName = 'Riya Sharma';
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      onClick={() => navigate('/profile')}
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-gradient-to-br from-pink-200 to-rose-200 border-2 border-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 relative flex-shrink-0 animate-pulse-subtle flex items-center justify-center"
    >
      <i className="ri-user-3-fill text-pink-600 text-base sm:text-lg md:text-xl"></i>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-ping"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
    </button>
  );
}

