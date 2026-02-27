
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function HealthMetrics() {
  const navigate = useNavigate();
  const [showBMIDetail, setShowBMIDetail] = useState(false);
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([]);
  const [showAIAdvice, setShowAIAdvice] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const currentSteps = 8432;
  const goalSteps = 10000;
  const progressPercentage = (currentSteps / goalSteps) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const metrics = [
    {
      id: 'active-consultations',
      label: 'Active Consultations',
      value: '3',
      status: 'Ongoing',
      icon: 'ri-video-chat-fill',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'health-credits',
      label: 'Health Credits',
      value: '₹1,250',
      status: 'Available',
      icon: 'ri-wallet-3-fill',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'weight',
      label: 'Weight',
      value: '65.2 kg',
      status: 'Stable',
      icon: 'ri-scales-3-fill',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  const complaints = [
    { id: 'back-pain', label: 'Back pain' },
    { id: 'leg-pain', label: 'Leg pain' },
    { id: 'breathlessness', label: 'Breathlessness' },
    { id: 'sleepless-night', label: 'Sleepless night' }
  ];

  const toggleComplaint = (id: string) => {
    setSelectedComplaints(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleBMIClick = () => {
    setShowBMIDetail(true);
    setSelectedComplaints([]);
    setShowAIAdvice(false);
  };

  const handleNext = () => {
    if (selectedComplaints.length > 0) {
      setShowAIAdvice(true);
    }
  };

  const handleSubmit = () => {
    // Handle submission logic here
    setShowBMIDetail(false);
    setSelectedComplaints([]);
    setShowAIAdvice(false);
  };

  const closeBMIDetail = () => {
    setShowBMIDetail(false);
    setSelectedComplaints([]);
    setShowAIAdvice(false);
  };

  return (
    <>
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Health Metrics</h2>
        </div>

        {/* Circular Step Tracker */}
        <Card className="p-4 sm:p-6 mb-4 overflow-hidden min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex justify-center sm:flex-1 sm:justify-start">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="url(#stepGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="stepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <i className="ri-footprint-fill text-orange-500 text-lg sm:text-2xl mb-0.5 sm:mb-1"></i>
                  <p className="text-base sm:text-xl font-bold text-gray-900 leading-tight">{currentSteps.toLocaleString()}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">of {goalSteps.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden sm:pl-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Daily Steps</h3>
              <div className="bg-orange-50 rounded-lg p-2.5 sm:p-3 mb-2">
                <p className="text-xs sm:text-sm font-medium text-orange-700 mb-0.5 sm:mb-1 truncate">
                  <i className="ri-wallet-3-fill mr-1 flex-shrink-0"></i>
                  Earn ₹50 in wallet
                </p>
                <p className="text-[10px] sm:text-xs text-orange-600 truncate">Complete 10 km in a day</p>
              </div>
              <button
                onClick={() => navigate('/my-rewards')}
                className="w-full bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-2 mb-2 border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all duration-300 text-left min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold text-pink-700 mb-0.5 sm:mb-1 truncate">
                  <i className="ri-gift-2-fill mr-1 flex-shrink-0"></i>
                  Scratch Card on 1km!
                </p>
                <p className="text-[10px] sm:text-xs text-pink-600 truncate">Tap to view your scratch cards</p>
              </button>
            </div>
          </div>
        </Card>

        {/* Health Metrics Grid - equal height/width cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 grid-rows-2">
          {metrics.map((metric) => (
            <Card
              key={metric.id}
              className="h-full min-h-[100px] sm:min-h-[110px] p-3 sm:p-4 cursor-pointer animate-scale-in overflow-hidden min-w-0 flex flex-col"
              onClick={() => setSelectedMetric(metric.id)}
              style={{ animationDelay: `${metrics.indexOf(metric) * 0.1}s` }}
            >
              <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 ${metric.bgColor} flex items-center justify-center`}>
                  <i className={`${metric.icon} ${metric.color} text-sm sm:text-base`}></i>
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1 truncate">{metric.label}</p>
                  <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">{metric.value}</p>
                  <p className="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">{metric.status}</p>
                </div>
              </div>
            </Card>
          ))}

          {/* Highlighted BMI Card */}
          <Card
            className="h-full min-h-[100px] sm:min-h-[110px] p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md relative overflow-hidden min-w-0 flex flex-col"
            onClick={handleBMIClick}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-200/30 rounded-full -ml-8 -mb-8"></div>
            <div className="relative flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <i className="ri-body-scan-fill text-white text-base sm:text-xl"></i>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[10px] sm:text-xs text-purple-700 font-semibold mb-0.5 sm:mb-1">BMI</p>
                <p className="font-bold text-gray-900 text-sm sm:text-lg truncate">24.8</p>
                <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold truncate">Normal</p>
                <div className="mt-1.5 sm:mt-2 flex items-center text-[10px] sm:text-xs text-purple-600 font-medium truncate">
                  <i className="ri-arrow-right-circle-fill mr-1 flex-shrink-0"></i>
                  Tap for details
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* BMI Detail Modal */}
      {showBMIDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[85vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">BMI Details</h2>
              <button
                onClick={closeBMIDetail}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600 text-lg"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              {/* BMI Info */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <i className="ri-body-scan-fill text-4xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">24.8</h3>
                  <p className="text-lg font-semibold text-emerald-600 mb-1">Normal Weight</p>
                  <p className="text-sm text-gray-600">Healthy BMI Range: 18.5 - 24.9</p>
                </div>
              </Card>

              {/* Complaints Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Do you have any of these complaints?</h3>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {complaints.map((complaint) => (
                    <button
                      key={complaint.id}
                      onClick={() => toggleComplaint(complaint.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedComplaints.includes(complaint.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white'
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedComplaints.includes(complaint.id)
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                          }`}>
                          {selectedComplaints.includes(complaint.id) && (
                            <i className="ri-check-line text-white text-xs"></i>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{complaint.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Advice */}
              {showAIAdvice && (
                <div className="space-y-4">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <i className="ri-robot-2-fill text-white text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">AI Health Advice</h4>
                        <p className="text-sm text-gray-600">Based on your selected complaints</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <i className="ri-file-list-3-line mr-2 text-blue-600"></i>
                          Recommended Tests
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 text-sm">Complete Blood Count (CBC)</p>
                              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                                Book Now
                              </button>
                            </div>
                            <p className="text-xs text-gray-600">Check for anemia and infections</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 text-sm">Vitamin D & B12 Test</p>
                              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                                Book Now
                              </button>
                            </div>
                            <p className="text-xs text-gray-600">Common cause of body pain and fatigue</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <i className="ri-stethoscope-line mr-2 text-blue-600"></i>
                          Recommended Consultations
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 text-sm">General Physician</p>
                              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                                Book Now
                              </button>
                            </div>
                            <p className="text-xs text-gray-600">For overall health assessment</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 text-sm">Orthopedic Specialist</p>
                              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                                Book Now
                              </button>
                            </div>
                            <p className="text-xs text-gray-600">For back and leg pain evaluation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Fixed Bottom Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 3.5rem)' }}>
              {!showAIAdvice && selectedComplaints.length > 0 && (
                <Button onClick={handleNext} className="w-full">
                  Next
                </Button>
              )}
              {showAIAdvice && (
                <Button onClick={handleSubmit} className="w-full">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Health Metric Detail Modals */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[85vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate pr-2">
                {metrics.find(m => m.id === selectedMetric)?.label} Details
              </h2>
              <button
                onClick={() => setSelectedMetric(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-white/40 transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-gray-600 text-lg"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              {selectedMetric === 'active-consultations' && (
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                      <i className="ri-video-chat-fill text-4xl text-white"></i>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">3</h3>
                    <p className="text-lg font-semibold text-emerald-600 mb-1">Active Consultations</p>
                    <p className="text-sm text-gray-600">Ongoing appointments</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Recent Consultations</h4>
                      <div className="space-y-2">
                        {['Dr. Priya Sharma - General Check-up', 'Dr. Rajesh Kumar - Follow-up', 'Dr. Sarah Johnson - Specialist'].map((consult, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{consult}</span>
                            <span className="text-xs font-semibold text-blue-600">Active</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/my-consultations')}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      View All Consultations
                    </button>
                  </div>
                </Card>
              )}

              {selectedMetric === 'health-credits' && (
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <i className="ri-wallet-3-fill text-4xl text-white"></i>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">₹1,250</h3>
                    <p className="text-lg font-semibold text-emerald-600 mb-1">Health Credits</p>
                    <p className="text-sm text-gray-600">Available balance</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Recent Transactions</h4>
                      <div className="space-y-2">
                        {[
                          { desc: 'Steps Reward', amount: '+₹50', date: 'Today' },
                          { desc: 'Consultation Payment', amount: '-₹200', date: 'Yesterday' },
                          { desc: 'Health Check-up', amount: '-₹300', date: '2 days ago' }
                        ].map((trans, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-900 font-medium">{trans.desc}</span>
                              <p className="text-xs text-gray-500">{trans.date}</p>
                            </div>
                            <span className={`text-sm font-semibold ${trans.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                              {trans.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/my-rewards')}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      View Wallet Details
                    </button>
                  </div>
                </Card>
              )}

              {selectedMetric === 'weight' && (
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <i className="ri-scales-3-fill text-4xl text-white"></i>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">65.2 kg</h3>
                    <p className="text-lg font-semibold text-emerald-600 mb-1">Stable</p>
                    <p className="text-sm text-gray-600">Current Weight</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Last 7 Days</h4>
                      <div className="space-y-2">
                        {[65.2, 65.0, 65.3, 65.1, 65.2, 65.0, 65.2].map((weight, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Day {idx + 1}</span>
                            <span className="font-semibold text-gray-900">{weight} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">BMI</h4>
                      <p className="text-sm text-gray-600">24.8 - Normal Weight</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
