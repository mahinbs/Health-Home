
import Card from '../../../components/base/Card';

export default function HealthTips() {
  const tips = [
    {
      id: 1,
      icon: '💧',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain your energy and focus.'
    },
    {
      id: 2,
      icon: '🚶‍♀️',
      title: 'Daily Movement',
      description: 'Take a 10-minute walk after meals to improve digestion and circulation.'
    },
    {
      id: 3,
      icon: '😴',
      title: 'Quality Sleep',
      description: 'Aim for 7-8 hours of sleep each night for optimal health and recovery.'
    }
  ];

  const currentTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="px-4">
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{currentTip.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{currentTip.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{currentTip.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
