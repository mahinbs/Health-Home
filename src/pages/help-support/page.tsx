
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/feature/TopNavigation';
import BottomNavigation from '../../components/feature/BottomNavigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export default function HelpSupport() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: 'ri-question-line' },
    { id: 'consultation', name: 'Consultations', icon: 'ri-video-line' },
    { id: 'pharmacy', name: 'Pharmacy', icon: 'ri-medicine-bottle-line' },
    { id: 'homecare', name: 'Homecare', icon: 'ri-heart-pulse-line' },
    { id: 'account', name: 'Account', icon: 'ri-user-line' },
    { id: 'payment', name: 'Payments', icon: 'ri-wallet-line' }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I book a consultation?',
      answer: 'You can book a consultation by going to the Consult page, selecting a specialty, choosing a doctor, and clicking "Book Now". Fill in the required details and confirm your booking.',
      category: 'consultation'
    },
    {
      id: '2',
      question: 'How do I track my pharmacy order?',
      answer: 'Go to the Pharmacy page, click on the Orders tab, and select your order. You can view the real-time status of your order including processing, shipped, and delivered stages.',
      category: 'pharmacy'
    },
    {
      id: '3',
      question: 'What payment methods are accepted?',
      answer: 'We accept Credit/Debit Cards, UPI, and Cash on Delivery for pharmacy orders. Consultations and homecare services can be paid via Card or UPI.',
      category: 'payment'
    },
    {
      id: '4',
      question: 'How do I cancel a homecare booking?',
      answer: 'Go to My Homecare Requests in your profile, select the booking you want to cancel, and click the Cancel button. Cancellations made 24 hours before the scheduled time are free.',
      category: 'homecare'
    },
    {
      id: '5',
      question: 'How do I update my profile information?',
      answer: 'Go to your Profile page and click "Edit Profile". You can update your name, email, phone number, address, and other personal information.',
      category: 'account'
    },
    {
      id: '6',
      question: 'What are health credits and how do I earn them?',
      answer: 'Health credits are rewards you earn by completing health activities like consultations, taking medications on time, reaching step goals, and logging health metrics. These credits can be used for discounts on services.',
      category: 'account'
    },
    {
      id: '7',
      question: 'How do I access my health records?',
      answer: 'Go to your Profile and click on "My Health Locker" or navigate to the Records page. You can view, download, and share your prescriptions, lab reports, and medical records.',
      category: 'account'
    },
    {
      id: '8',
      question: 'Can I reschedule a consultation?',
      answer: 'Yes, you can reschedule consultations up to 2 hours before the scheduled time. Go to My Consultations, select the appointment, and click Reschedule.',
      category: 'consultation'
    }
  ];

  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const supportOptions: SupportOption[] = [
    {
      id: 'chat',
      title: 'Chat with Support',
      description: 'Get instant help from our support team',
      icon: 'ri-message-3-line',
      action: () => {
        alert('Opening chat support...');
      }
    },
    {
      id: 'call',
      title: 'Call Support',
      description: 'Speak with our support team',
      icon: 'ri-phone-line',
      action: () => {
        window.location.href = 'tel:+18001234567';
      }
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us an email',
      icon: 'ri-mail-line',
      action: () => {
        window.location.href = 'mailto:support@healthhome.com';
      }
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      description: 'Share your thoughts and suggestions',
      icon: 'ri-feedback-line',
      action: () => {
        alert('Opening feedback form...');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Help & Support" showCart={true} />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-20 sm:pb-24 px-4">
        {/* Support Options */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Get Help</h2>
          <div className="grid grid-cols-2 gap-3">
            {supportOptions.map((option, index) => (
              <Card
                key={option.id}
                className="p-4 cursor-pointer animate-scale-in"
                onClick={option.action}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <i className={`${option.icon} text-pink-600 text-xl`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{option.title}</h3>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                    : 'bg-white/95 text-gray-600 hover:bg-pink-50'
                }`}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <Card className="p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <i className="ri-question-line text-3xl text-pink-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </Card>
          ) : (
            filteredFAQs.map((faq, index) => (
              <Card
                key={faq.id}
                className="p-4 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      {expandedFAQ === faq.id && (
                        <p className="text-sm text-gray-600 leading-relaxed animate-fade-in">{faq.answer}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <i className={`ri-arrow-${expandedFAQ === faq.id ? 'up' : 'down'}-s-line text-pink-600 text-xl`}></i>
                    </div>
                  </div>
                </button>
              </Card>
            ))
          )}
        </div>

        {/* Emergency Contact */}
        <Card className="p-5 mt-6 bg-gradient-to-br from-red-50 to-rose-50 border-red-200/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <i className="ri-alarm-warning-line text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 text-sm mb-1">Emergency Support</h3>
              <p className="text-red-600 text-xs mb-3">Need immediate assistance?</p>
              <Button
                onClick={() => window.location.href = 'tel:911'}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm py-2 px-4"
              >
                <i className="ri-phone-fill mr-2"></i>
                Call Emergency
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}

