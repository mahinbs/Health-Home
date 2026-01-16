import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../base/Card';
import Button from '../base/Button';

interface ConnectionRequest {
  id: string;
  from: string;
  fromType: 'nurse' | 'gp' | 'consultant';
  to: string;
  toType: 'consultant' | 'nurse' | 'gp';
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

interface CommunityMessage {
  id: string;
  sender: string;
  senderType: 'nurse' | 'gp' | 'consultant';
  message: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export default function ConnectingFeature() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'connections' | 'community'>('connections');
  const [connectionType, setConnectionType] = useState<'nurse' | 'gp' | 'consultant' | null>(null);
  const [toType, setToType] = useState<'nurse' | 'gp' | 'consultant' | null>(null);
  const [message, setMessage] = useState('');
  const [communityMessage, setCommunityMessage] = useState('');

  const connections: ConnectionRequest[] = [
    {
      id: '1',
      from: 'Nurse Maria Rodriguez',
      fromType: 'nurse',
      to: 'Dr. Sarah Johnson',
      toType: 'consultant',
      message: 'Patient requires urgent consultation regarding post-surgery care',
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      from: 'Dr. James Wilson',
      fromType: 'gp',
      to: 'Dr. Michael Chen',
      toType: 'consultant',
      message: 'Need specialist opinion on complex dermatological case',
      status: 'accepted',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      from: 'Dr. Sarah Johnson',
      fromType: 'consultant',
      to: 'Dr. Emily Rodriguez',
      toType: 'consultant',
      message: 'Seeking second opinion on pediatric cardiology case',
      status: 'accepted',
      timestamp: '3 days ago'
    }
  ];

  const communityMessages: CommunityMessage[] = [
    {
      id: '1',
      sender: 'Dr. Sarah Johnson',
      senderType: 'consultant',
      message: 'Has anyone encountered cases of post-COVID cardiac complications in young adults? Would love to discuss treatment approaches.',
      timestamp: '5 hours ago',
      likes: 12,
      replies: 5
    },
    {
      id: '2',
      sender: 'Nurse Maria Rodriguez',
      senderType: 'nurse',
      message: 'Best practices for wound care management at home? Sharing some tips from recent cases.',
      timestamp: '1 day ago',
      likes: 8,
      replies: 3
    },
    {
      id: '3',
      sender: 'Dr. James Wilson',
      senderType: 'gp',
      message: 'Looking for recommendations on managing chronic pain in elderly patients. Any insights?',
      timestamp: '2 days ago',
      likes: 15,
      replies: 7
    }
  ];

  const handleCreateConnection = () => {
    if (!connectionType || !toType || !message.trim()) return;
    
    alert('Connection request sent successfully!');
    setShowModal(false);
    setConnectionType(null);
    setToType(null);
    setMessage('');
  };

  const handleSendCommunityMessage = () => {
    if (!communityMessage.trim()) return;
    
    alert('Message posted to community!');
    setCommunityMessage('');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Professional Connections</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowCommunityModal(true)}
            size="sm"
            variant="outline"
          >
            <i className="ri-group-line mr-1"></i>
            Community
          </Button>
          <Button
            onClick={() => setShowModal(true)}
            size="sm"
          >
            <i className="ri-add-line mr-1"></i>
            New Connection
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('connections')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'connections'
              ? 'bg-white text-pink-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          <i className="ri-user-line mr-1"></i>
          Connections
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'community'
              ? 'bg-white text-pink-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          <i className="ri-group-line mr-1"></i>
          Community
        </button>
      </div>

