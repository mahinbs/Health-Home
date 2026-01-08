
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';

export default function QuickAccessCards() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'consult',
      title: 'Consult a Doctor',
      description: 'Book instantly',
      icon: 'ri-video-line',
      color: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100',
      path: '/consult'
    },
    {
      id: 'homecare',
      title: 'Homecare Support',
      description: 'Professional care',
      icon: 'ri-heart-pulse-line',
      color: 'from-teal-50 to-cyan-50',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-100',
      path: '/homecare'
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Orders',
      description: 'Track your medicines',
      icon: 'ri-medicine-bottle-line',
      color: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-100',
      path: '/pharmacy'
    },
    {
      id: 'records',
      title: 'Health Records',
      description: 'Digital locker',
      icon: 'ri-file-text-line',
      color: 'from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100',
      path: '/records'
    }
  ];

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {services.map((service, index) => (
          <Card
            key={service.id}
            onClick={() => navigate(service.path)}
            className={`p-4 bg-gradient-to-br ${service.color} ${service.borderColor} animate-scale-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-full bg-white/80 flex items-center justify-center ${service.iconColor}`}>
                <i className={`${service.icon} text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.title}</h3>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
