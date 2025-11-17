import React, { useState, useMemo } from 'react';
import { Reward, Activity, UserRank, HeroSlide, MerchandiseItem } from '../types';
import WalletRedemptionModal from '../components/WalletRedemptionModal';
import QRCodePaymentModal from '../components/QRCodePaymentModal';
// FIX: Added missing icon import
import { GiftIcon, TshirtIcon } from '../components/Icons';
import { SP_TO_NPR_RATE } from '../constants';
import HeroSlider from '../components/HeroSlider';
import MerchandiseDetailModal from '../components/MerchandiseDetailModal';

interface RewardsPageProps {
  userPoints: number;
  onPurchaseReward: (reward: Reward, pointsUsed: number, amountPaidNPR: number) => void;
  currentUser: UserRank;
  rewards: Reward[];
  heroSlides: HeroSlide[];
  merchandise: MerchandiseItem[];
  onPurchaseMerchandise: (item: MerchandiseItem) => void;
  onReviewSubmit: (itemId: number, rating: number, comment: string) => void;
  onDiscussMerchandise: (item: MerchandiseItem) => void;
}

const RewardCard: React.FC<{ 
  reward: Reward, 
  userPoints: number, 
  onRedeem: (reward: Reward) => void,
  onPayWithQR: (reward: Reward) => void 
}> = ({ reward, userPoints, onRedeem, onPayWithQR }) => {
    const canAfford = userPoints >= reward.cost;
    const canPartiallyAfford = userPoints > 0 && !canAfford && reward.priceNPR;
    const isGoldTier = reward.listingTier === 'Gold';

    return (
        <div className={`relative bg-white rounded-lg shadow-subtle overflow-hidden text-center flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ${isGoldTier ? 'border-2 border-amber-400 shadow-xl' : 'border border-gray-100'}`}>
            {isGoldTier && (
                 <div className="absolute top-2 -right-11 transform rotate-45 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-10 py-1 shadow-md z-10">
                    Featured
                </div>
            )}
            <div className="relative">
                <img src={reward.imageUrl} alt={reward.title} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <p className="absolute bottom-2 left-2 text-white font-bold text-xs bg-black/50 px-2 py-1 rounded-md">{reward.partner}</p>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-md flex-grow text-brand-gray-dark">{reward.title}</h3>
                <div className="my-2">
                    <span className="font-bold text-lg text-brand-green">{reward.cost.toLocaleString()} SP</span>
                    {reward.priceNPR && (
                      <span className="block text-sm text-gray-500">or Rs. {reward.priceNPR}</span>
                    )}
                </div>
                {canAfford ? (
                    <button 
                        onClick={() => onRedeem(reward)}
                        className="w-full mt-auto bg-brand-green text-white py-2 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors">
                        Redeem
                    </button>
                ) : canPartiallyAfford ? (
                    <button
                        onClick={() => onPayWithQR(reward)}
                        className="w-full mt-auto bg-gradient-to-r from-brand-green to-brand-blue text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md">
                        Redeem (SP + Cash)
                    </button>
                ) : (
                    reward.priceNPR ? (
                        <button
                            onClick={() => onPayWithQR(reward)}
                            className="w-full mt-auto bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors">
                            Pay Rs. {reward.priceNPR}
                        </button>
                    ) : (
                         <button 
                            disabled
                            className="w-full mt-auto bg-gray-300 text-gray-500 py-2 rounded-lg font-semibold cursor-not-allowed">
                            Not enough SP
                        </button>
                    )
                )}
            </div>
        </div>
    );
};


