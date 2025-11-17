import React, { useState } from 'react';
import { MerchandiseItem, MerchandiseReview, UserRank } from '../types';
import { CloseIcon, StarIcon, StarSolidIcon, ForumIcon } from './Icons';

interface MerchandiseDetailModalProps {
    item: MerchandiseItem;
    currentUser: UserRank;
    onClose: () => void;
    onBuyNow: (item: MerchandiseItem) => void;
    onReviewSubmit: (itemId: number, rating: number, comment: string) => void;
    onDiscuss: (item: MerchandiseItem) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            i < rating ? <StarSolidIcon key={i} className="w-4 h-4 text-amber-400" /> : <StarIcon key={i} className="w-4 h-4 text-gray-300" />
        ))}
    </div>
);

const ReviewForm: React.FC<{ onSubmit: (rating: number, comment: string) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a star rating.");
            return;
        }
        onSubmit(rating, comment);
        setRating(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold mb-2">Leave a Review</h4>
            <div className="flex items-center mb-2" onMouseLeave={() => setHoverRating(0)}>
                {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                        <button
                            type="button"
                            key={i}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHoverRating(ratingValue)}
                            className="text-2xl"
                        >
                            {ratingValue <= (hoverRating || rating) ? (
                                <StarSolidIcon className="w-6 h-6 text-amber-400" />
                            ) : (
                                <StarIcon className="w-6 h-6 text-gray-300" />
                            )}
                        </button>
                    );
                })}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
            ></textarea>
            <button type="submit" className="w-full mt-2 bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors">
                Submit Review
            </button>
        </form>
    );
};


const MerchandiseDetailModal: React.FC<MerchandiseDetailModalProps> = ({ item, currentUser, onClose, onBuyNow, onReviewSubmit, onDiscuss }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const averageRating = item.reviews.length > 0
        ? item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length
        : 0;
        
    const hasPurchased = currentUser.purchaseHistory.some(p => p.rewardTitle === item.title && p.status === 'confirmed');
    const hasReviewed = item.reviews.some(r => r.userName === currentUser.name);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4" onClick={onClose}>
            <div className="relative w-full max-w-sm h-[80vh] max-h-[700px]" style={{ perspective: '1000px' }} onClick={(e) => e.stopPropagation()}>
                <div 
                    className="relative w-full h-full transition-transform duration-700" 
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* Front Side */}
                    <div className="absolute w-full h-full bg-white rounded-lg shadow-xl flex flex-col overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="relative">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
                             <button onClick={onClose} className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 flex flex-col flex-grow overflow-y-auto">
                            <h2 className="text-2xl font-bold text-brand-gray-dark">{item.title}</h2>
                            <p className="text-gray-500 my-2">{item.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <StarRating rating={averageRating} />
                                <span className="text-sm text-gray-500">({item.reviews.length} reviews)</span>
                            </div>
                        </div>
                        <div className="p-4 mt-auto border-t bg-gray-50 space-y-2">
                            <div className="flex gap-2">
                                <button onClick={() => setIsFlipped(true)} className="w-full text-brand-blue font-semibold py-2 rounded-lg hover:bg-blue-100 transition-colors border border-brand-blue/30">
                                    View Reviews
                                </button>
                                <button onClick={() => onDiscuss(item)} className="flex-shrink-0 text-brand-blue font-semibold p-2 rounded-lg hover:bg-blue-100 transition-colors border border-brand-blue/30" title="Discuss this item">
                                    <ForumIcon className="w-6 h-6"/>
                                </button>
                            </div>
                            <button onClick={() => onBuyNow(item)} className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition-colors">
                                Buy Now for Rs. {item.priceNPR.toLocaleString()}
                            </button>
                        </div>
                    </div>

                    {/* Back Side (Reviews) */}
                     <div className="absolute w-full h-full bg-white rounded-lg shadow-xl flex flex-col overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
                             <h2 className="text-xl font-bold text-brand-gray-dark">Reviews for {item.title}</h2>
                             <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                         <div className="p-4 flex-grow overflow-y-auto space-y-4">
                            {item.reviews.length > 0 ? (
                                item.reviews.map(review => (
                                    <div key={review.id} className="flex items-start gap-3 border-b pb-3">
                                        <img src={review.userAvatar} alt={review.userName} className="w-8 h-8 rounded-full" />
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">{review.userName}</p>
                                                <StarRating rating={review.rating} />
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">No reviews yet. Be the first!</p>
                            )}
                            {hasPurchased && !hasReviewed && <ReviewForm onSubmit={(rating, comment) => onReviewSubmit(item.id, rating, comment)} />}
                            {hasPurchased && hasReviewed && <p className="text-center text-green-600 font-semibold p-3 bg-green-50 rounded-md">Thanks for your review!</p>}
                            {!hasPurchased && <p className="text-center text-gray-500 p-3 bg-gray-50 rounded-md text-sm">You must purchase this item to leave a review.</p>}
                        </div>
                         <div className="p-4 mt-auto border-t bg-gray-50">
                            <button onClick={() => setIsFlipped(false)} className="w-full text-brand-blue font-semibold py-2 rounded-lg hover:bg-blue-100 transition-colors">
                                &larr; Back to Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchandiseDetailModal;