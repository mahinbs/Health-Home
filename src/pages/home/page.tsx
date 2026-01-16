
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import AISearchBar from '../../components/feature/AISearchBar';
import GreetingSection from './components/GreetingSection';
import HealthCarousel from './components/HealthCarousel';
import QuickAccessCards from './components/QuickAccessCards';
import UpcomingAppointments from './components/UpcomingAppointments';
import HealthMetrics from './components/HealthMetrics';
import VitalMonitoring from './components/VitalMonitoring';
import AdvertisingBanner from './components/AdvertisingBanner';
import MedicationReminders from './components/MedicationReminders';
import HealthTips from './components/HealthTips';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation 
        title="Health@Home"
        rightAction={
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 relative flex-shrink-0">
              <i className="ri-notification-3-fill text-pink-600 text-base sm:text-lg"></i>
              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-xs font-bold">3</span>
              </div>
            </button>
            <AISearchBar />
          </div>
        }
      />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 space-y-4">
        <GreetingSection />
        <HealthCarousel />
        <HealthMetrics />
        <VitalMonitoring />
        <AdvertisingBanner />
        <UpcomingAppointments />
        <QuickAccessCards />
        <MedicationReminders />
        <HealthTips />
      </div>
      
      <BottomNavigation />
    </div>
  );
}
