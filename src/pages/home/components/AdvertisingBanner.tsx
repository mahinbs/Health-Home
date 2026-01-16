import { useState, useEffect } from 'react';
import Card from '../../../components/base/Card';

const ads = [
  {
    id: 1,
    title: "Special Health Checkup Package",
    description: "Get comprehensive health screening at 30% off",
    image: "https://readdy.ai/api/search-image?query=Health%20checkup%20package%2C%20medical%20screening%2C%20healthcare%20services%2C%20professional%20medical%20photography&width=300&height=150&seq=ad1",
    cta: "Book Now",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Home Care Services Available",
    description: "IV infusion, dressing, catheter care at your doorstep",
    image: "https://readdy.ai/api/search-image?query=Home%20care%20nursing%20services%2C%20medical%20care%20at%20home%2C%20healthcare%20professional%20photography&width=300&height=150&seq=ad2",
    cta: "Learn More",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    title: "Second Opinion Consultation",
    description: "Get expert second opinion from top specialists",
    image: "https://readdy.ai/api/search-image?query=Doctor%20consultation%2C%20second%20opinion%2C%20medical%20advice%2C%20healthcare%20professional%20photography&width=300&height=150&seq=ad3",
    cta: "Consult Now",
    color: "from-pink-500 to-rose-500"
  }
];

export default function AdvertisingBanner() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const ad = ads[currentAd];

  return (
    <div className="px-4 mb-4">
      <Card className="p-0 overflow-hidden relative">
        <div className={`bg-gradient-to-r ${ad.color} p-4 text-white relative`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{ad.title}</h3>
                <p className="text-sm text-white/90">{ad.description}</p>
              </div>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg">
                {ad.cta}
              </button>
            </div>
          </div>

          {/* Ad Indicators */}
          <div className="flex items-center justify-center space-x-1.5 mt-3">
            {ads.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentAd ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

