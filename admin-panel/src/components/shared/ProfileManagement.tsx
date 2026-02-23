import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, CheckCircle2, Globe } from 'lucide-react';

import { UserRole } from '../../types/auth';

interface ProfileManagementProps {
    role?: UserRole;
}

export function ProfileManagement({ role }: ProfileManagementProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [profile] = useState({
        fullName: 'Dr. Sarah Johnson',
        email: 'sarah.j@healthhome.com',
        phone: '+1 (555) 000-1234',
        bio: 'Dedicated professional with over 10 years of experience in providing high-quality healthcare services.',
        experience: '10+ Years',
        address: '123 Medical Plaza, Suite 400',
        serviceArea: 'New York City, Brooklyn'
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Profile Management</h3>
                    <p className="text-gray-500 text-sm font-medium">Manage your professional identity and contact details</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSaving ? <CheckCircle2 size={18} className="animate-bounce" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Photo and Bio */}
                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 text-center shadow-sm">
                    <div className="relative inline-block mx-auto mb-6">
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 border-4 border-white shadow-xl flex items-center justify-center text-primary overflow-hidden">
                            <User size={64} fill="currentColor" fillOpacity={0.1} />
                        </div>
                        <button className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-primary text-white shadow-lg border-2 border-white hover:scale-110 transition-transform">
                            <Camera size={16} />
                        </button>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 leading-tight">{profile.fullName}</h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-wider mb-6">Verified Specialist</p>

                    <div className="text-left space-y-4">
                        <div>
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">Professional Bio</label>
                            <textarea
                                value={profile.bio}
                                rows={4}
                                className="w-full bg-white/40 border border-white/60 rounded-2xl p-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Tell patients about yourself..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle/Right Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-8">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProfileInput icon={User} label={role === UserRole.PHARMACY ? "Store Name" : "Full Name"} value={role === UserRole.PHARMACY ? "City Care Pharmacy" : profile.fullName} />
                        <ProfileInput icon={Mail} label="Email Address" value={profile.email} />
                        <ProfileInput icon={Phone} label="Contact Number" value={profile.phone} />
                        {role !== UserRole.PHARMACY && (
                            <ProfileInput icon={Briefcase} label="Experience Summary" value={profile.experience} />
                        )}
                        {role === UserRole.PHARMACY && (
                            <ProfileInput icon={User} label="Owner Name" value="John Smith" />
                        )}
                        {role === UserRole.DOCTOR && (
                            <>
                                <ProfileInput icon={Briefcase} label="Specialty & Sub-specialty" value="Cardiology, Electrophysiology" />
                                <ProfileInput icon={User} label="Hospital / Clinic Name" value="City General Hospital" />
                                <ProfileInput icon={Briefcase} label="Education Details" value="MD, MBBS" />
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-8">Location & Reach</h4>
                    <div className="space-y-6">
                        <ProfileInput icon={MapPin} label="Physical Address" value={profile.address} />
                        <div>
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3 ml-1">
                                <Globe size={12} className="text-primary" />
                                Service Area / Working Cities
                            </label>
                            <input
                                type="text"
                                value={profile.serviceArea}
                                className="w-full bg-white/40 border border-white/60 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="h-48 rounded-2xl bg-gray-100/50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <MapPin size={24} className="mx-auto mb-2 opacity-20" />
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Map Selection Placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileInput({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-1 ml-1">
                <Icon size={12} className="text-primary" />
                {label}
            </label>
            <input
                type="text"
                defaultValue={value}
                className="w-full bg-white/40 border border-white/60 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
        </div>
    );
}

