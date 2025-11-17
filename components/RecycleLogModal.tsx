import React, { useState } from 'react';
import { CloseIcon, RecyclingIcon } from './Icons';
import { RecyclingMaterial } from '../types';

interface RecycleLogModalProps {
    onClose: () => void;
    onSubmit: (materials: RecyclingMaterial[]) => void;
}

const materialTypes: RecyclingMaterial[] = ['Plastics', 'Paper', 'Glass', 'Metals', 'E-Waste', 'Organic'];

const RecycleLogModal: React.FC<RecycleLogModalProps> = ({ onClose, onSubmit }) => {
    const [selectedMaterials, setSelectedMaterials] = useState<Set<RecyclingMaterial>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleToggleMaterial = (material: RecyclingMaterial) => {
        setSelectedMaterials(prev => {
            const newSet = new Set(prev);
            if (newSet.has(material)) {
                newSet.delete(material);
            } else {
                newSet.add(material);
            }
            return newSet;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMaterials.size === 0) {
            alert("Please select at least one material you recycled.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(Array.from(selectedMaterials));
            setIsSubmitting(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <RecyclingIcon className="text-brand-green" />
                        <h2 className="text-xl font-bold text-brand-green-dark">Log Your Drop-off</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">Select the materials you dropped off at a recycling center. You'll earn 75 SP for your effort!</p>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What did you recycle?</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {materialTypes.map(material => (
                                    <button
                                        key={material}
                                        type="button"
                                        onClick={() => handleToggleMaterial(material)}
                                        className={`p-3 text-center rounded-lg border-2 font-semibold transition-colors ${
                                            selectedMaterials.has(material)
                                                ? 'bg-brand-green-light border-brand-green text-brand-green-dark'
                                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-brand-green'
                                        }`}
                                    >
                                        {material}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting || selectedMaterials.size === 0} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Logging...' : 'Log & Earn 75 SP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecycleLogModal;