import { useState, useEffect } from 'react';
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    PhoneOff,
    MessageSquare,
    User,
    Maximize2,
    Settings,
    Shield,
    Clock,
    Heart
} from 'lucide-react';
import { toast } from 'sonner';

export default function ActiveConsultation() {
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans">
            {/* Top Bar */}
            <div className="p-6 flex items-center justify-between text-white backdrop-blur-md bg-black/40 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Heart className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Video Consultation</h2>
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                            <Shield size={12} />
                            End-to-End Encrypted
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-black text-sm tabular-nums">
                        <Clock size={16} className="text-primary" />
                        {formatTime(timer)}
                    </div>
                    <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors">
                        <Settings size={22} />
                    </button>
                </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 relative p-6 flex gap-6 overflow-hidden">
                {/* Main View (Patient) */}
                <div className="flex-1 relative rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl group">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2000&h=2000"
                        alt="Patient"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-10 left-10 text-white">
                        <h3 className="text-2xl font-black tracking-tight">Sarah Johnson</h3>
                        <p className="text-sm font-medium text-white/60">London, UK</p>
                    </div>
                </div>

                {/* Side Bar (Self View & Chat) */}
                <div className="w-[400px] flex flex-col gap-6">
                    {/* Self View */}
                    <div className="h-[240px] relative rounded-[32px] overflow-hidden bg-gray-800 border-2 border-white/10 shadow-xl">
                        {isVideoOn ? (
                            <img
                                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800&h=600"
                                alt="Self"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/20">
                                <VideoOff size={48} />
                                <span className="text-xs font-black uppercase tracking-widest">Video Off</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 backdrop-blur-md text-white">
                            <Maximize2 size={16} />
                        </div>
                    </div>

                    {/* Chat Panel Mockup */}
                    <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col shadow-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageSquare size={18} className="text-primary" />
                            <h4 className="font-bold text-white text-sm">Consultation Chat</h4>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
                            <ChatMessage
                                text="Hello Doctor, I've been feeling a bit dizzy lately."
                                sender="Sarah"
                                time="10:02 AM"
                            />
                            <ChatMessage
                                text="I see. Any other symptoms like nausea?"
                                sender="Me"
                                isMe
                                time="10:03 AM"
                            />
                        </div>
                        <div className="mt-6 flex gap-2">
                            <input
                                type="text"
                                placeholder="Typing message..."
                                className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20"
                            />
                            <button className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all">
                                <MessageSquare size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="p-10 flex items-center justify-center gap-6 relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <ControlButton
                    icon={isMicOn ? Mic : MicOff}
                    active={isMicOn}
                    onClick={() => setIsMicOn(!isMicOn)}
                    danger={!isMicOn}
                />
                <ControlButton
                    icon={isVideoOn ? Video : VideoOff}
                    active={isVideoOn}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    danger={!isVideoOn}
                />
                <button
                    onClick={() => {
                        toast.error("Consultation ended");
                        window.history.back();
                    }}
                    className="h-20 w-20 rounded-[28px] bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/40 hover:scale-110 active:scale-90 transition-all duration-300"
                >
                    <PhoneOff size={32} />
                </button>
                <ControlButton icon={User} />
                <ControlButton icon={MessageSquare} />
            </div>
        </div>
    );
}

function ControlButton({ icon: Icon, active = false, onClick, danger = false }: any) {
    return (
        <button
            onClick={onClick}
            className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${danger ? 'bg-rose-500/20 text-rose-500 border border-rose-500/50' : active ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}
        >
            <Icon size={24} />
        </button>
    );
}

function ChatMessage({ text, sender, time, isMe = false }: any) {
    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[90%] ${isMe ? 'bg-primary text-white' : 'bg-white/10 text-white border border-white/10'}`}>
                <p className="text-sm font-medium leading-relaxed">{text}</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2 px-1">{sender} • {time}</span>
        </div>
    );
}
