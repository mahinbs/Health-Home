
import { useState } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  timeLeft: string;
  urgent: boolean;
  taken: boolean;
  takenAt?: string;
}

export default function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Vitamin D3',
      dosage: '1 tablet after breakfast',
      timeLeft: 'Due in 30 minutes',
      urgent: true,
      taken: false
    },
    {
      id: 2,
      name: 'Omega-3',
      dosage: '2 capsules with dinner',
      timeLeft: 'Due in 4 hours',
      urgent: false,
      taken: false
    },
    {
      id: 3,
      name: 'Multivitamin',
      dosage: '1 tablet with lunch',
      timeLeft: 'Due in 2 hours',
      urgent: false,
      taken: false
    }
  ]);

  const handleTakeMedicine = (medicationId: number) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medicationId) {
        return {
          ...med,
          taken: true,
          takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return med;
    }));
  };

  return (
    <div className="px-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Medication Reminders</h2>
      
      <div className="space-y-3">
        {medications.map((medication, index) => (
          <Card 
            key={medication.id} 
            className={`p-4 animate-scale-in ${
              medication.taken ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/50' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                  {medication.taken && (
                    <div className="flex items-center space-x-1 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <i className="ri-check-line text-emerald-600 text-xs"></i>
                      <span className="text-xs font-semibold text-emerald-700">Taken</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{medication.dosage}</p>
                {medication.taken ? (
                  <p className="text-xs font-medium text-emerald-600">
                    <i className="ri-time-line mr-1"></i>
                    Taken at {medication.takenAt}
                  </p>
                ) : (
                  <p className={`text-xs font-medium ${medication.urgent ? 'text-orange-600' : 'text-gray-500'}`}>
                    {medication.timeLeft}
                  </p>
                )}
              </div>
              {!medication.taken ? (
                <Button
                  size="sm"
                  onClick={() => handleTakeMedicine(medication.id)}
                  className="ml-4"
                >
                  Take
                </Button>
              ) : (
                <div className="ml-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <i className="ri-check-line text-white text-lg"></i>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
