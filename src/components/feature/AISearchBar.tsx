import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  type: 'doctor' | 'symptom' | 'diagnostic' | 'hospital';
  title: string;
  description: string;
  action: () => void;
}

export default function AISearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate AI search with delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [];
      const lowerQuery = searchQuery.toLowerCase();

      // Doctor suggestions
      if (lowerQuery.includes('chest') || lowerQuery.includes('heart') || lowerQuery.includes('cardiac')) {
        mockResults.push({
          type: 'doctor',
          title: 'Dr. Sarah Johnson - Cardiologist',
          description: 'Specialist in cardiovascular diseases, 15 years experience',
          action: () => {
            navigate('/consult');
            setIsOpen(false);
          }
        });
      }

      if (lowerQuery.includes('skin') || lowerQuery.includes('rash') || lowerQuery.includes('acne')) {
        mockResults.push({
          type: 'doctor',
          title: 'Dr. Michael Chen - Dermatologist',
          description: 'Expert in skin conditions and cosmetic dermatology',
          action: () => {
            navigate('/consult');
            setIsOpen(false);
          }
        });
      }

      // Symptom analysis
      if (lowerQuery.includes('pain') || lowerQuery.includes('fever') || lowerQuery.includes('headache')) {
        mockResults.push({
          type: 'symptom',
          title: 'Symptom Analysis Available',
          description: 'Get AI-powered analysis of your symptoms and recommendations',
          action: () => {
            navigate('/consult');
            setIsOpen(false);
          }
        });
      }

      // Diagnostic suggestions
      if (lowerQuery.includes('test') || lowerQuery.includes('lab') || lowerQuery.includes('xray') || lowerQuery.includes('scan')) {
        mockResults.push({
          type: 'diagnostic',
          title: 'Book Diagnostic Tests',
          description: 'X-Ray, Lab Tests, CT Scan, MRI available',
          action: () => {
            navigate('/diagnostic');
            setIsOpen(false);
          }
        });
      }

      // Hospital suggestions
      if (lowerQuery.includes('hospital') || lowerQuery.includes('clinic') || lowerQuery.includes('nearby')) {
        mockResults.push({
          type: 'hospital',
          title: 'Nearby Hospitals & Clinics',
          description: 'Find diagnostic centers and hospitals near you',
          action: () => {
            navigate('/diagnostic');
            setIsOpen(false);
          }
        });
      }

      // Generic doctor consultation
      if (mockResults.length === 0) {
        mockResults.push({
          type: 'doctor',
          title: 'Consult a Doctor',
          description: 'Get expert medical advice for your concerns',
          action: () => {
            navigate('/consult');
            setIsOpen(false);
          }
        });
      }

      setResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return 'ri-stethoscope-line';
      case 'symptom':
        return 'ri-heart-pulse-line';
      case 'diagnostic':
        return 'ri-test-tube-line';
      case 'hospital':
        return 'ri-hospital-line';
      default:
        return 'ri-search-line';
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'doctor':
        return 'text-blue-600 bg-blue-50';
      case 'symptom':
        return 'text-pink-600 bg-pink-50';
      case 'diagnostic':
        return 'text-green-600 bg-green-50';
      case 'hospital':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0"
      >
        <i className="ri-search-line text-pink-600 text-base sm:text-lg"></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20 sm:pt-24 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl animate-scale-in">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Ask about symptoms, find doctors, book tests..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                  autoFocus
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                    setResults([]);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Analyzing your query...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      onClick={result.action}
                      className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getResultColor(result.type)}`}>
                          <i className={`${getResultIcon(result.type)} text-lg`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{result.title}</h3>
                          <p className="text-sm text-gray-600">{result.description}</p>
                        </div>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="text-center py-8">
                  <i className="ri-search-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-600">No results found</p>
                  <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Try searching for:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Chest pain', 'Skin rash', 'Book lab test', 'Find hospital'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setQuery(suggestion);
                          handleSearch(suggestion);
                        }}
                        className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
                      >
                        <i className="ri-search-line text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