      {activeTab === 'connections' && (
        <div className="space-y-3">
          {connections.map((connection) => (
            <Card key={connection.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      connection.fromType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                      connection.fromType === 'gp' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {connection.fromType === 'nurse' ? 'Nurse' :
                       connection.fromType === 'gp' ? 'GP' : 'Consultant'}
                    </span>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      connection.toType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                      connection.toType === 'gp' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {connection.toType === 'nurse' ? 'Nurse' :
                       connection.toType === 'gp' ? 'GP' : 'Consultant'}
                    </span>
                  </div>
                  <p className="font-semibold text-sm text-gray-900">
                    {connection.from} → {connection.to}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{connection.message}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ml-2 ${
                  connection.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  connection.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {connection.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">{connection.timestamp}</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-3">
          {communityMessages.map((msg) => (
            <Card key={msg.id} className="p-4">
              <div className="flex items-start space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.senderType === 'nurse' ? 'bg-blue-100' :
                  msg.senderType === 'gp' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <i className={`${
                    msg.senderType === 'nurse' ? 'ri-nurse-line' :
                    msg.senderType === 'gp' ? 'ri-stethoscope-line' :
                    'ri-user-star-line'
                  } ${
                    msg.senderType === 'nurse' ? 'text-blue-600' :
                    msg.senderType === 'gp' ? 'text-green-600' :
                    'text-purple-600'
                  } text-sm`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{msg.sender}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      msg.senderType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                      msg.senderType === 'gp' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {msg.senderType === 'nurse' ? 'Nurse' :
                       msg.senderType === 'gp' ? 'GP' : 'Consultant'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-pink-600">
                      <i className="ri-heart-line"></i>
                      <span>{msg.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-pink-600">
                      <i className="ri-chat-3-line"></i>
                      <span>{msg.replies} replies</span>
                    </button>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Connection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Connection</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setConnectionType(null);
                  setMessage('');
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Connect From</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'nurse', label: 'Nursing Staff', icon: 'ri-nurse-line' },
                      { type: 'gp', label: 'General Practitioner', icon: 'ri-stethoscope-line' },
                      { type: 'consultant', label: 'Consultant', icon: 'ri-user-star-line' }
                    ].map((option) => (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => setConnectionType(option.type as any)}
                        className={`p-3 rounded-xl border ${
                          connectionType === option.type
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <i className={`${option.icon} text-xl mb-1`}></i>
                        <p className="text-xs">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Connect To</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'nurse', label: 'Nursing Staff', icon: 'ri-nurse-line' },
                      { type: 'gp', label: 'General Practitioner', icon: 'ri-stethoscope-line' },
                      { type: 'consultant', label: 'Consultant', icon: 'ri-user-star-line' }
                    ].map((option) => (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => setToType(option.type as any)}
                        className={`p-3 rounded-xl border ${
                          toType === option.type
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <i className={`${option.icon} text-xl mb-1`}></i>
                        <p className="text-xs">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe why you need to connect..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <Button
                  onClick={handleCreateConnection}
                  disabled={!connectionType || !toType || !message.trim()}
                  className="w-full"
                >
                  Send Connection Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Modal */}
      {showCommunityModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Community Messages</h2>
              <button
                onClick={() => {
                  setShowCommunityModal(false);
                  setCommunityMessage('');
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <div className="space-y-4 mb-4">
                {communityMessages.map((msg) => (
                  <Card key={msg.id} className="p-4">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.senderType === 'nurse' ? 'bg-blue-100' :
                        msg.senderType === 'gp' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        <i className={`${
                          msg.senderType === 'nurse' ? 'ri-nurse-line' :
                          msg.senderType === 'gp' ? 'ri-stethoscope-line' :
                          'ri-user-star-line'
                        } ${
                          msg.senderType === 'nurse' ? 'text-blue-600' :
                          msg.senderType === 'gp' ? 'text-green-600' :
                          'text-purple-600'
                        }`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-sm text-gray-900">{msg.sender}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            msg.senderType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                            msg.senderType === 'gp' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {msg.senderType === 'nurse' ? 'Nurse' :
                             msg.senderType === 'gp' ? 'GP' : 'Consultant'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-pink-600">
                            <i className="ri-heart-line"></i>
                            <span>{msg.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-pink-600">
                            <i className="ri-chat-3-line"></i>
                            <span>{msg.replies} replies</span>
                          </button>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium mb-2">Post a Message</label>
                <textarea
                  value={communityMessage}
                  onChange={(e) => setCommunityMessage(e.target.value)}
                  placeholder="Share your thoughts, ask questions, or provide insights..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3"
                />
                <Button
                  onClick={handleSendCommunityMessage}
                  disabled={!communityMessage.trim()}
                  className="w-full"
                >
                  Post to Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

