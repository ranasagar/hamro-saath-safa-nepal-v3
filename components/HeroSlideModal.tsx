import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../types';
import { CloseIcon, CampaignIcon } from './Icons';

interface HeroSlideModalProps {
    onClose: () => void;
    onSubmit: (slideData: Omit<HeroSlide, 'id'> | HeroSlide) => void;
    initialData?: HeroSlide | null;
}

const HeroSlideModal: React.FC<HeroSlideModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imageUrl: '',
        ctaText: '',
        ctaLink: '#',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <CampaignIcon className="text-brand-blue" />
                        <h2 className="text-xl font-bold text-brand-blue-dark">{isEditing ? 'Edit Hero Slide' : 'Add New Hero Slide'}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
                            <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                         <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Background Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700">Button Text</label>
                                <input type="text" name="ctaText" id="ctaText" value={formData.ctaText} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                            </div>
                            <div>
                                <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700">Button Link</label>
                                <input type="text" name="ctaLink" id="ctaLink" value={formData.ctaLink} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400">
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Slide')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeroSlideModal;
