export default function HealthCredits() {
  return (
    <div className="px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Health Score</h3>
            <p className="text-sm text-gray-500">Keep up the great work!</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full flex items-center justify-center shadow-md">
            <i className="ri-heart-pulse-fill text-white text-2xl"></i>
          </div>
        </div>
        
        <div className="flex items-end space-x-2 mb-2">
          <span className="text-5xl font-bold text-pink-600">85</span>
          <span className="text-2xl text-gray-400 pb-2">/100</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full transition-all duration-500"
            style={{ width: '85%' }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          Based on your activity, vitals, and wellness habits
        </p>
      </div>
    </div>
  );
}
