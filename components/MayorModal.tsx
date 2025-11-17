import React, { useState, useEffect } from 'react';
import { MayorProfile } from '../types';
import { CloseIcon, GlobeAltIcon } from './Icons';

interface MayorModalProps {
    onClose: () => void;
    onSubmit: (mayorData: Omit<MayorProfile, 'id'> | MayorProfile) => void;
    initialData?: MayorProfile | null;
}

const MayorModal: React.FC<MayorModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        city: '',
        name: '',
        photoUrl: '',
        term: '',
        bio: '',
        promises: '',
        currentWorks: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                city: initialData.city,
                name: initialData.name,
                photoUrl: initialData.photoUrl,
                term: initialData.term,
                bio: initialData.bio,
                promises: initialData.promises.join('\n'),
                currentWorks: initialData.currentWorks.join('\n'),
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            const submissionData: Omit<MayorProfile, 'id'> = {
                ...formData,
                promises: formData.promises.split('\n').filter(p => p.trim() !== ''),
                currentWorks: formData.currentWorks.split('\n').filter(w => w.trim() !== ''),
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <GlobeAltIcon className="text-brand-blue" />
                        <h2 className="text-xl font-bold text-brand-blue-dark">{isEditing ? 'Edit City/Mayor' : 'Add New City/Mayor'}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-1">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City Name</label>
                            <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Mayor Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                         <div className="sm:col-span-2">
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Mayor Photo URL</label>
                            <input type="text" name="photoUrl" id="photoUrl" value={formData.photoUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                         <div className="sm:col-span-2">
                            <label htmlFor="term" className="block text-sm font-medium text-gray-700">Term</label>
                            <input type="text" name="term" id="term" value={formData.term} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="promises" className="block text-sm font-medium text-gray-700">Promises (one per line)</label>
                            <textarea name="promises" id="promises" value={formData.promises} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="currentWorks" className="block text-sm font-medium text-gray-700">Current Works (one per line)</label>
                            <textarea name="currentWorks" id="currentWorks" value={formData.currentWorks} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg sticky bottom-0">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400">
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add City')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MayorModal;