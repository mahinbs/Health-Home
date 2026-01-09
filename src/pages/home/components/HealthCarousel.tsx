import { useState, useEffect } from 'react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaAction?: () => void;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    title: 'Expert Medical Care',
    description: 'Connect with certified healthcare professionals from the comfort of your home',
    ctaText: 'Book Consultation',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80',
    title: 'Home Care Services',
    description: 'Professional caregivers ready to assist you with daily health needs',
    ctaText: 'Explore Services',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    title: 'Pharmacy at Your Doorstep',
    description: 'Get your medications and health supplies delivered quickly and safely',
    ctaText: 'Shop Now',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80',
    title: 'Track Your Health',
    description: 'Monitor your vital signs and health metrics with our advanced tools',
    ctaText: 'View Metrics',
  },
];

export default function HealthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative w-11/12 h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg mb-4 mx-auto">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 max-w-md drop-shadow-md">
                {slide.description}
              </p>
              {slide.ctaText && (
                <button
                  onClick={slide.ctaAction}
                  className="self-start px-4 sm:px-6 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs sm:text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {slide.ctaText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 sm:h-2.5 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

