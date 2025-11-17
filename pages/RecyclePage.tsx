import React, { useState, useMemo } from 'react';
import { MOCK_RECYCLING_CENTERS, COMMUNITY_GOAL_KG, COMMUNITY_PROGRESS_KG } from '../constants';
import { RecyclingCenter, RecyclingMaterial } from '../types';
import RecycleLogModal from '../components/RecycleLogModal';
import { RecyclingIcon, LocationPinIcon } from '../components/Icons';

interface RecyclePageProps {
  onLogRecycle: (materials: RecyclingMaterial[]) => void;
}

const materialTypes: RecyclingMaterial[] = ['Plastics', 'Paper', 'Glass', 'Metals', 'E-Waste', 'Organic'];

const RecyclePage: React.FC<RecyclePageProps> = ({ onLogRecycle }) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<RecyclingMaterial | 'All'>('All');
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);

  const filteredCenters = useMemo(() => {
    if (selectedFilter === 'All') {
      return MOCK_RECYCLING_CENTERS;
    }
    return MOCK_RECYCLING_CENTERS.filter(center => center.accepts.includes(selectedFilter));
  }, [selectedFilter]);
  
  // Bounding box for Kathmandu Valley mock coordinates
  const minLat = 27.670, maxLat = 27.730;
  const minLng = 85.270, maxLng = 85.370; // Adjusted lng range to fit all points
  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;

  const getCoordinates = (center: RecyclingCenter) => {
    const x = ((center.coordinates.lng - minLng) / lngRange) * 100;
    const y = ((maxLat - center.coordinates.lat) / latRange) * 100;
    return { x, y };
  };

  const handleSelectCenter = (center: RecyclingCenter) => {
    setSelectedCenter(center);
    const element = document.getElementById(`recycle-center-${center.id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };


  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                <RecyclingIcon />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-brand-gray-dark">Safa Recycle Hub</h2>
              <p className="text-gray-600 text-sm">Find centers and earn points for recycling.</p>
            </div>
      </div>

      {/* Community Goal */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-bold text-lg text-brand-green-dark mb-2">This Month's Community Goal</h3>
        <p className="text-sm text-gray-600 mb-2">Let's collectively recycle {COMMUNITY_GOAL_KG.toLocaleString()}kg of materials!</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-brand-green h-4 rounded-full text-xs font-medium text-white text-center p-0.5 leading-none" 
            style={{ width: `${(COMMUNITY_PROGRESS_KG / COMMUNITY_GOAL_KG) * 100}%` }}
          >
             {((COMMUNITY_PROGRESS_KG / COMMUNITY_GOAL_KG) * 100).toFixed(0)}%
          </div>
        </div>
        <p className="text-right text-sm font-semibold mt-1">{COMMUNITY_PROGRESS_KG.toLocaleString()} / {COMMUNITY_GOAL_KG.toLocaleString()} kg</p>
      </div>
      
      {/* Map and Centers */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Find a Recycling Center</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setSelectedFilter('All')} className={`px-3 py-1 text-sm rounded-full ${selectedFilter === 'All' ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
          {materialTypes.map(type => (
            <button key={type} onClick={() => setSelectedFilter(type)} className={`px-3 py-1 text-sm rounded-full ${selectedFilter === type ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-700'}`}>{type}</button>
          ))}
        </div>
        
        <div className="relative w-full h-80 bg-gray-300 rounded-lg shadow-inner mb-4 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1614323990371-8313388145ce?q=80&w=2070&auto=format&fit=crop" alt="Map of city" className="w-full h-full object-cover"/>
            {filteredCenters.map(center => {
                const { x, y } = getCoordinates(center);
                const isSelected = selectedCenter?.id === center.id;
                return (
                    <button
                        key={center.id}
                        onClick={() => handleSelectCenter(center)}
                        className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200"
                        style={{ left: `${x}%`, top: `${y}%`, zIndex: isSelected ? 10 : 1 }}
                        title={center.name}
                    >
                        <LocationPinIcon className={`w-8 h-8 drop-shadow-lg ${isSelected ? 'text-brand-blue scale-125' : 'text-brand-green hover:text-brand-green-light'}`} />
                    </button>
                )
            })}
        </div>


        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {filteredCenters.map(center => {
                const isSelected = selectedCenter?.id === center.id;
                return (
                    <div 
                        id={`recycle-center-${center.id}`}
                        key={center.id}
                        onClick={() => handleSelectCenter(center)}
                        className={`p-3 rounded-md shadow-sm cursor-pointer transition-all duration-200 ${isSelected ? 'bg-brand-blue-light ring-2 ring-brand-blue' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <p className="font-semibold">{center.name}</p>
                        <p className="text-sm text-gray-500">{center.location} &bull; {center.hours}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {center.accepts.map(material => (
                                <span key={material} className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">{material}</span>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
      
      {/* Action Button */}
      <div className="text-center mb-6">
        <button 
            onClick={() => setShowLogModal(true)}
            className="w-full max-w-sm bg-brand-blue text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-blue-dark transition-transform"
        >
            Log a Recycling Drop-off (+75 SP)
        </button>
      </div>

      {/* Recycling Guide */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Quick Recycling Guide</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li><span className="font-semibold">Plastics:</span> Rinse containers. Remove caps.</li>
            <li><span className="font-semibold">Paper:</span> Keep it clean and dry. Flatten cardboard boxes.</li>
            <li><span className="font-semibold">Glass:</span> Rinse bottles and jars. No need to remove labels.</li>
        </ul>
      </div>

      {showLogModal && <RecycleLogModal onClose={() => setShowLogModal(false)} onSubmit={onLogRecycle} />}
    </div>
  );
};

export default RecyclePage;