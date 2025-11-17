import React, { useState } from 'react';
import { CloseIcon, SuppliesIcon } from './Icons';
import { SupplyPoint } from '../types';
import { MOCK_SUPPLY_POINTS } from '../constants';

interface SupplyLogModalProps {
    onClose: () => void;
    onSubmit: (supplyPoint: SupplyPoint) => void;
}

const SupplyLogModal: React.FC<SupplyLogModalProps> = ({ onClose, onSubmit }) => {
    const [selectedPointId, setSelectedPointId] = useState<string>(MOCK_SUPPLY_POINTS[0].id.toString());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedPoint = MOCK_SUPPLY_POINTS.find(p => p.id.toString() === selectedPointId);
        if (!selectedPoint) {
            alert("Please select a valid supply point.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(selectedPoint);
            setIsSubmitting(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <SuppliesIcon className="text-brand-green" />
                        <h2 className="text-xl font-bold text-brand-green-dark">Log Kit Pick-up</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">Confirm where you picked up your Clean-Up Kit to earn 25 SP for your effort.</p>
                        
                        <div>
                            <label htmlFor="supply-point" className="block text-sm font-medium text-gray-700 mb-1">Select Supply Point</label>
                            <select 
                                id="supply-point" 
                                value={selectedPointId}
                                onChange={(e) => setSelectedPointId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green text-gray-900"
                            >
                                {MOCK_SUPPLY_POINTS.map(point => (
                                    <option key={point.id} value={point.id}>
                                        {point.name} - {point.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Logging...' : 'Log & Earn 25 SP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplyLogModal;