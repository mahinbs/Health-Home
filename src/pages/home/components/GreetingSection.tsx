
export default function GreetingSection() {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="px-4 pt-4">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          {getGreeting()}, Riya
        </h1>
        <p className="text-gray-600">You're doing great today!</p>
      </div>
    </div>
  );
}
