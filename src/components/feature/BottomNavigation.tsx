import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: 'ri-home-5-fill', label: 'Home' },
    { path: '/consult', icon: 'ri-stethoscope-fill', label: 'Consult' },
    { path: '/homecare', icon: 'ri-nurse-fill', label: 'Homecare' },
    { path: '/pharmacy', icon: 'ri-medicine-bottle-fill', label: 'Pharmacy' },
    { path: '/profile', icon: 'ri-user-fill', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-200/50 shadow-2xl z-50">
      <div className="grid grid-cols-5 h-14 sm:h-16 px-0">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center transition-all duration-300 relative ${
                isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-b-full"></div>
              )}
              <i className={`${item.icon} text-lg sm:text-xl mb-0.5 sm:mb-1 ${isActive ? 'scale-110' : ''} transition-transform duration-300`}></i>
              <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'text-pink-600' : 'text-gray-500'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
