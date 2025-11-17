import React, { useState } from 'react';
import { MOCK_ALL_BADGES } from '../constants';
import { Badge, UserRank, Activity, UserStats, PurchaseReceipt } from '../types';
// FIX: Added missing icon imports
// FIX: Added StarIcon to the import list.
import { UserCircleIcon, ClipboardListIcon, MegaphoneIcon, UsersIcon, GiftIcon, SparklesIcon, ForumIcon, ReplyIcon, RecyclingIcon, SuppliesIcon, AddTaskIcon, CampaignIcon, ReceiptIcon, TrophyIcon, StorefrontIcon, StarIcon } from '../components/Icons';
import ReceiptModal from '../components/ReceiptModal';

interface ProfilePageProps {
    user: UserRank;
    earnedBadgeIds: Set<number>;
    onLogout: () => void;
}

const ProfileHeader: React.FC<{ user: UserRank }> = ({ user }) => (
    <div className="flex flex-col items-center mb-6 text-center">
        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-3 shadow-lg border-4 border-white"/>
        <div className="flex items-center gap-2 justify-center">
            <h2 className="font-bold text-2xl text-brand-gray-dark">{user.name}</h2>
            {user.isAdmin && <span className="text-xs bg-brand-blue text-white font-bold px-2 py-1 rounded-full shadow-sm">ADMIN</span>}
        </div>
        <p className="text-gray-600 text-sm">{user.ward}</p>
        <div className="mt-4 bg-gradient-to-r from-brand-green to-brand-blue text-white font-bold py-2 px-6 rounded-full text-lg shadow-md flex items-center gap-2">
            <TrophyIcon className="w-6 h-6" />
            <span>{user.points.toLocaleString()} SP</span>
        </div>
    </div>
);

