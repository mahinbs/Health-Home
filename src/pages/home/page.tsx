
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
import GreetingSection from './components/GreetingSection';
import QuickAccessCards from './components/QuickAccessCards';
import UpcomingAppointments from './components/UpcomingAppointments';
import HealthMetrics from './components/HealthMetrics';
import VitalMonitoring from './components/VitalMonitoring';
import MedicationReminders from './components/MedicationReminders';
import HealthTips from './components/HealthTips';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation 
        title="Health@Home"
        rightAction={
          <div className="flex items-center space-x-2">
            <button className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 relative">
              <i className="ri-notification-3-fill text-pink-600 text-lg"></i>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>
            <button className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200">
              <i className="ri-search-line text-pink-600 text-lg"></i>
            </button>
          </div>
        }
      />
      
      <div className="pt-16 sm:pt-20 pb-20 sm:pb-24 space-y-4">
        <GreetingSection />
        <HealthMetrics />
        <VitalMonitoring />
        <UpcomingAppointments />
        <QuickAccessCards />
        <MedicationReminders />
        <HealthTips />
      </div>
      
      <BottomNavigation />
    </div>
  );
}
