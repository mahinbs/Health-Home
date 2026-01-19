
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderTotal, itemsCount } = location.state || { orderTotal: 0, itemsCount: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Payment Success" showCart={true} />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-24 px-4 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="p-8 text-center max-w-md w-full animate-scale-in">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-subtle">
            <i className="ri-check-line text-5xl text-white"></i>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your order has been placed successfully</p>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 mb-6 border border-pink-200/50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items Ordered</span>
                <span className="font-semibold text-gray-900">{itemsCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-pink-200">
                <p className="text-xs text-gray-500">
                  <i className="ri-truck-line mr-1"></i>
                  Your order will be delivered within 2-3 business days
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/pharmacy')} className="w-full">
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}

