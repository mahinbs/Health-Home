import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Mic, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const conversations = [
    {
        id: 1,
        name: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        lastMessage: 'Thank you, Doctor. Does this look normal?',
        time: '10:23 AM',
        unread: 2,
        online: true
    },
    {
        id: 2,
        name: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        lastMessage: 'Appointment confirmed for tomorrow.',
        time: 'Yesterday',
        unread: 0,
        online: false
    },
    {
        id: 3,
        name: 'Dr. Emily Wilson',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
        lastMessage: 'Can we discuss the patient file?',
        time: 'Mon',
        unread: 0,
        online: true
    }
];

const messages = [
    {
        id: 1,
        sender: 'sarah',
        content: 'Hi Dr. Smith, I have been feeling a bit dizzy lately after taking the new medication.',
        time: '10:15 AM'
    },
    {
        id: 2,
        sender: 'me',
        content: 'Hello Sarah. I\'m sorry to hear that. When do these symptoms usually occur?',
        time: '10:18 AM'
    },
    {
        id: 3,
        sender: 'sarah',
        content: 'Usually about an hour after the morning dose. It lasts for 20 minutes.',
        time: '10:20 AM'
    },
    {
        id: 4,
        sender: 'sarah',
        content: 'I also noticed some redness on my arm.',
        time: '10:23 AM'
    }
];

export default function DoctorMessages() {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState('');

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="Search messages..." className="pl-9 bg-white" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-100 transition-colors text-left border-b border-gray-50 ${activeChat.id === chat.id ? 'bg-white border-l-4 border-l-primary-500 shadow-sm' : ''
                                }`}
                        >
                            <div className="relative">
                                <img src={chat.image} alt={chat.name} className="h-10 w-10 rounded-full object-cover" />
                                {chat.online && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className={`text-sm font-semibold truncate ${activeChat.id === chat.id ? 'text-primary-700' : 'text-gray-900'}`}>
                                        {chat.name}
                                    </p>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className={`text-xs truncate ${chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <span className="h-5 w-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                                    {chat.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <img src={activeChat.image} alt={activeChat.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            <Phone size={18} />
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            <Video size={18} />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <MoreVertical size={18} />
                        </Button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/30">
                    <div className="flex justify-center">
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">Today</span>
                    </div>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'me'
                                    ? 'bg-primary-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                }`}>
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-gray-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Paperclip size={20} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <ImageIcon size={20} />
                        </Button>
                        <div className="flex-1 relative">
                            <Input
                                placeholder="Type a message..."
                                className="pr-10 rounded-full border-gray-200 focus:border-primary-300"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
                                <Mic size={18} />
                            </button>
                        </div>
                        <Button className="rounded-full h-10 w-10 p-0 flex items-center justify-center">
                            <Send size={18} className="ml-0.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
