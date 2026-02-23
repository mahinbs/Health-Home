import { useState } from 'react';
import { DollarSign, PlusCircle, Save, CheckCircle2, Edit2, Trash2, Tag, Activity, Clock, MapPin } from 'lucide-react';
import { cn } from '../ui/Button';

export interface ServiceItem {
    id: string;
    name: string;
    category: string;
    price: string;
    pricingType: 'Per Hour' | 'Per Visit' | 'Per Session' | 'Fixed';
    status: 'Active' | 'Inactive';
}

interface ServicePricingManagementProps {
    services: ServiceItem[];
    categories: string[];
    showEmergencyCharges?: boolean;
    showHomeVisitCharges?: boolean;
    showCityWisePricing?: boolean;
}

export function ServicePricingManagement({
    services: initialServices,
    categories,
    showEmergencyCharges = false,
    showHomeVisitCharges = false,
    showCityWisePricing = false
}: ServicePricingManagementProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [services] = useState(initialServices);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Services & Pricing</h3>
                    <p className="text-gray-500 text-sm font-medium">Manage your offered services and their pricing configurations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-2xl font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
                        <PlusCircle size={18} className="text-primary" />
                        Add Service
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isSaving ? <CheckCircle2 size={18} className="animate-bounce" /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column - Pricing Modifiers */}
                <div className="lg:col-span-1 space-y-6">
                    {(showEmergencyCharges || showHomeVisitCharges || showCityWisePricing) && (
                        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm">
                            <h4 className="text-md font-bold text-gray-900 mb-6">Pricing Modifiers</h4>
                            <div className="space-y-5">
                                {showEmergencyCharges && (
                                    <PricingModifierInput icon={Activity} label="Emergency Charges" defaultVal="50" unit="$" />
                                )}
                                {showHomeVisitCharges && (
                                    <PricingModifierInput icon={HomeIcon} label="Home Visit Base Fee" defaultVal="30" unit="$" />
                                )}
                                {showCityWisePricing && (
                                    <PricingModifierInput icon={MapPin} label="City Surcharge (NYC)" defaultVal="15" unit="%" />
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-md font-bold text-gray-900 mb-4">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat, i) => (
                                <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Service List */}
                <div className="lg:col-span-3">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-white/40 flex items-center justify-between">
                            <h4 className="text-lg font-bold text-gray-900">Active Services</h4>
                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                <span className="px-3 py-1 bg-white rounded-lg text-xs font-bold shadow-sm text-primary">List View</span>
                                <span className="px-3 py-1 rounded-lg text-xs font-bold text-gray-500">Grid View</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Service Name</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Pricing Logic</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Base Price</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20">
                                    {services.map((service, i) => (
                                        <tr key={i} className="hover:bg-white/40 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                    <Tag size={16} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{service.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-gray-500">{service.category}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg w-fit">
                                                    <Clock size={12} className="text-gray-400" />
                                                    {service.pricingType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-gray-900">${service.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                                                    service.status === 'Active' ? "bg-emerald-50 text-emerald-500" : "bg-gray-100 text-gray-400"
                                                )}>
                                                    {service.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PricingModifierInput({ icon: Icon, label, defaultVal, unit }: any) {
    return (
        <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2 ml-1">
                <Icon size={12} className="text-primary" />
                {label}
            </label>
            <div className="relative">
                {unit === '$' && <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
                <input
                    type="number"
                    defaultValue={defaultVal}
                    className={cn(
                        "w-full bg-white/40 border border-white/60 rounded-xl py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20",
                        unit === '$' ? "pl-9 pr-4" : "px-4"
                    )}
                />
                {unit !== '$' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">{unit}</span>}
            </div>
        </div>
    );
}

function HomeIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}
