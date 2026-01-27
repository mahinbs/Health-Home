import { useState } from 'react';

interface ProactiveService {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  category: 'consultation' | 'diagnostic' | 'medicine' | 'homecare';
}

interface ProactiveBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: (service: ProactiveService) => void;
  onNo: () => void;
  services: ProactiveService[];
  title: string;
  message: string;
}

export default function ProactiveBookingDialog({
  isOpen,
  onClose,
  onYes,
  onNo,
  services,
  title,
  message
}: ProactiveBookingDialogProps) {
  const [selectedService, setSelectedService] = useState<ProactiveService | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in safe-area-inset">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up">
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
              <i className="ri-lightbulb-flash-line text-white text-xl"></i>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 sm:pb-28">
          <p className="text-sm text-gray-600 mb-4">{message}</p>

          <div className="space-y-3 mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedService?.id === service.id
                    ? 'border-pink-500 bg-pink-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-pink-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selectedService?.id === service.id
                        ? 'bg-pink-500'
                        : 'bg-gray-100'
                    }`}>
                      <i className={`${service.icon} ${
                        selectedService?.id === service.id ? 'text-white' : 'text-gray-600'
                      } text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h3>
                      <p className="text-xs text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="font-semibold text-pink-600 text-sm">{service.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                if (selectedService) {
                  onYes(selectedService);
                } else {
                  alert('Please select a service first');
                }
              }}
              disabled={!selectedService}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
            >
              Yes, Book This
            </button>
            <button
              onClick={() => {
                onNo();
                onClose();
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              No, Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

