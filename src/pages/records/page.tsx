
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import { useState } from 'react';

export default function Records() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Records', icon: 'ri-file-text-line' },
    { id: 'prescriptions', name: 'Prescriptions', icon: 'ri-file-list-3-line' },
    { id: 'reports', name: 'Lab Reports', icon: 'ri-test-tube-line' },
    { id: 'scans', name: 'Scans & X-rays', icon: 'ri-scanner-line' },
    { id: 'vaccines', name: 'Vaccinations', icon: 'ri-medicine-bottle-line' }
  ];

  const records = [
    {
      id: '1',
      type: 'prescription',
      title: 'Prescription - Dr. Sarah Johnson',
      date: '2024-01-15',
      description: 'Cardiology consultation prescription',
      category: 'prescriptions'
    },
    {
      id: '2',
      type: 'report',
      title: 'Blood Test Report',
      date: '2024-01-10',
      description: 'Complete Blood Count (CBC)',
      category: 'reports'
    },
    {
      id: '3',
      type: 'scan',
      title: 'Chest X-ray',
      date: '2024-01-05',
      description: 'Chest X-ray examination',
      category: 'scans'
    },
    {
      id: '4',
      type: 'vaccine',
      title: 'COVID-19 Vaccination',
      date: '2023-12-20',
      description: 'Booster dose administered',
      category: 'vaccines'
    }
  ];

  const filteredRecords = selectedCategory === 'all'
    ? records
    : records.filter(record => record.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Health Records" />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4">
        {/* Categories */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-center animate-scale-in ${
                  selectedCategory === category.id
                    ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-md scale-105'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:shadow-sm'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <i className={`${category.icon} text-2xl`}></i>
                </div>
                <span className="text-xs font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-3">
          {filteredRecords.map((record, index) => (
            <Card
              key={record.id}
              className="p-4 cursor-pointer animate-scale-in"
              onClick={() => setSelectedRecord(record)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center shadow-md">
                  <i className={`${
                    record.type === 'prescription' ? 'ri-file-list-3-line' :
                    record.type === 'report' ? 'ri-test-tube-line' :
                    record.type === 'scan' ? 'ri-scanner-line' :
                    'ri-medicine-bottle-line'
                  } text-xl text-pink-600`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{record.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-pink-400"></i>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-file-text-line text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-600 mb-2">No records found</p>
            <p className="text-sm text-gray-500">Your health records will appear here</p>
          </Card>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Record Details</h2>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <i className={`${
                      selectedRecord.type === 'prescription' ? 'ri-file-list-3-line' :
                      selectedRecord.type === 'report' ? 'ri-test-tube-line' :
                      selectedRecord.type === 'scan' ? 'ri-scanner-line' :
                      'ri-medicine-bottle-line'
                    } text-4xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedRecord.title}</h3>
                  <p className="text-sm text-gray-600">{selectedRecord.description}</p>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="font-semibold text-gray-900">{selectedRecord.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900 capitalize">{selectedRecord.type}</span>
                  </div>
                </div>
              </Card>

              <div className="flex space-x-3">
                <button className="flex-1 bg-white border-2 border-pink-300 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors">
                  <i className="ri-download-line mr-2"></i>
                  Download
                </button>
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                  <i className="ri-share-line mr-2"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

