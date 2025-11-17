import React, { useState } from 'react';
import { MOCK_SUPPLY_POINTS } from '../constants';
import { SupplyPoint, UserRank, FeatureFlags } from '../types';
import SupplyLogModal from '../components/SupplyLogModal';
import SafetyKitRedemptionModal from '../components/SafetyKitRedemptionModal';
import { LocationPinIcon, SuppliesIcon } from '../components/Icons';

interface SuppliesPageProps {
  onLogSupplyPickup: (supplyPoint: SupplyPoint) => void;
  onRequestRedemption: (receipt: File) => void;
  currentUser: UserRank;
  featureFlags: FeatureFlags;
}

const SuppliesPage: React.FC<SuppliesPageProps> = ({ onLogSupplyPickup, onRequestRedemption, currentUser, featureFlags }) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<SupplyPoint | null>(null);

  // Bounding box for Kathmandu Valley mock coordinates
  const minLat = 27.670, maxLat = 27.730;
  const minLng = 85.310, maxLng = 85.370;
  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;

  const getCoordinates = (point: SupplyPoint) => {
    const x = ((point.coordinates.lng - minLng) / lngRange) * 100;
    const y = ((maxLat - point.coordinates.lat) / latRange) * 100;
    return { x, y };
  };

  const handleSelectPoint = (point: SupplyPoint) => {
    setSelectedPoint(point);
    const element = document.getElementById(`supply-point-${point.id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  const hasLoggedToday = currentUser.stats.supplyKitsToday > 0;

  const handleRedemptionSubmit = (receipt: File) => {
    onRequestRedemption(receipt);
    setShowRedemptionModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                <SuppliesIcon />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-brand-gray-dark">Safa Supply Points</h2>
              <p className="text-gray-600 text-sm">Find a spot to pick up a free Clean-Up Kit.</p>
            </div>
        </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Nearby Supply Points</h3>
        
        <div className="relative w-full h-80 bg-gray-300 rounded-lg shadow-inner mb-4 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1614323990371-8313388145ce?q=80&w=2070&auto=format&fit=crop" alt="Map of city" className="w-full h-full object-cover"/>
          {MOCK_SUPPLY_POINTS.map(point => {
              const { x, y } = getCoordinates(point);
              const isSelected = selectedPoint?.id === point.id;
              return (
                  <button
                      key={point.id}
                      onClick={() => handleSelectPoint(point)}
                      className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200"
                      style={{ left: `${x}%`, top: `${y}%`, zIndex: isSelected ? 10 : 1 }}
                      title={point.name}
                  >
                      <LocationPinIcon className={`w-8 h-8 drop-shadow-lg ${isSelected ? 'text-brand-blue scale-125' : 'text-red-500 hover:text-red-400'}`} />
                  </button>
              )
          })}
        </div>

        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {MOCK_SUPPLY_POINTS.map(point => {
                const isSelected = selectedPoint?.id === point.id;
                return (
                    <div 
                        id={`supply-point-${point.id}`}
                        key={point.id}
                        onClick={() => handleSelectPoint(point)}
                        className={`flex items-center gap-4 p-3 rounded-md shadow-sm cursor-pointer transition-all duration-200 ${isSelected ? 'bg-brand-blue-light ring-2 ring-brand-blue' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <img src={point.imageUrl} alt={point.name} className="w-20 h-16 object-cover rounded-md flex-shrink-0" />
                        <div className="flex-grow">
                          <p className="font-semibold">{point.name}</p>
                          <p className="text-sm text-gray-500">{point.location} &bull; {point.hours}</p>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
      
      <div className="text-center mb-6 space-y-3">
        <button 
            onClick={() => setShowLogModal(true)}
            disabled={hasLoggedToday}
            className="w-full max-w-sm bg-brand-blue text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-blue-dark transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {hasLoggedToday ? 'Kit Picked Up Today' : 'Log a Kit Pick-up (+25 SP)'}
        </button>

        {featureFlags.safetyKitRedemption && (
          <button
            onClick={() => setShowRedemptionModal(true)}
            className="w-full max-w-sm bg-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-green-dark transition-transform"
          >
            Redeem SP for Purchase
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">How It Works</h3>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li><strong>Option A:</strong> Visit any Safa Supply Point, ask for a free kit, clean up a small area, then log your pick-up in the app to earn 25 SP. (Limit 1 per day)</li>
            <li><strong>Option B:</strong> Purchase your own gloves and bags, clean an area, then submit a photo of your receipt to get 100 SP back! Our team will approve it within 24 hours.</li>
        </ol>
      </div>

      {showLogModal && <SupplyLogModal onClose={() => setShowLogModal(false)} onSubmit={onLogSupplyPickup} />}
      {showRedemptionModal && <SafetyKitRedemptionModal onClose={() => setShowRedemptionModal(false)} onSubmit={handleRedemptionSubmit} />}
    </div>
  );
};

export default SuppliesPage;