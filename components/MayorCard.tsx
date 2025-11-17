import React, { useState } from 'react';
import { MayorProfile } from '../types';
// FIX: Added missing icon imports
import { ChecklistIcon, ConstructionIcon } from './Icons';

interface MayorCardProps {
    mayor: MayorProfile;
}

const TabButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold border-b-2 transition-colors ${
            isActive
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-gray-500 hover:text-brand-blue'
        }`}
    >
        {icon}
        {label}
    </button>
);


const MayorCard: React.FC<MayorCardProps> = ({ mayor }) => {
    const [activeTab, setActiveTab] = useState<'promises' | 'works'>('promises');

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
            <div className="p-4 bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
                <img src={mayor.photoUrl} alt={mayor.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-brand-gray-dark">{mayor.name}</h2>
                    <p className="font-semibold text-brand-green">{mayor.city} Mayor</p>
                    <p className="text-sm text-gray-500">{mayor.term}</p>
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-600 italic text-center mb-4">"{mayor.bio}"</p>
                <div className="border-b border-gray-200 flex">
                    <TabButton 
                        label="Promises" 
                        icon={<ChecklistIcon />}
                        isActive={activeTab === 'promises'} 
                        onClick={() => setActiveTab('promises')} 
                    />
                    <TabButton 
                        label="Current Works" 
                        icon={<ConstructionIcon />}
                        isActive={activeTab === 'works'} 
                        onClick={() => setActiveTab('works')} 
                    />
                </div>
                <div className="pt-4">
                    {activeTab === 'promises' && (
                        <ul className="space-y-2">
                            {mayor.promises.map((promise, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="text-green-500 mt-1"><ChecklistIcon /></span>
                                    <span>{promise}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {activeTab === 'works' && (
                        <ul className="space-y-2">
                            {mayor.currentWorks.map((work, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="text-yellow-500 mt-1"><ConstructionIcon /></span>
                                    <span>{work}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MayorCard;