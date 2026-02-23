import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, Trash2, Home, Globe, MapPin, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../ui/Button';

interface TimeSlot {
    id: string;
    start: string;
    end: string;
}

interface WorkingDay {
    day: string;
    enabled: boolean;
    slots: TimeSlot[];
}

const INITIAL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({
    day,
    enabled: day !== 'Sunday',
    slots: [{ id: '1', start: '09:00', end: '17:00' }]
}));

export function AvailabilityManager() {
    const [workingDays, setWorkingDays] = useState<WorkingDay[]>(INITIAL_DAYS);
    const [activeServices, setActiveServices] = useState({
        homeVisit: true,
        onlineConsultation: true,
        physicalVisit: false
    });
    const [radius, setRadius] = useState(15);
    const [isSaving, setIsSaving] = useState(false);

    const toggleDay = (index: number) => {
        const newDays = [...workingDays];
        newDays[index].enabled = !newDays[index].enabled;
        setWorkingDays(newDays);
    };

    const addSlot = (dayIndex: number) => {
        const newDays = [...workingDays];
        newDays[dayIndex].slots.push({
            id: Math.random().toString(36).substr(2, 9),
            start: '09:00',
            end: '17:00'
        });
        setWorkingDays(newDays);
    };

    const removeSlot = (dayIndex: number, slotIndex: number) => {
        const newDays = [...workingDays];
        newDays[dayIndex].slots.splice(slotIndex, 1);
        setWorkingDays(newDays);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Availability Management</h3>
                    <p className="text-gray-500 text-sm font-medium">Configure your working hours and service availability</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSaving ? <CheckCircle2 size={18} className="animate-bounce" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Type Toggles */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Service Modes</h4>
                        <div className="space-y-4">
                            <ServiceToggle
                                label="Home Visit"
                                icon={Home}
                                enabled={activeServices.homeVisit}
                                onChange={() => setActiveServices({ ...activeServices, homeVisit: !activeServices.homeVisit })}
                            />
                            <ServiceToggle
                                label="Online Consultation"
                                icon={Globe}
                                enabled={activeServices.onlineConsultation}
                                onChange={() => setActiveServices({ ...activeServices, onlineConsultation: !activeServices.onlineConsultation })}
                            />
                            <ServiceToggle
                                label="Physical Visit"
                                icon={MapPin}
                                enabled={activeServices.physicalVisit}
                                onChange={() => setActiveServices({ ...activeServices, physicalVisit: !activeServices.physicalVisit })}
                            />
                        </div>

                        {activeServices.homeVisit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 pt-6 border-t border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-sm font-bold text-gray-700">Service Radius (KM)</h5>
                                    <span className="text-primary font-black">{radius} KM</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={radius}
                                    onChange={(e) => setRadius(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">1 KM</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">100 KM</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Working Days & Hours */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-8">Weekly Schedule</h4>
                        <div className="space-y-4">
                            {workingDays.map((day, dIdx) => (
                                <div key={day.day} className={cn(
                                    "p-4 rounded-2xl border transition-all duration-300",
                                    day.enabled ? "bg-white border-primary/10 shadow-sm" : "bg-gray-50/50 border-gray-100 opacity-60"
                                )}>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => toggleDay(dIdx)}
                                                className={cn(
                                                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                                                    day.enabled ? "bg-primary" : "bg-gray-300"
                                                )}
                                            >
                                                <motion.div
                                                    animate={{ x: day.enabled ? 24 : 4 }}
                                                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                                                />
                                            </button>
                                            <span className={cn("font-bold text-sm", day.enabled ? "text-gray-900" : "text-gray-400")}>{day.day}</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <AnimatePresence>
                                                {day.enabled && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        className="flex flex-wrap items-center gap-3"
                                                    >
                                                        {day.slots.map((slot, sIdx) => (
                                                            <div key={slot.id} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 group">
                                                                <Clock size={14} className="text-primary" />
                                                                <input
                                                                    type="time"
                                                                    value={slot.start}
                                                                    className="bg-transparent text-xs font-bold text-gray-700 outline-none w-16"
                                                                />
                                                                <span className="text-gray-300">—</span>
                                                                <input
                                                                    type="time"
                                                                    value={slot.end}
                                                                    className="bg-transparent text-xs font-bold text-gray-700 outline-none w-16"
                                                                />
                                                                {day.slots.length > 1 && (
                                                                    <button
                                                                        onClick={() => removeSlot(dIdx, sIdx)}
                                                                        className="ml-1 text-gray-300 hover:text-red-500 transition-colors"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => addSlot(dIdx)}
                                                            className="p-1.5 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {!day.enabled && <span className="text-xs text-gray-400 font-medium italic">Unavailable</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServiceToggle({ label, icon: Icon, enabled, onChange }: { label: string, icon: any, enabled: boolean, onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group",
                enabled
                    ? "bg-primary/[0.03] border-primary/20 shadow-sm"
                    : "bg-white border-gray-100 hover:border-gray-200"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "p-2.5 rounded-xl transition-all duration-300",
                    enabled ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-gray-100 text-gray-400 group-hover:text-primary"
                )}>
                    <Icon size={18} />
                </div>
                <span className={cn("text-sm font-bold transition-colors", enabled ? "text-gray-900" : "text-gray-500")}>{label}</span>
            </div>
            <div className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                enabled ? "bg-primary border-primary text-white" : "border-gray-200"
            )}>
                {enabled && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-white border-2 border-primary rounded-sm" />}
            </div>
        </button>
    );
}