const RewardsPage: React.FC<RewardsPageProps> = ({ userPoints, onPurchaseReward, currentUser, rewards, heroSlides, merchandise, onPurchaseMerchandise, onReviewSubmit, onDiscussMerchandise }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWalletReward, setSelectedWalletReward] = useState<Reward | null>(null);
  const [showQRPaymentModal, setShowQRPaymentModal] = useState(false);
  const [selectedQRReward, setSelectedQRReward] = useState<Reward | null>(null);
  const [viewingMerch, setViewingMerch] = useState<MerchandiseItem | null>(null);
  const [showMerchQRModal, setShowMerchQRModal] = useState(false);

  const sortedRewards = useMemo(() => {
    const tierOrder: Record<Reward['listingTier'], number> = { 'Gold': 1, 'Silver': 2, 'Bronze': 3 };
    return [...rewards].sort((a, b) => tierOrder[a.listingTier] - tierOrder[b.listingTier]);
  }, [rewards]);


  const handleRedeem = (reward: Reward) => {
    if (userPoints < reward.cost) return;

    if (reward.rewardType === 'digital_wallet') {
      setSelectedWalletReward(reward);
      setShowWalletModal(true);
    } else {
      onPurchaseReward(reward, reward.cost, 0);
    }
  };

  const handleWalletRedemption = (walletId: string) => {
    if (!selectedWalletReward) return;
    onPurchaseReward(selectedWalletReward, selectedWalletReward.cost, 0);
    setShowWalletModal(false);
    setSelectedWalletReward(null);
  };

  const handlePayWithQR = (reward: Reward) => {
      setSelectedQRReward(reward);
      setShowQRPaymentModal(true);
  };

  const handleQRPaymentSuccess = (pointsUsed: number) => {
      if (!selectedQRReward) return;
      
      const remainingCostInSP = selectedQRReward.cost - pointsUsed;
      const amountToPayNPR = Math.round(remainingCostInSP / SP_TO_NPR_RATE);

      onPurchaseReward(selectedQRReward, pointsUsed, amountToPayNPR);
      
      setShowQRPaymentModal(false);
      setSelectedQRReward(null);
  };

  const handleBuyNow = (item: MerchandiseItem) => {
    setViewingMerch(item); // Keep item context
    setShowMerchQRModal(true);
  };

  const handleMerchPaymentSuccess = () => {
    if (!viewingMerch) return;
    onPurchaseMerchandise(viewingMerch);
    setShowMerchQRModal(false);
    // viewingMerch is cleared when receipt is closed
  };


  return (
    <div className="container mx-auto px-4 py-4 space-y-8">
      <HeroSlider slides={heroSlides} />

      <div>
        <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                  <GiftIcon />
              </div>
              <div>
                <h2 className="font-bold text-2xl text-brand-gray-dark">Rewards Marketplace</h2>
                <p className="text-gray-600 text-sm">Use your Safa Points (SP) for real rewards!</p>
              </div>
          </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedRewards.map(reward => (
            <RewardCard 
              key={reward.id} 
              reward={reward} 
              userPoints={userPoints} 
              onRedeem={handleRedeem}
              onPayWithQR={handlePayWithQR}
            />
          ))}
        </div>
      </div>

       <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/10 text-brand-blue rounded-xl">
            <TshirtIcon />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-brand-gray-dark">Official Merchandise</h2>
            <p className="text-gray-600 text-sm">Show your support for a cleaner Nepal.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {merchandise.map(item => (
            <div key={item.id} onClick={() => setViewingMerch(item)} className="bg-white rounded-lg shadow-subtle overflow-hidden text-center flex flex-col transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-md flex-grow text-brand-gray-dark">{item.title}</h3>
                <p className="text-sm text-gray-500 my-2 line-clamp-2">{item.description}</p>
                <span className="font-bold text-lg text-brand-green mb-2">Rs. {item.priceNPR.toLocaleString()}</span>
                <button
                  className="w-full mt-auto bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showWalletModal && selectedWalletReward && (
          <WalletRedemptionModal 
            reward={selectedWalletReward}
            onClose={() => setShowWalletModal(false)}
            onSubmit={handleWalletRedemption}
          />
      )}

      {showQRPaymentModal && selectedQRReward && (
          <QRCodePaymentModal
            reward={selectedQRReward}
            userPoints={currentUser.points}
            onClose={() => setShowQRPaymentModal(false)}
            onPaymentSuccess={handleQRPaymentSuccess}
          />
      )}

      {viewingMerch && !showMerchQRModal && (
          <MerchandiseDetailModal
            item={viewingMerch}
            currentUser={currentUser}
            onClose={() => setViewingMerch(null)}
            onBuyNow={handleBuyNow}
            onReviewSubmit={onReviewSubmit}
            onDiscuss={onDiscussMerchandise}
          />
      )}

      {showMerchQRModal && viewingMerch && (
        <QRCodePaymentModal
            reward={{ // Adapt MerchandiseItem to Reward for the modal
                id: viewingMerch.id,
                title: viewingMerch.title,
                partner: 'Official Merchandise',
                cost: viewingMerch.priceNPR * SP_TO_NPR_RATE, // Virtual cost to make modal calc correct NPR amount
                imageUrl: viewingMerch.imageUrl,
                priceNPR: viewingMerch.priceNPR,
                listingTier: 'Bronze'
            }}
            userPoints={0} // Force a cash-only payment flow
            onClose={() => {
                setShowMerchQRModal(false);
                // Do not clear viewingMerch here, so the detail modal can re-open
            }}
            onPaymentSuccess={() => handleMerchPaymentSuccess()}
          />
      )}
    </div>
  );
};

export default RewardsPage;