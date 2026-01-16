import { useState } from 'react';

export default function GreetingSection() {
  const currentHour = new Date().getHours();
  const [walkedDistance] = useState(1.2); // in km
  const [dailySteps] = useState(8432);
  const targetDistance = 5; // km target
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    if (walkedDistance >= 1 && walkedDistance < 2) {
      return `You've walked ${walkedDistance.toFixed(1)} km today! Keep going, you're on track! 🚶‍♀️`;
    } else if (walkedDistance >= 2 && walkedDistance < 3) {
      return `Amazing! ${walkedDistance.toFixed(1)} km completed! You're doing fantastic! 💪`;
    } else if (walkedDistance >= 3) {
      return `Outstanding! ${walkedDistance.toFixed(1)} km! You're crushing your goals! 🌟`;
    } else {
      return `Let's make your target of ${targetDistance} km today! Every step counts! 👟`;
    }
  };

  return (
    <div className="px-4 pt-4">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 text-[#fc6d13]">
          {getGreeting()}, Riya
        </h1>
        <p className="text-gray-700 font-medium mb-2">{getMotivationalMessage()}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <i className="ri-footprint-line text-orange-500"></i>
          <span>{dailySteps.toLocaleString()} steps today</span>
          <span className="mx-1">•</span>
          <span>{walkedDistance.toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
}
