import { useState } from 'react';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import { useCart } from '../../contexts/CartContext';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  price: number;
  inStock: boolean;
  image: string;
  category: string;
  prescription: boolean;
}

interface MedicalEquipment {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  image: string;
  category: string;
  brand: string;
}

interface Prescription {
  id: string;
  medicationName: string;
  doctorName: string;
  dosage: string;
  quantity: string;
  refillsLeft: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryDate: string;
}

export default function PharmacyPage() {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<MedicalEquipment | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: 'ri-medicine-bottle-line' },
    { id: 'prescription', name: 'Prescription', icon: 'ri-file-text-line' },
    { id: 'otc', name: 'Over Counter', icon: 'ri-shopping-bag-line' },
    { id: 'vitamins', name: 'Vitamins', icon: 'ri-capsule-line' },
    { id: 'first-aid', name: 'First Aid', icon: 'ri-first-aid-kit-line' },
    { id: 'personal-care', name: 'Personal Care', icon: 'ri-heart-pulse-line' }
  ];

  const equipmentCategories = [
    { id: 'all', name: 'All Equipment', icon: 'ri-stethoscope-line' },
    { id: 'monitoring', name: 'Monitoring', icon: 'ri-heart-pulse-line' },
    { id: 'mobility', name: 'Mobility', icon: 'ri-wheelchair-line' },
    { id: 'respiratory', name: 'Respiratory', icon: 'ri-lungs-line' },
    { id: 'diagnostic', name: 'Diagnostic', icon: 'ri-thermometer-line' },
    { id: 'support', name: 'Support', icon: 'ri-hand-heart-line' }
  ];

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      dosage: '500mg',
      price: 12.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Paracetamol%20tablets%20medication%20bottle%2C%20white%20pills%20in%20clear%20bottle%2C%20pharmaceutical%20product%20photography%2C%20clean%20white%20background%2C%20professional%20medical%20photography%2C%20high%20detail%2C%20centered%20composition&width=200&height=200&seq=med1&orientation=squarish',
      category: 'otc',
      prescription: false
    },
    {
      id: '2',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      dosage: '250mg',
      price: 24.50,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Amoxicillin%20antibiotic%20capsules%2C%20red%20and%20white%20capsules%20in%20bottle%2C%20prescription%20medication%2C%20pharmaceutical%20product%20photography%2C%20clean%20white%20background%2C%20professional%20medical%20photography&width=200&height=200&seq=med2&orientation=squarish',
      category: 'prescription',
      prescription: true
    },
    {
      id: '3',
      name: 'Vitamin D3',
      genericName: 'Cholecalciferol',
      dosage: '1000 IU',
      price: 18.75,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Vitamin%20D3%20supplement%20bottle%2C%20yellow%20capsules%2C%20vitamin%20supplement%2C%20health%20product%20photography%2C%20clean%20white%20background%2C%20professional%20product%20shot%2C%20centered%20composition&width=200&height=200&seq=med3&orientation=squarish',
      category: 'vitamins',
      prescription: false
    },
    {
      id: '4',
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      dosage: '400mg',
      price: 15.25,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Ibuprofen%20pain%20relief%20tablets%2C%20orange%20coated%20tablets%20in%20bottle%2C%20over%20counter%20medication%2C%20pharmaceutical%20product%20photography%2C%20clean%20white%20background&width=200&height=200&seq=med4&orientation=squarish',
      category: 'otc',
      prescription: false
    },
    {
      id: '5',
      name: 'First Aid Kit',
      genericName: 'Emergency Kit',
      dosage: 'Complete Set',
      price: 45.00,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=First%20aid%20kit%20medical%20emergency%20supplies%2C%20red%20cross%20medical%20kit%2C%20bandages%20and%20medical%20supplies%2C%20healthcare%20product%20photography%2C%20clean%20white%20background&width=200&height=200&seq=med5&orientation=squarish',
      category: 'first-aid',
      prescription: false
    },
    {
      id: '6',
      name: 'Hand Sanitizer',
      genericName: 'Alcohol-based sanitizer',
      dosage: '250ml',
      price: 8.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Hand%20sanitizer%20bottle%2C%20clear%20gel%20sanitizer%2C%20personal%20care%20hygiene%20product%2C%20healthcare%20product%20photography%2C%20clean%20white%20background%2C%20professional%20product%20shot&width=200&height=200&seq=med6&orientation=squarish',
      category: 'personal-care',
      prescription: false
    }
  ];

  const medicalEquipment: MedicalEquipment[] = [
    {
      id: 'eq1',
      name: 'Digital Blood Pressure Monitor',
      description: 'Automatic upper arm BP monitor with large LCD display',
      price: 89.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Digital%20blood%20pressure%20monitor%20device%2C%20white%20medical%20equipment%2C%20automatic%20BP%20monitor%20with%20LCD%20screen%2C%20professional%20medical%20device%20photography%2C%20clean%20white%20background%2C%20centered%20composition%2C%20high%20detail&width=200&height=200&seq=eq1&orientation=squarish',
      category: 'monitoring',
      brand: 'Omron'
    },
    {
      id: 'eq2',
      name: 'Pulse Oximeter',
      description: 'Fingertip pulse oximeter with LED display',
      price: 34.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Fingertip%20pulse%20oximeter%20medical%20device%2C%20blue%20and%20white%20oximeter%2C%20LED%20display%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition&width=200&height=200&seq=eq2&orientation=squarish',
      category: 'monitoring',
      brand: 'Beurer'
    },
    {
      id: 'eq3',
      name: 'Digital Thermometer',
      description: 'Fast-reading infrared forehead thermometer',
      price: 45.50,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Digital%20infrared%20thermometer%20medical%20device%2C%20white%20thermometer%20gun%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition%2C%20high%20detail&width=200&height=200&seq=eq3&orientation=squarish',
      category: 'diagnostic',
      brand: 'Braun'
    },
    {
      id: 'eq4',
      name: 'Nebulizer Machine',
      description: 'Portable nebulizer for respiratory treatment',
      price: 125.00,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Portable%20nebulizer%20machine%20medical%20device%2C%20white%20respiratory%20equipment%2C%20professional%20medical%20device%20photography%2C%20clean%20white%20background%2C%20centered%20composition&width=200&height=200&seq=eq4&orientation=squarish',
      category: 'respiratory',
      brand: 'Philips'
    },
    {
      id: 'eq5',
      name: 'Wheelchair',
      description: 'Foldable lightweight wheelchair with padded seat',
      price: 299.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Foldable%20wheelchair%20medical%20equipment%2C%20black%20wheelchair%20with%20wheels%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition%2C%20side%20view&width=200&height=200&seq=eq5&orientation=squarish',
      category: 'mobility',
      brand: 'Drive Medical'
    },
    {
      id: 'eq6',
      name: 'Walking Cane',
      description: 'Adjustable aluminum walking cane with ergonomic handle',
      price: 28.99,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Adjustable%20walking%20cane%20medical%20equipment%2C%20black%20aluminum%20cane%20with%20ergonomic%20handle%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition&width=200&height=200&seq=eq6&orientation=squarish',
      category: 'mobility',
      brand: 'Hugo'
    },
    {
      id: 'eq7',
      name: 'Glucose Meter Kit',
      description: 'Blood glucose monitoring system with test strips',
      price: 65.00,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Blood%20glucose%20meter%20kit%20medical%20device%2C%20white%20glucometer%20with%20test%20strips%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition&width=200&height=200&seq=eq7&orientation=squarish',
      category: 'monitoring',
      brand: 'Accu-Chek'
    },
    {
      id: 'eq8',
      name: 'Knee Support Brace',
      description: 'Adjustable compression knee brace for support',
      price: 42.50,
      inStock: true,
      image: 'https://readdy.ai/api/search-image?query=Knee%20support%20brace%20medical%20equipment%2C%20black%20compression%20knee%20brace%2C%20professional%20medical%20equipment%20photography%2C%20clean%20white%20background%2C%20centered%20composition&width=200&height=200&seq=eq8&orientation=squarish',
      category: 'support',
      brand: 'Mueller'
    }
  ];

  const prescriptions: Prescription[] = [
    {
      id: '1',
      medicationName: 'Lisinopril 10mg',
      doctorName: 'Dr. Sarah Johnson',
      dosage: '10mg once daily',
      quantity: '30 tablets',
      refillsLeft: 2,
      expiryDate: '2024-12-15',
      status: 'active'
    },
    {
      id: '2',
      medicationName: 'Metformin 500mg',
      doctorName: 'Dr. Michael Chen',
      dosage: '500mg twice daily',
      quantity: '60 tablets',
      refillsLeft: 1,
      expiryDate: '2024-11-20',
      status: 'active'
    },
    {
      id: '3',
      medicationName: 'Atorvastatin 20mg',
      doctorName: 'Dr. Emily Rodriguez',
      dosage: '20mg once daily',
      quantity: '30 tablets',
      refillsLeft: 0,
      expiryDate: '2024-10-05',
      status: 'expired'
    }
  ];

  const orders: Order[] = [
    {
      id: 'ORD-001',
      items: ['Paracetamol 500mg', 'Vitamin D3 1000 IU'],
      total: 31.74,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-17'
    },
    {
      id: 'ORD-002',
      items: ['Ibuprofen 400mg', 'Hand Sanitizer 250ml'],
      total: 24.24,
      status: 'shipped',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-22'
    },
    {
      id: 'ORD-003',
      items: ['First Aid Kit'],
      total: 45.00,
      status: 'processing',
      orderDate: '2024-01-21',
      deliveryDate: '2024-01-24'
    }
  ];

  const filteredMedications = (selectedCategory === 'all' 
    ? medications 
    : medications.filter(med => med.category === selectedCategory))
    .filter(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredEquipment = (selectedCategory === 'all'
    ? medicalEquipment
    : medicalEquipment.filter(eq => eq.category === selectedCategory))
    .filter(eq =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleOrderMedication = (medication: Medication) => {
    if (isInCart(medication.id)) {
      removeFromCart(medication.id);
    } else {
      addToCart({
        id: medication.id,
        name: medication.name,
        price: medication.price,
        image: medication.image,
        type: 'medication',
        description: medication.genericName,
        dosage: medication.dosage
      });
    }
  };

  const handleOrderEquipment = (equipment: MedicalEquipment) => {
    if (isInCart(equipment.id)) {
      removeFromCart(equipment.id);
    } else {
      addToCart({
        id: equipment.id,
        name: equipment.name,
        price: equipment.price,
        image: equipment.image,
        type: 'equipment',
        description: equipment.description,
        brand: equipment.brand
      });
    }
  };

  const handlePlaceOrder = () => {
    // Order placement logic would go here
    setShowOrderModal(false);
    setSelectedMedication(null);
    setSelectedEquipment(null);
    alert('Order placed successfully! You will receive a confirmation shortly.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'expired': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <TopNavigation title="Pharmacy & Medical Equipment" />
      
      <div className="pt-16 sm:pt-20 pb-20 sm:pb-24 px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white p-6 rounded-2xl mb-4 shadow-2xl animate-scale-in">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Pharmacy & Medical Equipment</h1>
            <p className="text-pink-100 text-sm sm:text-base mb-4">Order medicines & medical devices delivered to your doorstep</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <i className="ri-truck-line"></i>
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-shield-check-line"></i>
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-time-line"></i>
                <span>24/7 Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-pink-100/50 shadow-md">
          <div className="flex">
            {[
              { id: 'browse', label: 'Medicines', icon: 'ri-medicine-bottle-line' },
              { id: 'equipment', label: 'Equipment', icon: 'ri-stethoscope-line' },
              { id: 'prescriptions', label: 'Prescriptions', icon: 'ri-file-text-line' },
              { id: 'orders', label: 'Orders', icon: 'ri-shopping-bag-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600 bg-pink-50/50'
                    : 'border-transparent text-gray-500 hover:text-pink-400'
                }`}
              >
                <i className={`${tab.icon} text-lg ${activeTab === tab.id ? 'scale-110' : ''} transition-transform duration-300`}></i>
                <span className="font-semibold text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Browse Medicines Tab */}
        {activeTab === 'browse' && (
          <div className="p-4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/95 backdrop-blur-sm border border-pink-100/50 rounded-xl px-4 py-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 shadow-md"
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 text-lg"></i>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                )}
              </div>
            </div>
            {/* Categories */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Categories</h2>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-md scale-105'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      <i className={`${category.icon} text-xl`}></i>
                    </div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {selectedCategory === 'all' ? 'All Medications' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="space-y-3">
                {filteredMedications.map((medication) => (
                  <Card key={medication.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={medication.image}
                        alt={medication.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                            <p className="text-sm text-gray-600">{medication.genericName}</p>
                            <p className="text-sm text-gray-500">{medication.dosage}</p>
                            {medication.prescription && (
                              <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                Prescription Required
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">${medication.price}</p>
                            <p className={`text-xs font-semibold ${medication.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                              {medication.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleOrderMedication(medication)}
                          disabled={!medication.inStock}
                          className="w-full mt-3"
                        >
                          {!medication.inStock ? 'Out of Stock' : isInCart(medication.id) ? 'Remove from Cart' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Medical Equipment Tab */}
        {activeTab === 'equipment' && (
          <div className="p-4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/95 backdrop-blur-sm border border-pink-100/50 rounded-xl px-4 py-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 shadow-md"
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 text-lg"></i>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                )}
              </div>
            </div>
            {/* Equipment Categories */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Equipment Categories</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {equipmentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-md scale-105'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      <i className={`${category.icon} text-xl`}></i>
                    </div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Medical Equipment List */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {selectedCategory === 'all' ? 'All Medical Equipment' : equipmentCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="space-y-3">
                {filteredEquipment.map((equipment) => (
                  <Card key={equipment.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                            <p className="text-sm text-gray-600">{equipment.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Brand: {equipment.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">${equipment.price}</p>
                            <p className={`text-xs font-semibold ${equipment.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                              {equipment.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleOrderEquipment(equipment)}
                          disabled={!equipment.inStock}
                          className="w-full mt-3"
                        >
                          {!equipment.inStock ? 'Out of Stock' : isInCart(equipment.id) ? 'Remove from Cart' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">My Prescriptions</h2>
              <p className="text-sm text-gray-600">Manage your prescription medications</p>
            </div>
            
            <div className="space-y-3">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{prescription.medicationName}</h3>
                      <p className="text-sm text-gray-600">Prescribed by {prescription.doctorName}</p>
                      <p className="text-sm text-gray-500">{prescription.dosage}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{prescription.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Refills Left</p>
                      <p className="font-medium">{prescription.refillsLeft}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Expires</p>
                      <p className="font-medium">{prescription.expiryDate}</p>
                    </div>
                  </div>
                  
                  {prescription.status === 'active' && prescription.refillsLeft > 0 && (
                    <Button 
                      className="w-full mt-3"
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        setShowRefillModal(true);
                      }}
                    >
                      Order Refill
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Order History</h2>
              <p className="text-sm text-gray-600">Track your medication orders</p>
            </div>
            
            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                      <p className="text-sm text-gray-600">Ordered on {order.orderDate}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Items:</p>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-700">• {item}</p>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">${order.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Delivery Date</p>
                      <p className="font-medium">{order.deliveryDate}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-3"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowTrackOrderModal(true);
                    }}
                  >
                    Track Order
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && (selectedMedication || selectedEquipment) && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 transform transition-transform duration-300 pb-24 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {selectedMedication ? 'Order Medication' : 'Order Equipment'}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedMedication ? selectedMedication.image : selectedEquipment!.image}
                alt={selectedMedication ? selectedMedication.name : selectedEquipment!.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold">
                  {selectedMedication ? selectedMedication.name : selectedEquipment!.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedMedication ? selectedMedication.genericName : selectedEquipment!.description}
                </p>
                {selectedMedication && (
                  <p className="text-sm text-gray-500">{selectedMedication.dosage}</p>
                )}
                {selectedEquipment && (
                  <p className="text-xs text-gray-500">Brand: {selectedEquipment.brand}</p>
                )}
                <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ${selectedMedication ? selectedMedication.price : selectedEquipment!.price}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>
            
            <div className="border-t border-pink-100 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ${((selectedMedication ? selectedMedication.price : selectedEquipment!.price) * quantity).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button
              onClick={handlePlaceOrder}
              className="w-full"
            >
              Place Order
            </Button>
          </div>
        </div>
      )}

      {/* Refill Prescription Modal */}
      {showRefillModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-24 animate-slide-up overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Order Refill</h3>
              <button
                onClick={() => {
                  setShowRefillModal(false);
                  setSelectedPrescription(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedPrescription.medicationName}</h4>
                <p className="text-sm text-gray-600 mb-1">Prescribed by {selectedPrescription.doctorName}</p>
                <p className="text-sm text-gray-600 mb-1">Dosage: {selectedPrescription.dosage}</p>
                <p className="text-sm text-gray-600">Quantity: {selectedPrescription.quantity}</p>
                <div className="mt-3 pt-3 border-t border-pink-200">
                  <p className="text-xs text-gray-500">Refills Left: <span className="font-semibold text-pink-600">{selectedPrescription.refillsLeft}</span></p>
                </div>
              </Card>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  placeholder="Enter your delivery address..."
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300"
                />
              </div>

              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Estimated Cost</span>
                  <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">$24.50</span>
                </div>
                <p className="text-xs text-gray-500">Price may vary based on pharmacy</p>
              </div>

              <Button
                onClick={() => {
                  alert('Refill order placed successfully!');
                  setShowRefillModal(false);
                  setSelectedPrescription(null);
                }}
                className="w-full"
              >
                Confirm Refill Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-24 animate-slide-up overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Track Order</h3>
              <button
                onClick={() => {
                  setShowTrackOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Order {selectedOrder.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedOrder.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                    selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Ordered on {selectedOrder.orderDate}</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-pink-500"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-pink-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">${selectedOrder.total}</span>
                  </div>
                </div>
              </Card>

              {/* Tracking Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Order Status</h4>
                <div className="space-y-4">
                  {selectedOrder.status === 'delivered' && (
                    <>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">Delivered</p>
                          <p className="text-xs text-gray-600">Delivered on {selectedOrder.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">Shipped</p>
                          <p className="text-xs text-gray-600">Order shipped on {selectedOrder.orderDate}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-truck-line text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">Shipped</p>
                          <p className="text-xs text-gray-600">Order is on the way</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">Processing</p>
                          <p className="text-xs text-gray-600">Order confirmed on {selectedOrder.orderDate}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-loader-4-line text-white text-sm animate-spin"></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Processing</p>
                        <p className="text-xs text-gray-600">Your order is being prepared</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowTrackOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}