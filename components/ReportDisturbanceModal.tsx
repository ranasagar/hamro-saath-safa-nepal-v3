import React, { useState, useEffect } from 'react';
import { DisturbanceCategory, DisturbanceImpact } from '../types';
import { CloseIcon, WarningIcon } from './Icons';

interface ReportDisturbanceModalProps {
    onClose: () => void;
    onSubmit: (data: { category: DisturbanceCategory; impacts: DisturbanceImpact[]; }) => void;
}

const disturbanceCategories: DisturbanceCategory[] = Object.values(DisturbanceCategory);
const disturbanceImpacts: DisturbanceImpact[] = ['Noise Pollution', 'Traffic Blockage', 'Unsafe Atmosphere', 'Unsolicited Promotion'];

const ReportDisturbanceModal: React.FC<ReportDisturbanceModalProps> = ({ onClose, onSubmit }) => {
    const [category, setCategory] = useState<DisturbanceCategory>(DisturbanceCategory.PoliticalRally);
    const [selectedImpacts, setSelectedImpacts] = useState<Set<DisturbanceImpact>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationStatus, setLocationStatus] = useState('Fetching location...');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            () => setLocationStatus('Location acquired for verification.'),
            () => setLocationStatus('Could not get location. Report will be approximate.')
        );
    }, []);

    const handleImpactToggle = (impact: DisturbanceImpact) => {
        setSelectedImpacts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(impact)) {
                newSet.delete(impact);
            } else {
                newSet.add(impact);
            }
            return newSet;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedImpacts.size === 0) {
            alert("Please select at least one impact of the disturbance.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit({ category, impacts: Array.from(selectedImpacts) });
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <WarningIcon className="text-amber-500 w-6 h-6" />
                        <h2 className="text-xl font-bold text-amber-600">Report a Disturbance</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">Report events that affect community peace. Your report will be verified by other users before an alert is created.</p>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as DisturbanceCategory)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-900">
                                {disturbanceCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What is the impact?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {disturbanceImpacts.map(impact => (
                                    <button
                                        key={impact}
                                        type="button"
                                        onClick={() => handleImpactToggle(impact)}
                                        className={`p-3 text-center rounded-lg border-2 font-semibold transition-colors text-sm ${
                                            selectedImpacts.has(impact)
                                                ? 'bg-amber-100 border-amber-500 text-amber-800'
                                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-400'
                                        }`}
                                    >
                                        {impact}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-center text-gray-500">{locationStatus}</p>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={selectedImpacts.size === 0 || isSubmitting} className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportDisturbanceModal;