import React, { useState } from 'react';
import { Reward } from '../types';
import { CloseIcon, WalletIcon } from './Icons';

interface WalletRedemptionModalProps {
    reward: Reward;
    onClose: () => void;
    onSubmit: (walletId: string) => void;
}

const WalletRedemptionModal: React.FC<WalletRedemptionModalProps> = ({ reward, onClose, onSubmit }) => {
    const [walletId, setWalletId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (walletId.trim().length < 10) {
            alert("Please enter a valid eSewa/Khalti phone number.");
            return;
        }
        setIsSubmitting(true);
        // Simulate network delay
        setTimeout(() => {
            onSubmit(walletId);
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-blue-dark">Digital Wallet Redemption</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">You are redeeming <span className="font-semibold">{reward.title}</span> for <span className="font-semibold">{reward.cost.toLocaleString()} SP</span>.</p>
                        
                        <div>
                            <label htmlFor="walletId" className="block text-sm font-medium text-gray-700 mb-1">Your eSewa / Khalti ID (Phone Number)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <WalletIcon className="text-gray-400" />
                                </div>
                                <input 
                                    type="tel" 
                                    id="walletId" 
                                    value={walletId} 
                                    onChange={(e) => setWalletId(e.target.value)} 
                                    placeholder="e.g., 98XXXXXXXX"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900" 
                                    required 
                                />
                            </div>
                             <p className="text-xs text-gray-500 mt-1">Your cashback will be processed within 24 hours.</p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting || !walletId} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Processing...' : 'Confirm Redemption'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WalletRedemptionModal;