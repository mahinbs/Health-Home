
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import ProfileAvatar from './ProfileAvatar';

interface TopNavigationProps {
  title?: string;
  rightAction?: React.ReactNode;
  showCart?: boolean;
}

function CartIcon() {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-200/50 relative flex-shrink-0"
    >
      <i className="ri-shopping-cart-line text-pink-600 text-base sm:text-lg"></i>
      {cartCount > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-[10px] sm:text-xs font-bold">{cartCount > 9 ? '9+' : cartCount}</span>
        </div>
      )}
    </button>
  );
}

export default function TopNavigation({ title, rightAction, showCart = true }: TopNavigationProps) {
  return (
    <div className="fixed top-[40px] left-0 right-0 bg-white/90 backdrop-blur-md border-b border-pink-200/50 px-3 sm:px-4 md:px-6 z-50 shadow-lg h-[64px] sm:h-[72px] flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          {title && (
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl shadow-md flex items-center justify-center p-1.5 sm:p-2 border border-pink-200/50 flex-shrink-0">
                <img 
                  src="https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/db67221c92c7b4d8a5d37a7873047074.jpeg" 
                  alt="Health@Home Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate" style={{ fontFamily: '"Pacifico", serif' }}>
                  {title}
                </h1>
                <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"></div>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Cart, Actions, Profile */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          {showCart && <CartIcon />}
          {rightAction && (
            <div className="flex items-center">
              {rightAction}
            </div>
          )}
          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
}
