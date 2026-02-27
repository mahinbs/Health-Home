import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    Phone,
    Plus,
    Trash2,
    Save,
    MapPin,
    Globe
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Availability() {
    const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    const [consultationTypes, setConsultationTypes] = useState({
        video: true,
        voice: true,
        physical: true
    });

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            <div className="space-y-2 text-center lg:text-left">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Availability Settings</h1>
                <p className="text-gray-500 font-medium">Configure your working hours and consultation preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Days & Types */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Working Days */}
                    <div className="bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-primary" />
                            Working Days
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {DAYS.map(day => (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedDays.includes(day) ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-white text-gray-400 border border-gray-100'}`}
                                >
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Consultation Types */}
                    <div className="bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Globe size={20} className="text-primary" />
                            Consultation Types
                        </h3>
                        <div className="space-y-4">
                            <TypeToggle
                                icon={Video}
                                label="Video Call"
                                active={consultationTypes.video}
                                onToggle={() => setConsultationTypes(prev => ({ ...prev, video: !prev.video }))}
                            />
                            <TypeToggle
                                icon={Phone}
                                label="Voice Call"
                                active={consultationTypes.voice}
                                onToggle={() => setConsultationTypes(prev => ({ ...prev, voice: !prev.voice }))}
                            />
                            <TypeToggle
                                icon={MapPin}
                                label="Physical Visit"
                                active={consultationTypes.physical}
                                onToggle={() => setConsultationTypes(prev => ({ ...prev, physical: !prev.physical }))}
                            />
                        </div>
                    </div>

                    {/* Service Radius */}
                    <div className="bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MapPin size={20} className="text-primary" />
                            Service Radius
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-gray-900">Coverage Area</span>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl font-black text-xs uppercase tracking-widest">
                                    15 KM
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                defaultValue="15"
                                className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                                Patients within 15km will see you as a "Home Visit" provider
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Time Slots */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/40 backdrop-blur-xl border border-gray-200 rounded-[40px] p-8 lg:p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Clock size={24} className="text-primary" />
                                Daily Time Slots
                            </h3>
                            <button className="p-3 rounded-2xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <SlotItem start="09:00 AM" end="12:00 PM" label="Morning Session" />
                            <SlotItem start="02:00 PM" end="05:00 PM" label="Afternoon Session" />
                            <SlotItem start="06:00 PM" end="09:00 PM" label="Evening Session" />
                        </div>

                        <div className="mt-10 pt-10 border-t border-gray-100 flex justify-end">
                            <Button onClick={() => toast.success("Availability updated successfully!")} className="h-14 px-12 rounded-2xl bg-black hover:bg-gray-900 text-white font-black text-sm tracking-widest uppercase shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-95">
                                Save Changes
                                <Save className="ml-2" size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypeToggle({ icon: Icon, label, active, onToggle }: any) {
    return (
        <div
            onClick={onToggle}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${active ? 'border-primary bg-primary/5' : 'border-gray-50 bg-gray-300'}`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                    <Icon size={18} />
                </div>
                <span className="font-bold text-sm text-gray-900">{label}</span>
            </div>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-white/40'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-5' : 'left-1'}`} />
            </div>
        </div>
    );
}

function SlotItem({ start, end, label }: { start: string, end: string, label: string }) {
    return (
        <div className="p-6 rounded-3xl bg-white border border-white hover:border-primary/20 hover:shadow-lg transition-all flex items-center justify-between group">
            <div className="flex items-center gap-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Start Time</p>
                    <p className="text-lg font-black text-gray-900 leading-none">{start}</p>
                </div>
                <div className="h-8 w-[1px] bg-gray-100" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">End Time</p>
                    <p className="text-lg font-black text-gray-900 leading-none">{end}</p>
                </div>
                <div className="hidden sm:block ml-4">
                    <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {label}
                    </span>
                </div>
            </div>
            <button className="p-2 text-gray-300 hover:text-rose-500 transition-colors">
                <Trash2 size={18} />
            </button>
        </div>
    );
}
