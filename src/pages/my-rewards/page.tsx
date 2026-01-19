
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import ScratchCard from '../../components/feature/ScratchCard';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  color: string;
  bgColor: string;
  date?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

interface ScratchCardReward {
  id: string;
  amount: number;
  type: 'wallet' | 'discount' | 'benefit';
  message: string;
  date: string;
  status: 'available' | 'used' | 'expired';
  distance: number; // km completed
}

export default function MyRewards() {
  const navigate = useNavigate();
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [selectedScratchCard, setSelectedScratchCard] = useState<ScratchCardReward | null>(null);
  const [scratchCards, setScratchCards] = useState<ScratchCardReward[]>([
    {
      id: '1',
      amount: 50,
      type: 'wallet',
      message: 'Added to your wallet!',
      date: '2024-01-21',
      status: 'available',
      distance: 1.0
    },
    {
      id: '2',
      amount: 100,
      type: 'wallet',
      message: 'Great job! Keep walking!',
      date: '2024-01-20',
      status: 'used',
      distance: 2.0
    },
    {
      id: '3',
      amount: 25,
      type: 'discount',
      message: '20% off on next consultation!',
      date: '2024-01-19',
      status: 'expired',
      distance: 1.5
    }
  ]);
  const totalPoints = 2450;
  const healthCredits = 125.50;
  const walkedDistance = 1.2; // km

  const handleScratchCardClick = (card: ScratchCardReward) => {
    if (card.status === 'available') {
      setSelectedScratchCard(card);
      setShowScratchCard(true);
    }
  };

  const handleScratchCardClose = () => {
    setShowScratchCard(false);
    if (selectedScratchCard) {
      // Mark as used after closing
      setScratchCards(prev => prev.map(card => 
        card.id === selectedScratchCard.id 
          ? { ...card, status: 'used' as const }
          : card
      ));
    }
    setSelectedScratchCard(null);
  };

  const recentRewards: Reward[] = [
    {
      id: '1',
      title: 'Daily Steps Goal',
      description: 'Completed 10,000 steps',
      points: 50,
      icon: 'ri-footprint-fill',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      date: '2024-01-24'
    },
    {
      id: '2',
      title: 'Consultation Completed',
      description: 'Completed a video consultation',
      points: 100,
      icon: 'ri-video-fill',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      date: '2024-01-23'
    },
    {
      id: '3',
      title: 'Medication Adherence',
      description: 'Took all medications on time',
      points: 75,
      icon: 'ri-medicine-bottle-fill',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      date: '2024-01-22'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Health Champion',
      description: 'Complete 10 consultations',
      icon: 'ri-trophy-fill',
      unlocked: true,
      unlockedDate: '2024-01-20'
    },
    {
      id: '2',
      title: 'Fitness Enthusiast',
      description: 'Walk 100km in a month',
      icon: 'ri-run-fill',
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: '3',
      title: 'Wellness Warrior',
      description: 'Maintain perfect medication adherence for 30 days',
      icon: 'ri-shield-check-fill',
      unlocked: false
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Complete morning health check-ins for 7 days',
      icon: 'ri-sun-fill',
      unlocked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="My Rewards" showCart={true} />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4">
        {/* Points Summary */}
        <div className="mb-6">
          <Card className="p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white animate-scale-in">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <i className="ri-gift-fill text-4xl"></i>
              </div>
              <h2 className="text-3xl font-bold mb-1">{totalPoints.toLocaleString()}</h2>
              <p className="text-pink-100">Total Points</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-pink-100 mb-1">Health Credits</p>
                <p className="text-xl font-bold">${healthCredits}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-xs text-pink-100 mb-1">This Month</p>
                <p className="text-xl font-bold">+{recentRewards.reduce((sum, r) => sum + r.points, 0)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Scratch Cards Section */}
        {walkedDistance >= 1 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Scratch Cards</h2>
              <span className="text-sm text-gray-600">Complete 1km to unlock</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {scratchCards.map((card) => (
                <Card
                  key={card.id}
                  className={`p-4 cursor-pointer transition-all duration-300 ${
                    card.status === 'available'
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 hover:shadow-lg hover:scale-105'
                      : card.status === 'used'
                      ? 'bg-gray-50 border border-gray-200 opacity-60'
                      : 'bg-gray-50 border border-gray-200 opacity-40'
                  }`}
                  onClick={() => handleScratchCardClick(card)}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                      card.status === 'available'
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                        : 'bg-gray-300'
                    }`}>
                      <i className={`ri-gift-2-fill text-2xl ${
                        card.status === 'available' ? 'text-white' : 'text-gray-500'
                      }`}></i>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">
                      {card.distance} km Reward
                    </p>
                    {card.status === 'available' && (
                      <p className="text-xs text-yellow-600 font-medium">Tap to scratch!</p>
                    )}
                    {card.status === 'used' && (
                      <p className="text-xs text-gray-500">Used</p>
                    )}
                    {card.status === 'expired' && (
                      <p className="text-xs text-gray-500">Expired</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            {scratchCards.filter(c => c.status === 'available').length === 0 && (
              <Card className="p-4 text-center bg-gray-50">
                <i className="ri-gift-line text-4xl text-gray-300 mb-2"></i>
                <p className="text-sm text-gray-600">No available scratch cards</p>
                <p className="text-xs text-gray-500 mt-1">Walk 1km to unlock a new scratch card!</p>
              </Card>
            )}
          </div>
        )}

        {/* Recent Rewards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Rewards</h2>
          <div className="space-y-3">
            {recentRewards.map((reward, index) => (
              <Card key={reward.id} className="p-4 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${reward.bgColor} rounded-xl flex items-center justify-center shadow-md`}>
                    <i className={`${reward.icon} ${reward.color} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{reward.description}</p>
                    {reward.date && (
                      <p className="text-xs text-gray-500">{reward.date}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-lg">
                      +{reward.points}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className={`p-4 text-center animate-scale-in ${
                  achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'opacity-60'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-400' : 'bg-gray-200'
                }`}>
                  <i className={`${achievement.icon} ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  } text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                {achievement.unlocked && achievement.unlockedDate && (
                  <p className="text-xs text-emerald-600 font-medium">Unlocked {achievement.unlockedDate}</p>
                )}
                {!achievement.unlocked && (
                  <p className="text-xs text-gray-400">Locked</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* How to Earn */}
        <Card className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <i className="ri-lightbulb-line text-pink-600 mr-2"></i>
            How to Earn Points
          </h3>
          <div className="space-y-2">
            {[
              { action: 'Complete consultations', points: '100 points' },
              { action: 'Take medications on time', points: '75 points' },
              { action: 'Reach daily step goal', points: '50 points' },
              { action: 'Log health metrics', points: '25 points' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.action}</span>
                <span className="font-semibold text-pink-600">{item.points}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scratch Card Modal */}
      {showScratchCard && selectedScratchCard && (
        <ScratchCard
          isOpen={showScratchCard}
          onClose={handleScratchCardClose}
          reward={{
            amount: selectedScratchCard.amount,
            type: selectedScratchCard.type,
            message: selectedScratchCard.message
          }}
        />
      )}

      <BottomNavigation />
    </div>
  );
}

