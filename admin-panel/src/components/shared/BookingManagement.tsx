import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle2, XCircle, Clock4, MessageCircle, Phone } from 'lucide-react';
import { cn } from '../ui/Button';

export type BookingStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface Booking {
    id: string;
    patientName: string;
    service: string;
    date: string;
    time: string;
    location: string;
    status: BookingStatus;
    amount: string;
}

interface BookingManagementProps {
    bookings: Booking[];
    onAccept?: (id: string) => void;
    onReject?: (id: string) => void;
    onViewDetails?: (id: string) => void;
}

const statusConfig = {
    pending: {
        icon: Clock4,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        label: 'Pending'
    },
    accepted: {
        icon: CheckCircle2,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        label: 'Accepted'
    },
    completed: {
        icon: CheckCircle2,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        label: 'Completed'
    },
    cancelled: {
        icon: XCircle,
        color: 'text-rose-500',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        label: 'Cancelled'
    }
};

export function BookingManagement({ bookings, onAccept, onReject, onViewDetails }: BookingManagementProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Booking Management</h3>
                    <p className="text-gray-500 text-sm font-medium">Manage your upcoming and past service requests</p>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-xl border border-white/20 backdrop-blur-sm self-start">
                    <button className="px-4 py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-primary">All Bookings</button>
                    <button className="px-4 py-2 text-xs font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">Upcoming</button>
                    <button className="px-4 py-2 text-xs font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">History</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking, index) => {
                    const status = statusConfig[booking.status];
                    const StatusIcon = status.icon;

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={booking.id}
                            className="group relative bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Background accent */}
                            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-10 transition-colors", status.bg)} />

                            <div className="flex flex-col lg:flex-row lg:items-center gap-6 relative z-10">
                                {/* Status Badge & Patient Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between sm:justify-start gap-3">
                                        <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", status.color, status.bg, status.border)}>
                                            <StatusIcon size={12} />
                                            {status.label}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">ID: {booking.id}</span>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                                            <User size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{booking.patientName}</h4>
                                            <p className="text-primary font-semibold text-sm">{booking.service}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Date</p>
                                            <p className="text-sm font-bold text-gray-900">{booking.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Time Slot</p>
                                            <p className="text-sm font-bold text-gray-900">{booking.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/60 sm:col-span-2">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Location</p>
                                            <p className="text-sm font-bold text-gray-900">{booking.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[160px]">
                                    <div className="text-center lg:text-right mb-2">
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Amount</p>
                                        <p className="text-xl font-black text-gray-900">{booking.amount}</p>
                                    </div>

                                    {booking.status === 'pending' ? (
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => onAccept?.(booking.id)}
                                                className="flex-1 bg-primary text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => onReject?.(booking.id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 w-full">
                                            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 text-xs font-bold py-3 px-4 rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
                                                <MessageCircle size={16} className="text-primary" />
                                                Chat
                                            </button>
                                            <button className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all border border-primary/10">
                                                <Phone size={18} />
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => onViewDetails?.(booking.id)}
                                        className="w-full text-xs font-bold text-gray-400 hover:text-primary transition-colors py-1"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Basic Cancellation Policy Settings */}
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm mt-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Clock4 size={20} className="text-primary" />
                            Cancellation Policy
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">Configure your default rules for booking cancellations</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2 ml-1">Free Cancellation Window</label>
                        <select className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                            <option>Up to 24 hours before</option>
                            <option>Up to 12 hours before</option>
                            <option>Up to 48 hours before</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2 ml-1">Late Cancellation Penalty</label>
                        <select className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                            <option>100% of Booking Fee</option>
                            <option>50% of Booking Fee</option>
                            <option>Fixed Amount ($20)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
