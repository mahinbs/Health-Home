import { motion } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp, Flag } from 'lucide-react';

export interface Review {
    id: string;
    patientName: string;
    rating: number;
    date: string;
    comment: string;
    service: string;
}

export function ReviewsRatings({ reviews, isAdmin = false }: { reviews: Review[], isAdmin?: boolean }) {
    const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
    const totalReviews = reviews.length;

    // Calculate star distribution
    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return { star, count, percentage: (count / totalReviews) * 100 };
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h3>
                    <p className="text-gray-500 text-sm font-medium">Monitor patient feedback and your service quality</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left - Summary Stats */}
                <div className="space-y-6">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                        <h4 className="text-6xl font-black text-gray-900 mb-2">{averageRating}</h4>
                        <div className="flex items-center gap-1 text-amber-500 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={24} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-gray-500">Based on {totalReviews} reviews</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-4">Rating Distribution</h4>
                        {distribution.map(dist => (
                            <div key={dist.star} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-12 text-gray-600 text-xs font-bold">
                                    <span>{dist.star}</span>
                                    <Star size={12} fill="currentColor" className="text-amber-500" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${dist.percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-right text-[10px] text-gray-400 font-bold">{dist.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Review List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between bg-white/40 p-2 rounded-2xl border border-white/40 backdrop-blur-md mb-2">
                        <div className="flex gap-1">
                            <button className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-gray-900 shadow-sm">All Reviews</button>
                            <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">5 Stars</button>
                            <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">Critical</button>
                        </div>
                        <select className="bg-transparent text-xs font-bold text-gray-500 outline-none pr-2 cursor-pointer">
                            <option>Newest First</option>
                            <option>Highest Rated</option>
                            <option>Lowest Rated</option>
                        </select>
                    </div>

                    {reviews.map((review, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={review.id}
                            className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm group hover:shadow-lg hover:shadow-primary/5 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-white flex items-center justify-center text-primary shadow-sm font-black text-lg">
                                        {review.patientName.charAt(0)}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900">{review.patientName}</h5>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{review.service}</span>
                                            <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">{review.comment}</p>

                            <div className="flex items-center gap-4 border-t border-white/40 pt-4">
                                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                                    <MessageSquare size={14} /> Reply
                                </button>
                                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-emerald-500 transition-colors">
                                    <ThumbsUp size={14} /> Helpful
                                </button>
                                {isAdmin ? (
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-rose-500 transition-colors ml-auto">
                                        <Flag size={14} /> Remove Review
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-rose-500 transition-colors ml-auto">
                                        <Flag size={14} /> Report
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
