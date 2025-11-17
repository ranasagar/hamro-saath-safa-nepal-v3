import React, { useState } from 'react';
import { UserRank, Issue, Disturbance, Reward, FeatureFlags, FeatureFlag, Activity, MayorProfile, Ward, SafetyKitRedemption, AdminPurchaseReceipt, PurchaseReceipt, HeroSlide, MerchandiseItem } from '../types';
// FIX: Added missing icon imports
import { UsersIcon, TrashIcon, WarningIcon, EditIcon, DeleteIcon, StorefrontIcon, SettingsIcon, RssIcon, CampaignIcon, GlobeAltIcon, ReceiptIcon, AdminPanelIcon, TshirtIcon } from '../components/Icons';
import RewardModal from '../components/RewardModal';
import MayorModal from '../components/MayorModal';
import WardModal from '../components/WardModal';
import ReceiptModal from '../components/ReceiptModal';
import HeroSlideModal from '../components/HeroSlideModal';
import MerchandiseModal from '../components/MerchandiseModal';

interface AdminPageProps {
    allUsers: UserRank[];
    currentUser: UserRank;
    allActivities: Activity[];
    issues: Issue[];
    disturbances: Disturbance[];
    rewards: Reward[];
    heroSlides: HeroSlide[];
    merchandise: MerchandiseItem[];
    featureFlags: FeatureFlags;
    mayorProfiles: MayorProfile[];
    wards: Ward[];
    safetyKitRedemptions: SafetyKitRedemption[];
    allPurchases: AdminPurchaseReceipt[];
    onDeleteUser: (userName: string) => void;
    onEditUserPoints: (userName: string, newPoints: number) => void;
    onDeleteIssue: (issueId: number) => void;
    onDeleteDisturbance: (disturbanceId: number) => void;
    onAddReward: (newReward: Omit<Reward, 'id'>) => void;
    onEditReward: (updatedReward: Reward) => void;
    onDeleteReward: (rewardId: number) => void;
    onAddHeroSlide: (newSlide: Omit<HeroSlide, 'id'>) => void;
    onEditHeroSlide: (updatedSlide: HeroSlide) => void;
    onDeleteHeroSlide: (slideId: number) => void;
    onAddMerchandise: (newItem: Omit<MerchandiseItem, 'id'>) => void;
    onEditMerchandise: (updatedItem: MerchandiseItem) => void;
    onDeleteMerchandise: (itemId: number) => void;
    onToggleFeature: (feature: FeatureFlag) => void;
    onCreateAnnouncement: (description: string) => void;
    onDeleteActivity: (activityId: string) => void;
    onAddMayor: (newMayor: Omit<MayorProfile, 'id'>) => void;
    onEditMayor: (updatedMayor: MayorProfile) => void;
    onDeleteMayor: (mayorId: number) => void;
    onAddWard: (newWard: Omit<Ward, 'id'>) => void;
    onEditWard: (updatedWard: Ward) => void;
    onDeleteWard: (wardId: number) => void;
    onApproveRedemption: (redemptionId: number) => void;
    onRejectRedemption: (redemptionId: number) => void;
    onConfirmPurchase: (receiptId: number, userName: string) => void;
}

type AdminTab = 'dashboard' | 'users' | 'transactions' | 'issues' | 'disturbances' | 'marketplace' | 'liveFeed' | 'locations' | 'approvals' | 'settings';

