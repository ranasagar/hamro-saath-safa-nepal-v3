import React from 'react';
import { CloseIcon } from './Icons';
import { MicroAction } from '../types';
import { MOCK_MICRO_ACTIONS } from '../constants';

interface MicroActionsModalProps {
    onClose: () => void;
    onLogAction: (action: MicroAction) => void;
    actionsLeft: number;
}

const MicroActionsModal: React.FC<MicroActionsModalProps> = ({ onClose, onLogAction, actionsLeft }) => {
    
    const categories = Array.from(new Set(MOCK_MICRO_ACTIONS.map(a => a.category)));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-brand-blue-dark">Log a Quick Action</h2>
                        <p className="text-sm text-gray-500">You have <span className="font-bold text-brand-blue">{actionsLeft}</span> quick actions left today.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    {categories.map(category => (
                        <div key={category}>
                            <h3 className="font-semibold text-gray-700 mb-3">{category}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {MOCK_MICRO_ACTIONS.filter(a => a.category === category).map(action => (
                                    <button
                                        key={action.id}
                                        onClick={() => onLogAction(action)}
                                        disabled={actionsLeft <= 0}
                                        className="flex flex-col items-center justify-center p-4 text-center rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-brand-green hover:bg-brand-green-light/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-brand-gray-dark group-hover:text-brand-green transition-colors">
                                            {action.icon}
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800 mt-2">{action.name}</p>
                                        <p className="text-xs font-bold text-brand-green opacity-80">+{action.points} SP</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {actionsLeft <= 0 && (
                     <div className="p-4 text-center bg-yellow-100 text-yellow-800 font-semibold rounded-b-lg">
                        You've reached your daily limit. Great work today!
                    </div>
                )}
            </div>
        </div>
    );
};

export default MicroActionsModal;