import React, { useState } from 'react';
import { Issue } from '../types';
import { CloseIcon, CalendarIcon, ClockIcon } from './Icons';

interface OrganizeEventModalProps {
    issue: Issue;
    onClose: () => void;
    onSubmit: (details: { date: string; time: string; volunteersNeeded: number; }) => void;
}

const OrganizeEventModal: React.FC<OrganizeEventModalProps> = ({ issue, onClose, onSubmit }) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [time, setTime] = useState('10:00');
    const [volunteersNeeded, setVolunteersNeeded] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network delay
        setTimeout(() => {
            onSubmit({ date, time, volunteersNeeded: Number(volunteersNeeded) });
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-blue-dark">Schedule a Clean-Up</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">You are organizing an event for: <span className="font-semibold">{issue.category}</span> at <span className="font-semibold">{issue.location}</span>.</p>
                        
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarIcon className="text-gray-400" />
                                </div>
                                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ClockIcon className="text-gray-400" />
                                </div>
                                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="volunteers" className="block text-sm font-medium text-gray-700 mb-1">Volunteers Needed</label>
                             <input type="number" id="volunteers" value={volunteersNeeded} onChange={(e) => setVolunteersNeeded(Number(e.target.value))} min="1" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900" required />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Scheduling...' : 'Schedule Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganizeEventModal;