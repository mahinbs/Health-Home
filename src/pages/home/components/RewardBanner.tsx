
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function RewardBanner() {
  return (
    <div className="px-4">
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-5 shadow-md border border-emerald-100/60 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <i className="ri-gift-fill text-white text-lg"></i>
              </div>
              <h3 className="text-gray-800 font-bold text-base leading-tight">
                Complete 10,000 steps daily — earn ₦150 cashback!
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4 ml-[52px]">
              Hit the daily goal to unlock rewards and cashback automatically.
            </p>
            <div className="ml-[52px]">
              <Button 
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md"
              >
                View Rewards
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
