
import { useState } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function VitalMonitoring() {
  const [showHealthLocker, setShowHealthLocker] = useState(false);
  const [selectedVital, setSelectedVital] = useState<'bp' | 'sugar' | null>(null);

  const bpData = {
    lastMeasured: '2 days ago',
    value: '145/95',
    status: 'high',
    date: 'May 15, 2024',
    time: '09:30 AM',
    history: [
      { date: 'May 15, 2024', time: '09:30 AM', value: '145/95', status: 'high' },
      { date: 'May 13, 2024', time: '08:15 AM', value: '138/88', status: 'high' },
      { date: 'May 10, 2024', time: '07:45 AM', value: '125/82', status: 'normal' },
      { date: 'May 08, 2024', time: '09:00 AM', value: '122/80', status: 'normal' },
      { date: 'May 05, 2024', time: '08:30 AM', value: '128/84', status: 'normal' }
    ]
  };

  const sugarData = {
    lastMeasured: '1 day ago',
    value: '156 mg/dL',
    status: 'high',
    date: 'May 16, 2024',
    time: '07:00 AM',
    history: [
      { date: 'May 16, 2024', time: '07:00 AM', value: '156 mg/dL', status: 'high', type: 'Fasting' },
      { date: 'May 14, 2024', time: '07:15 AM', value: '148 mg/dL', status: 'high', type: 'Fasting' },
      { date: 'May 12, 2024', time: '07:30 AM', value: '110 mg/dL', status: 'normal', type: 'Fasting' },
      { date: 'May 10, 2024', time: '07:00 AM', value: '105 mg/dL', status: 'normal', type: 'Fasting' },
      { date: 'May 08, 2024', time: '07:20 AM', value: '98 mg/dL', status: 'normal', type: 'Fasting' }
    ]
  };

  const openHealthLocker = (vital: 'bp' | 'sugar') => {
    setSelectedVital(vital);
    setShowHealthLocker(true);
  };

  const closeHealthLocker = () => {
    setShowHealthLocker(false);
    setSelectedVital(null);
  };

  return (
    <>
      <div className="px-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Vital Monitoring</h2>
        
        <div className="space-y-3">
          {/* Blood Pressure Card */}
          <Card 
            className={`p-4 cursor-pointer ${bpData.status === 'high' ? 'border-2 border-red-300 bg-red-50/50' : ''}`}
            onClick={() => openHealthLocker('bp')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  bpData.status === 'high' ? 'bg-red-100' : 'bg-emerald-50'
                }`}>
                  <i className={`ri-pulse-fill text-2xl ${
                    bpData.status === 'high' ? 'text-red-600' : 'text-emerald-600'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">Blood Pressure</h3>
                    {bpData.status === 'high' && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                        High
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gray-900">{bpData.value}</p>
                  <p className="text-xs text-gray-600">Last measured: {bpData.lastMeasured}</p>
                  {bpData.status === 'high' && (
                    <p className="text-xs text-red-600 font-medium mt-1">
                      <i className="ri-alert-fill mr-1"></i>
                      Monitor weekly
                    </p>
                  )}
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openHealthLocker('bp');
              }}
              className="mt-3 text-sm text-blue-600 font-medium flex items-center"
            >
              <i className="ri-folder-3-line mr-1"></i>
              View in Health Locker
            </button>
          </Card>

          {/* Blood Sugar Card */}
          <Card 
            className={`p-4 cursor-pointer ${sugarData.status === 'high' ? 'border-2 border-red-300 bg-red-50/50' : ''}`}
            onClick={() => openHealthLocker('sugar')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  sugarData.status === 'high' ? 'bg-red-100' : 'bg-blue-50'
                }`}>
                  <i className={`ri-drop-fill text-2xl ${
                    sugarData.status === 'high' ? 'text-red-600' : 'text-blue-600'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">Blood Sugar</h3>
                    {sugarData.status === 'high' && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                        High
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gray-900">{sugarData.value}</p>
                  <p className="text-xs text-gray-600">Last measured: {sugarData.lastMeasured}</p>
                  {sugarData.status === 'high' && (
                    <p className="text-xs text-red-600 font-medium mt-1">
                      <i className="ri-alert-fill mr-1"></i>
                      Monitor weekly
                    </p>
                  )}
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openHealthLocker('sugar');
              }}
              className="mt-3 text-sm text-blue-600 font-medium flex items-center"
            >
              <i className="ri-folder-3-line mr-1"></i>
              View in Health Locker
            </button>
          </Card>
        </div>
      </div>

      {/* Health Locker Modal */}
      {showHealthLocker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto pb-24 animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedVital === 'bp' ? 'Blood Pressure' : 'Blood Sugar'} History
              </h2>
              <button 
                onClick={closeHealthLocker}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {selectedVital === 'bp' && bpData.history.map((entry, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          entry.status === 'high' ? 'bg-red-100' : 'bg-emerald-50'
                        }`}>
                          <i className={`ri-pulse-fill ${
                            entry.status === 'high' ? 'text-red-600' : 'text-emerald-600'
                          }`}></i>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{entry.value}</p>
                          <p className="text-xs text-gray-600">{entry.date} • {entry.time}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {entry.status === 'high' ? 'High' : 'Normal'}
                      </span>
                    </div>
                  </Card>
                ))}

                {selectedVital === 'sugar' && sugarData.history.map((entry, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          entry.status === 'high' ? 'bg-red-100' : 'bg-blue-50'
                        }`}>
                          <i className={`ri-drop-fill ${
                            entry.status === 'high' ? 'text-red-600' : 'text-blue-600'
                          }`}></i>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{entry.value}</p>
                          <p className="text-xs text-gray-600">{entry.date} • {entry.time}</p>
                          <p className="text-xs text-gray-500">{entry.type}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {entry.status === 'high' ? 'High' : 'Normal'}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <Button onClick={closeHealthLocker} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