const AdminTabs: React.FC<{ activeTab: AdminTab; setActiveTab: (tab: AdminTab) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs: { id: AdminTab; label: string }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'users', label: 'Users' },
        { id: 'transactions', label: 'Transactions' },
        { id: 'marketplace', label: 'Marketplace' },
        { id: 'approvals', label: 'Approvals' },
        { id: 'liveFeed', label: 'Live Feed' },
        { id: 'issues', label: 'Issues' },
        { id: 'disturbances', label: 'Disturbances' },
        { id: 'locations', label: 'Locations' },
        { id: 'settings', label: 'Settings' },
    ];
    return (
        <div className="mb-6 flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 capitalize px-4 py-2 font-semibold transition-colors duration-200 text-sm sm:text-base ${activeTab === tab.id ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

const DashboardTab: React.FC<{ users: UserRank[]; issues: Issue[]; disturbances: Disturbance[] }> = ({ users, issues, disturbances }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <UsersIcon className="w-8 h-8 mx-auto text-brand-blue mb-2" />
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-sm font-semibold text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <TrashIcon className="w-8 h-8 mx-auto text-brand-green mb-2" />
            <p className="text-3xl font-bold">{issues.filter(i => i.status !== 'Solved').length}</p>
            <p className="text-sm font-semibold text-gray-600">Open Issues</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <WarningIcon className="w-8 h-8 mx-auto text-amber-500 mb-2" />
            <p className="text-3xl font-bold">{disturbances.filter(d => d.reports >= 3).length}</p>
            <p className="text-sm font-semibold text-gray-600">Active Disturbances</p>
        </div>
    </div>
);

const UsersTab: React.FC<{ users: UserRank[]; currentUser: UserRank; onDelete: (name: string) => void; onEditPoints: (name: string, points: number) => void }> = ({ users, currentUser, onDelete, onEditPoints }) => {
    const handleEdit = (user: UserRank) => {
        const newPointsStr = prompt(`Enter new points for ${user.name}:`, user.points.toString());
        if (newPointsStr) {
            const newPoints = parseInt(newPointsStr, 10);
            if (!isNaN(newPoints)) {
                onEditPoints(user.name, newPoints);
            } else {
                alert("Invalid number entered.");
            }
        }
    };
    return (
        <div className="space-y-2">
            {users.map(user => (
                <div key={user.name} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                    <div className="flex-grow">
                        <p className="font-semibold">{user.name} {user.isAdmin && <span className="text-xs bg-brand-blue text-white font-bold px-2 py-1 rounded-full ml-2 shadow-sm">ADMIN</span>}</p>
                        <p className="text-sm text-gray-500">{user.points.toLocaleString()} SP &bull; {user.ward}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleEdit(user)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                        <button onClick={() => onDelete(user.name)} disabled={user.name === currentUser.name} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"><DeleteIcon /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const IssuesTab: React.FC<{ issues: Issue[]; onDelete: (id: number) => void; }> = ({ issues, onDelete }) => (
    <div className="space-y-2">
        {issues.map(issue => (
            <div key={issue.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                 <img src={issue.imageUrl} alt={issue.category} className="w-16 h-10 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                    <p className="font-semibold">{issue.category} <span className={`text-xs px-2 py-0.5 rounded-full ${issue.status === 'Solved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{issue.status}</span></p>
                    <p className="text-sm text-gray-500">Reported by {issue.user} in {issue.location}</p>
                </div>
                <button onClick={() => onDelete(issue.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
            </div>
        ))}
    </div>
);

const DisturbancesTab: React.FC<{ disturbances: Disturbance[]; onDelete: (id: number) => void; }> = ({ disturbances, onDelete }) => (
    <div className="space-y-2">
        {disturbances.map(d => (
            <div key={d.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                 <div className="mr-4 text-amber-500"><WarningIcon className="w-8 h-8" /></div>
                <div className="flex-grow">
                    <p className="font-semibold">{d.category} <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{d.reports} reports</span></p>
                    <p className="text-sm text-gray-500">{d.location}</p>
                </div>
                <button onClick={() => onDelete(d.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
            </div>
        ))}
    </div>
);

const MarketplaceTab: React.FC<{ 
    rewards: Reward[]; 
    heroSlides: HeroSlide[];
    merchandise: MerchandiseItem[];
    onAddReward: () => void;
    onEditReward: (reward: Reward) => void;
    onDeleteReward: (id: number) => void;
    onAddHeroSlide: () => void;
    onEditHeroSlide: (slide: HeroSlide) => void;
    onDeleteHeroSlide: (id: number) => void;
    onAddMerchandise: () => void;
    onEditMerchandise: (item: MerchandiseItem) => void;
    onDeleteMerchandise: (id: number) => void;
}> = ({ rewards, heroSlides, merchandise, onAddReward, onEditReward, onDeleteReward, onAddHeroSlide, onEditHeroSlide, onDeleteHeroSlide, onAddMerchandise, onEditMerchandise, onDeleteMerchandise }) => {
    const tierColorMap = {
        Gold: 'text-amber-500',
        Silver: 'text-slate-500',
        Bronze: 'text-orange-600',
    };
    
    return (
        <div className="space-y-6">
            {/* Hero Slides Management */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Hero Slides</h3>
                    <button onClick={onAddHeroSlide} className="bg-brand-blue text-white font-bold py-1 px-3 text-sm rounded-lg shadow hover:bg-brand-blue-dark transition-colors">
                        Add New Slide
                    </button>
                </div>
                <div className="space-y-2">
                    {heroSlides.map(slide => (
                        <div key={slide.id} className="flex items-center p-2 border rounded-md">
                            <img src={slide.imageUrl} alt={slide.title} className="w-16 h-10 object-cover rounded-md mr-4 flex-shrink-0" />
                            <div className="flex-grow overflow-hidden">
                                <p className="font-semibold truncate">{slide.title}</p>
                                <p className="text-sm text-gray-500 truncate">{slide.subtitle}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0 ml-2">
                                <button onClick={() => onEditHeroSlide(slide)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                                <button onClick={() => onDeleteHeroSlide(slide.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rewards Management */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Reward Items</h3>
                    <button onClick={onAddReward} className="bg-brand-blue text-white font-bold py-1 px-3 text-sm rounded-lg shadow hover:bg-brand-blue-dark transition-colors">
                        Add New Reward
                    </button>
                </div>
                <div className="space-y-2">
                    {rewards.map(reward => (
                        <div key={reward.id} className="flex items-center p-3 border rounded-md">
                            <img src={reward.imageUrl} alt={reward.title} className="w-16 h-10 object-cover rounded-md mr-4" />
                            <div className="flex-grow">
                                <p className="font-semibold">{reward.title}</p>
                                <p className="text-sm text-gray-500">
                                    {reward.partner} &bull; {reward.cost.toLocaleString()} SP &bull; <span className={`font-bold ${tierColorMap[reward.listingTier]}`}>{reward.listingTier} Tier</span>
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => onEditReward(reward)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                                <button onClick={() => onDeleteReward(reward.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Merchandise Management */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Merchandise Items</h3>
                    <button onClick={onAddMerchandise} className="bg-brand-blue text-white font-bold py-1 px-3 text-sm rounded-lg shadow hover:bg-brand-blue-dark transition-colors">
                        Add New Item
                    </button>
                </div>
                <div className="space-y-2">
                    {merchandise.map(item => (
                        <div key={item.id} className="flex items-center p-3 border rounded-md">
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-10 object-cover rounded-md mr-4" />
                            <div className="flex-grow">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-500">
                                    Rs. {item.priceNPR.toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => onEditMerchandise(item)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                                <button onClick={() => onDeleteMerchandise(item.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

const SettingsTab: React.FC<{ 
    flags: FeatureFlags, 
    onToggle: (feature: FeatureFlag) => void 
}> = ({ flags, onToggle }) => {
    const featureLabels: Record<FeatureFlag, string> = {
        rewards: 'Rewards Marketplace',
        hub: 'Civic Sense Hub',
        forum: 'Community Forum',
        recycle: 'Recycle Hub',
        supplies: 'Supply Points',
        disturbances: 'Disturbance Reporting',
        microActions: 'Micro-Actions',
        liveFeed: 'Live Activity Feed',
        safetyKitRedemption: 'Safety Kit Redemption',
    };
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4">Feature Management</h3>
            <div className="space-y-4">
                {Object.keys(flags).map(key => {
                    const featureKey = key as FeatureFlag;
                    const isEnabled = flags[featureKey];
                    return (
                        <div key={featureKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <span className="font-semibold text-gray-700">{featureLabels[featureKey]}</span>
                            <button
                                onClick={() => onToggle(featureKey)}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                                    isEnabled ? 'bg-brand-green' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const LiveFeedTab: React.FC<{ 
    activities: Activity[];
    onCreateAnnouncement: (description: string) => void;
    onDelete: (id: string) => void;
}> = ({ activities, onCreateAnnouncement, onDelete }) => {
    const [announcement, setAnnouncement] = useState('');
    
    const handleCreate = () => {
        if(announcement.trim()) {
            onCreateAnnouncement(announcement.trim());
            setAnnouncement('');
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><CampaignIcon /> Create Announcement</h3>
                <div className="flex gap-2">
                    <input 
                        type="text"
                        value={announcement}
                        onChange={e => setAnnouncement(e.target.value)}
                        placeholder="e.g., Welcome new users from Lalitpur!"
                        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-gray-900"
                    />
                    <button onClick={handleCreate} className="bg-brand-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-blue-dark">
                        Post
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-lg mt-6">Recent Activities</h3>
                {activities.map(activity => (
                    <div key={activity.id} className={`flex items-center p-3 rounded-lg shadow-sm ${activity.isAnnouncement ? 'bg-blue-50 border border-blue-200' : 'bg-white'}`}>
                        <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full mr-4" />
                        <div className="flex-grow">
                            <p className="text-sm"><span className="font-semibold">{activity.user.name}</span> {activity.description}</p>
                            <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                        <button onClick={() => onDelete(activity.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LocationsTab: React.FC<{
    mayorProfiles: MayorProfile[];
    wards: Ward[];
    onAddMayor: () => void;
    onEditMayor: (mayor: MayorProfile) => void;
    onDeleteMayor: (id: number) => void;
    onAddWard: () => void;
    onEditWard: (ward: Ward) => void;
    onDeleteWard: (id: number) => void;
}> = ({ mayorProfiles, wards, onAddMayor, onEditMayor, onDeleteMayor, onAddWard, onEditWard, onDeleteWard }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mayor/City Management */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Cities & Mayors</h3>
                <button onClick={onAddMayor} className="bg-brand-blue text-white font-bold py-1 px-3 text-sm rounded-lg shadow hover:bg-brand-blue-dark transition-colors">
                    Add City/Mayor
                </button>
            </div>
            <div className="space-y-2">
                {mayorProfiles.map(mayor => (
                    <div key={mayor.id} className="flex items-center p-2 border rounded-md">
                        <img src={mayor.photoUrl} alt={mayor.name} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-grow">
                            <p className="font-semibold">{mayor.name}</p>
                            <p className="text-sm text-gray-500">{mayor.city}</p>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => onEditMayor(mayor)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                            <button onClick={() => onDeleteMayor(mayor.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Ward Management */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Wards</h3>
                <button onClick={onAddWard} className="bg-brand-blue text-white font-bold py-1 px-3 text-sm rounded-lg shadow hover:bg-brand-blue-dark transition-colors">
                    Add Ward
                </button>
            </div>
            <div className="space-y-2">
                {wards.map(ward => (
                    <div key={ward.id} className="flex items-center p-2 border rounded-md">
                        <div className="flex-grow">
                            <p className="font-semibold">{ward.name}</p>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => onEditWard(ward)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><EditIcon /></button>
                            <button onClick={() => onDeleteWard(ward.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><DeleteIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ApprovalsTab: React.FC<{ 
    redemptions: SafetyKitRedemption[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}> = ({ redemptions, onApprove, onReject }) => {
    const pendingRedemptions = redemptions.filter(r => r.status === 'pending');
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4">Safety Kit Purchase Redemptions</h3>
            {pendingRedemptions.length > 0 ? (
                <div className="space-y-3">
                    {pendingRedemptions.map(r => (
                        <div key={r.id} className="flex items-center p-3 border rounded-md gap-4">
                            <img src={r.userAvatar} alt={r.userName} className="w-10 h-10 rounded-full" />
                            <a href={r.receiptImageUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                                <img src={r.receiptImageUrl} alt="Receipt" className="w-20 h-12 object-cover rounded-md" />
                            </a>
                            <div className="flex-grow">
                                <p className="font-semibold">{r.userName}</p>
                                <p className="text-xs text-gray-500">{new Date(r.timestamp).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onApprove(r.id)} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600">Approve</button>
                                <button onClick={() => onReject(r.id)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-4">No pending redemptions.</p>
            )}
        </div>
    );
};

const TransactionsTab: React.FC<{
    purchases: AdminPurchaseReceipt[];
    onConfirm: (receiptId: number, userName: string) => void;
    onViewReceipt: (receipt: PurchaseReceipt) => void;
}> = ({ purchases, onConfirm, onViewReceipt }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-4">All User Transactions</h3>
        <div className="space-y-2">
            {purchases.map(p => (
                <div key={p.id} className="flex items-center p-3 border rounded-md gap-4">
                    <img src={p.userAvatar} alt={p.userName} className="w-10 h-10 rounded-full" />
                    <div className="flex-grow">
                        <p className="font-semibold">{p.userName} purchased "{p.rewardTitle}"</p>
                        <p className="text-xs text-gray-500">{new Date(p.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        {p.pointsUsed > 0 && <p className="text-sm font-semibold text-red-500">-{p.pointsUsed.toLocaleString()} SP</p>}
                        {p.amountPaidNPR > 0 && <p className="text-sm font-semibold text-green-600">Rs. {p.amountPaidNPR.toLocaleString()}</p>}
                    </div>
                     <div className="flex flex-col items-end gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {p.status}
                        </span>
                         {p.status === 'pending' && (
                             <button onClick={() => onConfirm(p.id, p.userName)} className="text-xs font-semibold bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                                 Confirm
                             </button>
                         )}
                         <button onClick={() => onViewReceipt(p)} className="text-xs font-semibold text-blue-600 hover:underline">
                            View Receipt
                         </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    
    // Modal states
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<Reward | null>(null);
    const [isMayorModalOpen, setIsMayorModalOpen] = useState(false);
    const [editingMayor, setEditingMayor] = useState<MayorProfile | null>(null);
    const [isWardModalOpen, setIsWardModalOpen] = useState(false);
    const [editingWard, setEditingWard] = useState<Ward | null>(null);
    const [isHeroSlideModalOpen, setIsHeroSlideModalOpen] = useState(false);
    const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);
    const [isMerchandiseModalOpen, setIsMerchandiseModalOpen] = useState(false);
    const [editingMerchandise, setEditingMerchandise] = useState<MerchandiseItem | null>(null);
    const [viewingReceipt, setViewingReceipt] = useState<PurchaseReceipt | null>(null);

    const handleAddReward = () => {
        setEditingReward(null);
        setIsRewardModalOpen(true);
    };

    const handleEditReward = (reward: Reward) => {
        setEditingReward(reward);
        setIsRewardModalOpen(true);
    };

    const handleRewardSubmit = (rewardData: Omit<Reward, 'id'> | Reward) => {
        if ('id' in rewardData) {
            props.onEditReward(rewardData);
        } else {
            props.onAddReward(rewardData);
        }
        setIsRewardModalOpen(false);
    };
    
    const handleAddMayor = () => {
        setEditingMayor(null);
        setIsMayorModalOpen(true);
    };
    const handleEditMayor = (mayor: MayorProfile) => {
        setEditingMayor(mayor);
        setIsMayorModalOpen(true);
    };
    const handleMayorSubmit = (mayorData: Omit<MayorProfile, 'id'> | MayorProfile) => {
        if ('id' in mayorData) {
            props.onEditMayor(mayorData);
        } else {
            props.onAddMayor(mayorData);
        }
        setIsMayorModalOpen(false);
    };
    
    const handleAddWard = () => {
        setEditingWard(null);
        setIsWardModalOpen(true);
    };
    const handleEditWard = (ward: Ward) => {
        setEditingWard(ward);
        setIsWardModalOpen(true);
    };
    const handleWardSubmit = (wardData: Omit<Ward, 'id'> | Ward) => {
        if ('id' in wardData) {
            props.onEditWard(wardData);
        } else {
            props.onAddWard(wardData);
        }
        setIsWardModalOpen(false);
    };
    
    const handleAddHeroSlide = () => {
        setEditingHeroSlide(null);
        setIsHeroSlideModalOpen(true);
    };
    const handleEditHeroSlide = (slide: HeroSlide) => {
        setEditingHeroSlide(slide);
        setIsHeroSlideModalOpen(true);
    };
    const handleHeroSlideSubmit = (slideData: Omit<HeroSlide, 'id'> | HeroSlide) => {
        if ('id' in slideData) {
            props.onEditHeroSlide(slideData);
        } else {
            props.onAddHeroSlide(slideData);
        }
        setIsHeroSlideModalOpen(false);
    };
    
    const handleAddMerchandise = () => {
        setEditingMerchandise(null);
        setIsMerchandiseModalOpen(true);
    };
    const handleEditMerchandise = (item: MerchandiseItem) => {
        setEditingMerchandise(item);
        setIsMerchandiseModalOpen(true);
    };
    const handleMerchandiseSubmit = (itemData: Omit<MerchandiseItem, 'id'> | MerchandiseItem) => {
        if ('id' in itemData) {
            props.onEditMerchandise(itemData);
        } else {
            props.onAddMerchandise(itemData);
        }
        setIsMerchandiseModalOpen(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardTab users={props.allUsers} issues={props.issues} disturbances={props.disturbances} />;
            case 'users':
                return <UsersTab users={props.allUsers} currentUser={props.currentUser} onDelete={props.onDeleteUser} onEditPoints={props.onEditUserPoints} />;
            case 'transactions':
                return <TransactionsTab purchases={props.allPurchases} onConfirm={props.onConfirmPurchase} onViewReceipt={setViewingReceipt} />;
            case 'issues':
                return <IssuesTab issues={props.issues} onDelete={props.onDeleteIssue} />;
            case 'disturbances':
                return <DisturbancesTab disturbances={props.disturbances} onDelete={props.onDeleteDisturbance} />;
            case 'marketplace':
                return <MarketplaceTab 
                    rewards={props.rewards} 
                    heroSlides={props.heroSlides}
                    merchandise={props.merchandise}
                    onAddReward={handleAddReward}
                    onEditReward={handleEditReward}
                    onDeleteReward={props.onDeleteReward}
                    onAddHeroSlide={handleAddHeroSlide}
                    onEditHeroSlide={handleEditHeroSlide}
                    onDeleteHeroSlide={props.onDeleteHeroSlide}
                    onAddMerchandise={handleAddMerchandise}
                    onEditMerchandise={handleEditMerchandise}
                    onDeleteMerchandise={props.onDeleteMerchandise}
                />;
            case 'settings':
                return <SettingsTab flags={props.featureFlags} onToggle={props.onToggleFeature} />;
            case 'liveFeed':
                return <LiveFeedTab activities={props.allActivities} onCreateAnnouncement={props.onCreateAnnouncement} onDelete={props.onDeleteActivity} />;
            case 'locations':
                return <LocationsTab 
                    mayorProfiles={props.mayorProfiles}
                    wards={props.wards}
                    onAddMayor={handleAddMayor}
                    onEditMayor={handleEditMayor}
                    onDeleteMayor={props.onDeleteMayor}
                    onAddWard={handleAddWard}
                    onEditWard={handleEditWard}
                    onDeleteWard={props.onDeleteWard}
                />;
            case 'approvals':
                return <ApprovalsTab redemptions={props.safetyKitRedemptions} onApprove={props.onApproveRedemption} onReject={props.onRejectRedemption} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-4 bg-gray-50 min-h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/10 text-brand-blue rounded-xl">
                    <AdminPanelIcon />
                </div>
                <h2 className="font-bold text-2xl text-brand-gray-dark">Admin Panel</h2>
            </div>
            <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                {renderTabContent()}
            </div>
            
            {/* Modals */}
            {isRewardModalOpen && <RewardModal onClose={() => setIsRewardModalOpen(false)} onSubmit={handleRewardSubmit} initialData={editingReward} />}
            {isMayorModalOpen && <MayorModal onClose={() => setIsMayorModalOpen(false)} onSubmit={handleMayorSubmit} initialData={editingMayor} />}
            {isWardModalOpen && <WardModal onClose={() => setIsWardModalOpen(false)} onSubmit={handleWardSubmit} initialData={editingWard} />}
            {isHeroSlideModalOpen && <HeroSlideModal onClose={() => setIsHeroSlideModalOpen(false)} onSubmit={handleHeroSlideSubmit} initialData={editingHeroSlide} />}
            {isMerchandiseModalOpen && <MerchandiseModal onClose={() => setIsMerchandiseModalOpen(false)} onSubmit={handleMerchandiseSubmit} initialData={editingMerchandise} />}
            {viewingReceipt && <ReceiptModal receipt={viewingReceipt} onClose={() => setViewingReceipt(null)} />}
        </div>
    );
};

export default AdminPage;