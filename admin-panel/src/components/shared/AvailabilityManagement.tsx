import { useState } from 'react';
import { Clock, MapPin, Globe, Home, Monitor, Building2, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';

interface AvailabilityManagementProps {
    showOnlineToggle?: boolean;
    showPhysicalToggle?: boolean;
    showHomeToggle?: boolean;
    showServiceRadius?: boolean;
    showMultiCity?: boolean;
    showSlotCapacity?: boolean;
    showDeliverySettings?: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function AvailabilityManagement({
    showOnlineToggle = true,
    showPhysicalToggle = true,
    showHomeToggle = true,
    showServiceRadius = true,
    showMultiCity = false,
    showSlotCapacity = false,
    showDeliverySettings = false,
}: AvailabilityManagementProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Availability Management</h3>
                    <p className="text-gray-500 text-sm font-medium">Configure your working hours, locations, and service modes</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSaving ? <CheckCircle2 size={18} className="animate-bounce" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Schedule'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Service Modes */}
                <div className="space-y-6">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Service Modes</h4>
                        <div className="space-y-4">
                            {showOnlineToggle && <ToggleOption icon={Monitor} label="Online Consultation" description="Accept video & chat consults" defaultChecked={true} />}
                            {showPhysicalToggle && <ToggleOption icon={Building2} label="Physical Visit" description="Accept walk-ins & clinc visits" defaultChecked={true} />}
                            {showHomeToggle && <ToggleOption icon={Home} label="Home Visit" description="Provide services at patient's home" defaultChecked={false} />}
                            {showDeliverySettings && <ToggleOption icon={Home} label="Home Delivery" description="Deliver products to patient's address" defaultChecked={true} />}
                        </div>
                    </div>

                    {(showServiceRadius || showMultiCity) && (
                        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                            <h4 className="text-lg font-bold text-gray-900 mb-6">Location Settings</h4>
                            <div className="space-y-6">
                                {showServiceRadius && (
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3 ml-1">
                                            <MapPin size={12} className="text-primary" />
                                            Service Radius (KM)
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input type="range" min="1" max="50" defaultValue="15" className="flex-1 accent-primary" />
                                            <span className="text-sm font-bold text-gray-900 bg-white/50 px-3 py-1 rounded-lg border border-white">15 KM</span>
                                        </div>
                                    </div>
                                )}
                                {showMultiCity && (
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3 ml-1">
                                            <Globe size={12} className="text-primary" />
                                            Multi-City Practice
                                        </label>
                                        <button className="w-full py-3 bg-white/40 border border-white/60 rounded-2xl text-sm font-bold text-gray-700 hover:bg-white/60 transition-colors">
                                            + Add Practice City
                                        </button>
                                    </div>
                                )}
                                {showDeliverySettings && (
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3 ml-1">
                                            <MapPin size={12} className="text-primary" />
                                            Delivery Charges (Per KM)
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-gray-500 bg-white/50 px-3 py-2 rounded-xl border border-white">$</span>
                                            <input type="number" defaultValue="2" className="flex-1 px-4 py-2 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-lg font-bold text-gray-900">Working Days</h4>
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Clock size={20} />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {DAYS.map(day => {
                                const isSelected = selectedDays.includes(day);
                                return (
                                    <button
                                        key={day}
                                        onClick={() => toggleDay(day)}
                                        className={cn(
                                            "px-4 py-2.5 rounded-xl text-xs font-bold transition-all border",
                                            isSelected
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-white/40 text-gray-500 border-white/60 hover:bg-white/80"
                                        )}
                                    >
                                        {day.substring(0, 3)}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-4">
                            <h5 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1 mb-4">Time Slot Configuration</h5>
                            {selectedDays.map(day => (
                                <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white/40 border border-white/60 rounded-2xl">
                                    <span className="w-24 text-sm font-bold text-gray-900">{day}</span>
                                    <div className="flex-1 flex items-center gap-3">
                                        <input type="time" defaultValue="09:00" className="px-3 py-2 text-sm bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                        <span className="text-xs text-gray-400 font-bold">TO</span>
                                        <input type="time" defaultValue="17:00" className="px-3 py-2 text-sm bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                        {showSlotCapacity && (
                                            <input type="number" placeholder="Capacity" defaultValue="5" className="w-20 px-3 py-2 text-sm bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" title="Capacity per slot" />
                                        )}
                                    </div>
                                    <button className="text-xs font-bold text-rose-500 hover:text-rose-600 px-3 py-2 bg-rose-50 rounded-xl transition-colors">
                                        Clear
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToggleOption({ icon: Icon, label, description, defaultChecked }: any) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between p-4 bg-white/40 border border-white/60 rounded-2xl cursor-pointer hover:bg-white/60 transition-colors" onClick={() => setChecked(!checked)}>
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl transition-colors", checked ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400")}>
                    <Icon size={18} />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-gray-900">{label}</h5>
                    <p className="text-[10px] text-gray-500 font-medium">{description}</p>
                </div>
            </div>
            <div className={cn("w-10 h-6 rounded-full p-1 transition-colors relative", checked ? "bg-primary" : "bg-gray-200")}>
                <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{ x: checked ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );
}
