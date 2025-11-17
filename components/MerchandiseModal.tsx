import React, { useState, useEffect } from 'react';
import { MerchandiseItem } from '../types';
import { CloseIcon, TshirtIcon } from './Icons';

interface MerchandiseModalProps {
    onClose: () => void;
    onSubmit: (itemData: Omit<MerchandiseItem, 'id'> | MerchandiseItem) => void;
    initialData?: MerchandiseItem | null;
}

const MerchandiseModal: React.FC<MerchandiseModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceNPR: 100,
        imageUrl: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                priceNPR: initialData.priceNPR,
                imageUrl: initialData.imageUrl,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'priceNPR' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            if (initialData) {
                onSubmit({ ...formData, id: initialData.id });
            } else {
                onSubmit(formData);
            }
            setIsSubmitting(false);
        }, 500);
    };
    
    const isEditing = !!initialData;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <TshirtIcon className="text-brand-blue" />
                        <h2 className="text-xl font-bold text-brand-blue-dark">{isEditing ? 'Edit Merchandise' : 'Add New Merchandise'}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={2} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                         <div>
                            <label htmlFor="priceNPR" className="block text-sm font-medium text-gray-700">Price (NPR)</label>
                            <input type="number" name="priceNPR" id="priceNPR" value={formData.priceNPR} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required min="0" />
                        </div>
                         <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400">
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Item')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MerchandiseModal;
