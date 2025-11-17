import React, { useState, useEffect } from 'react';
import { Ward } from '../types';
import { CloseIcon, GlobeAltIcon } from './Icons';

interface WardModalProps {
    onClose: () => void;
    onSubmit: (wardData: Omit<Ward, 'id'> | Ward) => void;
    initialData?: Ward | null;
}

const WardModal: React.FC<WardModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setIsSubmitting(true);
        setTimeout(() => {
            if (initialData) {
                onSubmit({ id: initialData.id, name });
            } else {
                onSubmit({ name });
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
                        <GlobeAltIcon className="text-brand-blue" />
                        <h2 className="text-xl font-bold text-brand-blue-dark">{isEditing ? 'Edit Ward' : 'Add New Ward'}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ward Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                            placeholder="e.g., Ward 1, Kathmandu"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400">
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Ward')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WardModal;