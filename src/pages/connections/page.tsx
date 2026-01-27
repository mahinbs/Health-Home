import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/feature/BottomNavigation';
import TopNavigation from '../../components/feature/TopNavigation';
import AdsBanner from '../../components/feature/AdsBanner';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

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

interface CommunityPost {
  id: string;
  sender: string;
  senderType: 'nurse' | 'gp' | 'consultant' | 'user';
  message: string;
  timestamp: string;
  likes: number;
  replies: number;
  liked: boolean;
  image?: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  sender: string;
  senderType: 'nurse' | 'gp' | 'consultant' | 'user';
  message: string;
  timestamp: string;
}

export default function ConnectionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'connections' | 'community'>('connections');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostForComment, setSelectedPostForComment] = useState<CommunityPost | null>(null);
  const [commentText, setCommentText] = useState('');
  const [newPostText, setNewPostText] = useState('');
  const [connectionType, setConnectionType] = useState<'nurse' | 'gp' | 'consultant' | null>(null);
  const [toType, setToType] = useState<'nurse' | 'gp' | 'consultant' | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');

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

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      sender: 'Dr. Sarah Johnson',
      senderType: 'consultant',
      message: 'Has anyone encountered cases of post-COVID cardiac complications in young adults? Would love to discuss treatment approaches.',
      timestamp: '5 hours ago',
      likes: 12,
      replies: 5,
      liked: false,
      comments: [
        {
          id: 'c1',
          sender: 'Dr. Michael Chen',
          senderType: 'consultant',
          message: 'Yes, I\'ve seen several cases. The key is early intervention with anti-inflammatory protocols.',
          timestamp: '4 hours ago'
        },
        {
          id: 'c2',
          sender: 'Nurse Maria Rodriguez',
          senderType: 'nurse',
          message: 'We\'ve been monitoring patients closely post-COVID. Regular follow-ups are crucial.',
          timestamp: '3 hours ago'
        }
      ]
    },
    {
      id: '2',
      sender: 'Nurse Maria Rodriguez',
      senderType: 'nurse',
      message: 'Best practices for wound care management at home? Sharing some tips from recent cases.',
      timestamp: '1 day ago',
      likes: 8,
      replies: 3,
      liked: false,
      comments: [
        {
          id: 'c3',
          sender: 'Dr. James Wilson',
          senderType: 'gp',
          message: 'Keep the wound clean and dry. Change dressings daily and watch for signs of infection.',
          timestamp: '23 hours ago'
        }
      ]
    },
    {
      id: '3',
      sender: 'Dr. James Wilson',
      senderType: 'gp',
      message: 'Looking for recommendations on managing chronic pain in elderly patients. Any insights?',
      timestamp: '2 days ago',
      likes: 15,
      replies: 7,
      liked: false,
      comments: []
    },
    {
      id: '4',
      sender: 'Dr. Emily Rodriguez',
      senderType: 'consultant',
      message: 'New research on pediatric nutrition and development. Here are some key findings...',
      timestamp: '3 days ago',
      likes: 20,
      replies: 10,
      liked: true,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80',
      comments: []
    }
  ]);

  const handleLike = (postId: string) => {
    setCommunityPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleAddComment = (postId: string) => {
    const post = communityPosts.find(p => p.id === postId);
    if (post) {
      setSelectedPostForComment(post);
      setShowCommentModal(true);
    }
  };

  const handleSubmitComment = () => {
    if (!commentText.trim() || !selectedPostForComment) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      sender: 'You',
      senderType: 'user',
      message: commentText.trim(),
      timestamp: 'Just now'
    };

    setCommunityPosts(posts =>
      posts.map(post =>
        post.id === selectedPostForComment.id
          ? {
              ...post,
              comments: [...(post.comments || []), newComment],
              replies: (post.replies || 0) + 1
            }
          : post
      )
    );

    setCommentText('');
    setShowCommentModal(false);
    setSelectedPostForComment(null);
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    
    const newPost: CommunityPost = {
      id: `p${Date.now()}`,
      sender: 'You',
      senderType: 'user',
      message: newPostText.trim(),
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
      liked: false,
      comments: []
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostText('');
  };

  const handleCreateConnection = () => {
    if (!connectionType || !toType || !connectionMessage.trim()) return;
    
    alert('Connection request sent successfully!');
    setShowConnectionModal(false);
    setConnectionType(null);
    setToType(null);
    setConnectionMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9]">
      <AdsBanner />
      <TopNavigation title="Professional Connections" />
      
      <div className="pt-[120px] sm:pt-[130px] md:pt-[140px] pb-24">
        {/* Header with Action Buttons */}
        <div className="px-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Professional Connections</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setActiveTab('community')}
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <i className="ri-group-line mr-1"></i>
                Community
              </Button>
              <Button
                onClick={() => setShowConnectionModal(true)}
                size="sm"
                className="w-full sm:w-auto"
              >
                <i className="ri-add-line mr-1"></i>
                New Connection
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
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
        </div>

        {activeTab === 'connections' && (
          <div className="px-4 space-y-3">
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
          <div className="px-4 space-y-4">
            {/* Create Post */}
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-3-fill text-pink-600"></i>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Share your thoughts, ask questions, or provide insights..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-pink-600">
                        <i className="ri-image-line text-lg"></i>
                      </button>
                      <button className="text-gray-500 hover:text-pink-600">
                        <i className="ri-file-line text-lg"></i>
                      </button>
                    </div>
                    <Button 
                      size="sm"
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Community Posts */}
            {communityPosts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    post.senderType === 'nurse' ? 'bg-blue-100' :
                    post.senderType === 'gp' ? 'bg-green-100' :
                    post.senderType === 'consultant' ? 'bg-purple-100' :
                    'bg-pink-100'
                  }`}>
                    <i className={`${
                      post.senderType === 'nurse' ? 'ri-nurse-line' :
                      post.senderType === 'gp' ? 'ri-stethoscope-line' :
                      post.senderType === 'consultant' ? 'ri-user-star-line' :
                      'ri-user-3-line'
                    } ${
                      post.senderType === 'nurse' ? 'text-blue-600' :
                      post.senderType === 'gp' ? 'text-green-600' :
                      post.senderType === 'consultant' ? 'text-purple-600' :
                      'text-pink-600'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-sm text-gray-900">{post.sender}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        post.senderType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                        post.senderType === 'gp' ? 'bg-green-100 text-green-700' :
                        post.senderType === 'consultant' ? 'bg-purple-100 text-purple-700' :
                        'bg-pink-100 text-pink-700'
                      }`}>
                        {post.senderType === 'nurse' ? 'Nurse' :
                         post.senderType === 'gp' ? 'GP' :
                         post.senderType === 'consultant' ? 'Consultant' : 'User'}
                      </span>
                      <span className="text-xs text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{post.message}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    <div className="flex items-center space-x-6 text-sm">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 ${
                          post.liked ? 'text-pink-600' : 'text-gray-500'
                        } hover:text-pink-600`}
                      >
                        <i className={post.liked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleAddComment(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-pink-600"
                      >
                        <i className="ri-chat-3-line"></i>
                        <span>{post.replies} comments</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-600">
                        <i className="ri-share-line"></i>
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Show Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Comments ({post.comments.length})</p>
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                comment.senderType === 'nurse' ? 'bg-blue-100' :
                                comment.senderType === 'gp' ? 'bg-green-100' :
                                comment.senderType === 'consultant' ? 'bg-purple-100' :
                                'bg-pink-100'
                              }`}>
                                <i className={`${
                                  comment.senderType === 'nurse' ? 'ri-nurse-line' :
                                  comment.senderType === 'gp' ? 'ri-stethoscope-line' :
                                  comment.senderType === 'consultant' ? 'ri-user-star-line' :
                                  'ri-user-3-line'
                                } ${
                                  comment.senderType === 'nurse' ? 'text-blue-600' :
                                  comment.senderType === 'gp' ? 'text-green-600' :
                                  comment.senderType === 'consultant' ? 'text-purple-600' :
                                  'text-pink-600'
                                } text-xs`}></i>
                              </div>
                              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <p className="font-semibold text-xs text-gray-900">{comment.sender}</p>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-700">{comment.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Connection Modal */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Connection</h2>
              <button
                onClick={() => {
                  setShowConnectionModal(false);
                  setConnectionType(null);
                  setToType(null);
                  setConnectionMessage('');
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
                    value={connectionMessage}
                    onChange={(e) => setConnectionMessage(e.target.value)}
                    placeholder="Describe why you need to connect..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <Button
                  onClick={handleCreateConnection}
                  disabled={!connectionType || !toType || !connectionMessage.trim()}
                  className="w-full"
                >
                  Send Connection Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && selectedPostForComment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in safe-area-inset">
          <div className="bg-white rounded-t-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col animate-slide-up">
            <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Comment</h2>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setCommentText('');
                  setSelectedPostForComment(null);
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              {/* Original Post */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="font-semibold text-sm text-gray-900">{selectedPostForComment.sender}</p>
                  <span className="text-xs text-gray-500">{selectedPostForComment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{selectedPostForComment.message}</p>
              </div>

              {/* Existing Comments */}
              {selectedPostForComment.comments && selectedPostForComment.comments.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Comments</h3>
                  <div className="space-y-3">
                    {selectedPostForComment.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          comment.senderType === 'nurse' ? 'bg-blue-100' :
                          comment.senderType === 'gp' ? 'bg-green-100' :
                          comment.senderType === 'consultant' ? 'bg-purple-100' :
                          'bg-pink-100'
                        }`}>
                          <i className={`${
                            comment.senderType === 'nurse' ? 'ri-nurse-line' :
                            comment.senderType === 'gp' ? 'ri-stethoscope-line' :
                            comment.senderType === 'consultant' ? 'ri-user-star-line' :
                            'ri-user-3-line'
                          } ${
                            comment.senderType === 'nurse' ? 'text-blue-600' :
                            comment.senderType === 'gp' ? 'text-green-600' :
                            comment.senderType === 'consultant' ? 'text-purple-600' :
                            'text-pink-600'
                          } text-xs`}></i>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-semibold text-xs text-gray-900">{comment.sender}</p>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-700">{comment.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Comment Form */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Comment</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="w-full"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
