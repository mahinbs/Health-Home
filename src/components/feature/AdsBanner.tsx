import { useEffect, useRef } from 'react';

const notifications = [
  "🎉 Get 20% off on your first consultation! Book now!",
  "💊 Free delivery on all pharmacy orders above ₹500",
  "🏥 Book diagnostic tests at home - Special discount available",
  "⭐ Earn health credits with every step you take!",
  "🩺 Second opinion consultations now available",
  "📱 Download our app for exclusive health tips",
  "💉 Home care services: IV infusion, dressing & more",
  "🎁 Scratch card rewards on completing 1km walk",
  "🔔 New doctors added - Book your appointment today",
  "💳 UPI & Google Pay accepted for all payments"
];

export default function AdsBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicate notifications for seamless loop
    const duplicatedNotifications = [...notifications, ...notifications];
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 text-white z-[60] safe-area-top h-[40px]">
      <div className="px-3 py-2 flex items-center space-x-3 overflow-hidden h-full relative">
        <div className="flex-shrink-0">
          <i className="ri-notification-badge-line text-lg animate-pulse"></i>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div 
            ref={scrollRef}
            className="whitespace-nowrap flex"
            style={{ width: 'fit-content' }}
          >
            {[...notifications, ...notifications].map((notification, index) => (
              <div
                key={index}
                className="inline-block text-center text-xs sm:text-sm font-medium px-4"
              >
                {notification}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

