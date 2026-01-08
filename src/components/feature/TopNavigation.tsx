
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface TopNavigationProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
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
      className="w-11 h-11 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-200/50 relative"
    >
      <i className="ri-shopping-cart-line text-pink-600 text-lg"></i>
      {cartCount > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">{cartCount > 9 ? '9+' : cartCount}</span>
        </div>
      )}
    </button>
  );
}

export default function TopNavigation({ title, showBack = false, onBack, rightAction, showCart = true }: TopNavigationProps) {
  return (
    <div className="fixed top-[-15px] left-0 right-0 bg-white/90 backdrop-blur-md border-b border-pink-200/50 px-4 sm:px-6 py-3 sm:py-4 z-50 shadow-lg">
      <div className="flex items-center justify-between h-12 sm:h-14">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button 
              onClick={onBack} 
              className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-200/50"
            >
              <i className="ri-arrow-left-line text-xl text-pink-600"></i>
            </button>
          )}
          {title && (
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl shadow-md flex items-center justify-center p-2 border border-pink-200/50">
                <img 
                  src="https://static.readdy.ai/image/19a52a0e7cd11d182286c46a940c9855/db67221c92c7b4d8a5d37a7873047074.jpeg" 
                  alt="Health@Home Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: '"Pacifico", serif' }}>
                  {title}
                </h1>
                <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {showCart && <CartIcon />}
          {rightAction && (
            <div className="flex items-center">
              {rightAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
