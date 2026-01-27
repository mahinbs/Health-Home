import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

interface ConnectionPost {
  id: string;
  sender: string;
  senderType: 'nurse' | 'gp' | 'consultant';
  message: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export default function ProfessionalConnectionsPreview() {
  const navigate = useNavigate();
  
  const recentPosts: ConnectionPost[] = [
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

  return (
    <div className="px-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Professional Connections</h2>
          <Button
            onClick={() => navigate('/connections')}
            size="sm"
            variant="outline"
            className="text-xs sm:text-sm"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              onClick={() => navigate('/connections')}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  post.senderType === 'nurse' ? 'bg-blue-100' :
                  post.senderType === 'gp' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <i className={`${
                    post.senderType === 'nurse' ? 'ri-nurse-line' :
                    post.senderType === 'gp' ? 'ri-stethoscope-line' :
                    'ri-user-star-line'
                  } ${
                    post.senderType === 'nurse' ? 'text-blue-600' :
                    post.senderType === 'gp' ? 'text-green-600' :
                    'text-purple-600'
                  } text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{post.sender}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                      post.senderType === 'nurse' ? 'bg-blue-100 text-blue-700' :
                      post.senderType === 'gp' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {post.senderType === 'nurse' ? 'Nurse' :
                       post.senderType === 'gp' ? 'GP' : 'Consultant'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">{post.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <i className="ri-heart-line"></i>
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="ri-chat-3-line"></i>
                      <span>{post.replies} replies</span>
                    </span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
