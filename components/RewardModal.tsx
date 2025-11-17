import React, { useState, useEffect } from 'react';
import { Reward } from '../types';
import { CloseIcon, GiftIcon } from './Icons';

interface RewardModalProps {
    onClose: () => void;
    onSubmit: (rewardData: Omit<Reward, 'id'> | Reward) => void;
    initialData?: Reward | null;
}

const RewardModal: React.FC<RewardModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        partner: '',
        cost: 100,
        imageUrl: '',
        rewardType: '',
        listingTier: 'Bronze' as 'Gold' | 'Silver' | 'Bronze',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                partner: initialData.partner,
                cost: initialData.cost,
                imageUrl: initialData.imageUrl,
                rewardType: initialData.rewardType || '',
                listingTier: initialData.listingTier || 'Bronze',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'cost' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            const submissionData: Omit<Reward, 'id'> = {
                title: formData.title,
                partner: formData.partner,
                cost: formData.cost,
                imageUrl: formData.imageUrl,
                rewardType: formData.rewardType === 'digital_wallet' ? 'digital_wallet' : undefined,
                listingTier: formData.listingTier,
            };

            if (initialData) {
                onSubmit({ ...submissionData, id: initialData.id });
            } else {
                onSubmit(submissionData);
            }
            setIsSubmitting(false);
        }, 500);
    };
    
    const isEditing = !!initialData;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <GiftIcon className="text-brand-green" />
                        <h2 className="text-xl font-bold text-brand-green-dark">{isEditing ? 'Edit Reward' : 'Add New Reward'}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" required />
                        </div>
                        <div>
                            <label htmlFor="partner" className="block text-sm font-medium text-gray-700">Partner</label>
                            <input type="text" name="partner" id="partner" value={formData.partner} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" required />
                        </div>
                         <div>
                            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost (SP)</label>
                            <input type="number" name="cost" id="cost" value={formData.cost} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" required min="0" />
                        </div>
                         <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="rewardType" className="block text-sm font-medium text-gray-700">Reward Type</label>
                                <select name="rewardType" id="rewardType" value={formData.rewardType} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green">
                                    <option value="">Standard Reward</option>
                                    <option value="digital_wallet">Digital Wallet</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="listingTier" className="block text-sm font-medium text-gray-700">Listing Tier</label>
                                <select name="listingTier" id="listingTier" value={formData.listingTier} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green">
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green-dark disabled:bg-gray-400">
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Reward')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RewardModal;