const ProfileTabs: React.FC<{ activeTab: string, setActiveTab: (tab: 'summary' | 'activity' | 'badges' | 'receipts') => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = ['summary', 'activity', 'badges', 'receipts'];
    return (
        <div className="mb-6 flex border-b border-gray-200">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`capitalize px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === tab ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500 hover:text-brand-green'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; value: number; label: string }> = ({ icon, value, label }) => (
    <div className="bg-white p-4 rounded-lg shadow-subtle text-center border border-gray-100">
        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-brand-blue">{icon}</div>
        <p className="text-2xl font-bold text-brand-gray-dark">{value}</p>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
);

const SummaryTab: React.FC<{ stats: UserStats }> = ({ stats }) => (
    <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<ClipboardListIcon className="w-7 h-7" />} value={stats.reportsMade} label="Issues Reported" />
        <StatCard icon={<MegaphoneIcon className="w-7 h-7" />} value={stats.eventsOrganized} label="Events Organized" />
        <StatCard icon={<UsersIcon className="w-7 h-7" />} value={stats.eventsJoined} label="Events Joined" />
        <StatCard icon={<RecyclingIcon className="w-7 h-7" />} value={stats.recyclingLogs} label="Recycling Logs" />
        <StatCard icon={<SuppliesIcon className="w-7 h-7" />} value={stats.supplyKitsPickedUp} label="Kits Used" />
        <StatCard icon={<AddTaskIcon className="w-7 h-7" />} value={stats.microActionsLogged} label="Micro-Actions" />
    </div>
);

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const iconMap: { [key in Activity['type']]: { icon: React.ReactNode, color: string } } = {
        reported: { icon: <ClipboardListIcon className="w-5 h-5"/>, color: 'bg-blue-100 text-blue-500' },
        organized: { icon: <MegaphoneIcon className="w-5 h-5"/>, color: 'bg-purple-100 text-purple-500' },
        joined: { icon: <UsersIcon className="w-5 h-5"/>, color: 'bg-yellow-100 text-yellow-500' },
        redeemed: { icon: <GiftIcon />, color: 'bg-red-100 text-red-500' },
        quiz_completed: { icon: <SparklesIcon />, color: 'bg-indigo-100 text-indigo-500' },
        forum_thread_created: { icon: <ForumIcon />, color: 'bg-teal-100 text-teal-500' },
        forum_reply: { icon: <ReplyIcon className="w-5 h-5"/>, color: 'bg-cyan-100 text-cyan-500' },
        recycled_item: { icon: <RecyclingIcon />, color: 'bg-lime-100 text-lime-500' },
        supply_kit_pickup: { icon: <SuppliesIcon />, color: 'bg-pink-100 text-pink-500' },
        micro_action_logged: { icon: <AddTaskIcon className="w-5 h-5" />, color: 'bg-orange-100 text-orange-500' },
        announcement: { icon: <CampaignIcon className="w-5 h-5" />, color: 'bg-blue-100 text-blue-500' },
        safety_kit_redeemed: { icon: <ReceiptIcon className="w-5 h-5" />, color: 'bg-green-100 text-green-500' },
        // FIX: Added missing merchandise_purchased type
        merchandise_purchased: { icon: <StorefrontIcon className="w-5 h-5" />, color: 'bg-gray-100 text-gray-500' },
        // FIX: Added missing 'merchandise_review' case to satisfy the Activity['type'] union.
        merchandise_review: { icon: <StarIcon className="w-5 h-5" />, color: 'bg-amber-100 text-amber-500' },
    };

    const { icon, color } = iconMap[activity.type] || { icon: <SparklesIcon />, color: 'bg-gray-100 text-gray-500' };
    const pointsClass = activity.pointsChange > 0 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <p className="text-sm text-gray-800">{activity.description}</p>
                <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
            </div>
            {activity.pointsChange !== 0 && (
                 <div className={`text-sm font-bold flex-shrink-0 ${pointsClass}`}>
                    {activity.pointsChange > 0 ? '+' : ''}{activity.pointsChange.toLocaleString()} SP
                </div>
            )}
        </div>
    );
};

const ActivityTab: React.FC<{ activities: Activity[] }> = ({ activities }) => (
    <div>
        {activities.length > 0 ? (
            <div className="space-y-1">
                {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
            </div>
        ) : (
            <p className="text-center text-gray-500 py-8">No recent activity. Get out there and make a difference!</p>
        )}
    </div>
);

const BadgeItem: React.FC<{badge: Badge, isEarned: boolean}> = ({ badge, isEarned }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-subtle transition-opacity border ${isEarned ? 'bg-white border-gray-100' : 'bg-gray-100 opacity-60 border-gray-200'}`}>
        <div className="flex-shrink-0">{badge.icon}</div>
        <div>
            <h4 className={`font-bold ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>{badge.name}</h4>
            <p className="text-sm text-gray-500">{badge.description}</p>
        </div>
    </div>
);

const BadgesTab: React.FC<{ earnedBadgeIds: Set<number> }> = ({ earnedBadgeIds }) => (
    <div className="space-y-3">
        {MOCK_ALL_BADGES.map(badge => (
            <BadgeItem key={badge.id} badge={badge} isEarned={earnedBadgeIds.has(badge.id)} />
        ))}
    </div>
);

const ReceiptsTab: React.FC<{ receipts: PurchaseReceipt[], onSelectReceipt: (receipt: PurchaseReceipt) => void }> = ({ receipts, onSelectReceipt }) => (
    <div>
        {receipts.length > 0 ? (
            <div className="space-y-3">
                {receipts.map(receipt => (
                    <div 
                        key={receipt.id} 
                        onClick={() => onSelectReceipt(receipt)}
                        className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-subtle cursor-pointer hover:bg-gray-50 border border-gray-100"
                    >
                        <img src={receipt.rewardImageUrl} alt={receipt.rewardTitle} className="w-16 h-12 object-cover rounded-md flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-bold text-gray-800">{receipt.rewardTitle}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(receipt.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            {receipt.pointsUsed > 0 && <p className="text-sm font-semibold text-red-500">-{receipt.pointsUsed.toLocaleString()} SP</p>}
                            {receipt.amountPaidNPR > 0 && <p className="text-sm font-semibold text-green-600">Rs. {receipt.amountPaidNPR.toLocaleString()}</p>}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 py-8">You have no purchase receipts yet.</p>
        )}
    </div>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ user, earnedBadgeIds, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'summary' | 'activity' | 'badges' | 'receipts'>('summary');
    const [viewingReceipt, setViewingReceipt] = useState<PurchaseReceipt | null>(null);
    
  return (
    <div className="container mx-auto px-4 py-4">
        <ProfileHeader user={user} />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div>
            {activeTab === 'summary' && <SummaryTab stats={user.stats} />}
            {activeTab === 'activity' && <ActivityTab activities={user.activity} />}
            {activeTab === 'badges' && <BadgesTab earnedBadgeIds={earnedBadgeIds} />}
            {activeTab === 'receipts' && <ReceiptsTab receipts={user.purchaseHistory} onSelectReceipt={setViewingReceipt} />}
        </div>
        
        <div className="mt-8 text-center">
             <button
                onClick={onLogout}
                className="w-full max-w-xs mx-auto bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
            >
                Logout
            </button>
        </div>
        {viewingReceipt && <ReceiptModal receipt={viewingReceipt} onClose={() => setViewingReceipt(null)} />}
    </div>
  );
};

export default ProfilePage;
