import React from 'react';
import { Activity } from '../types';
import { RssIcon, CampaignIcon } from './Icons';

interface LiveActivityFeedProps {
    activities: Activity[];
    onActivityClick: (activity: Activity) => void;
}

const ActivityItem: React.FC<{ activity: Activity, onClick: () => void }> = ({ activity, onClick }) => {
    const isAnnouncement = activity.isAnnouncement;
    const isClickable = !!activity.issueId;

    const content = (
        <>
            <div className="flex-shrink-0">
                {isAnnouncement ? (
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <CampaignIcon className="w-6 h-6" />
                    </div>
                ) : (
                    <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full" />
                )}
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex items-baseline text-sm">
                    {isAnnouncement ? (
                        <>
                            <span className="font-bold text-blue-800 flex-shrink-0 whitespace-nowrap">Admin:&nbsp;</span>
                            <span className="font-semibold text-blue-700 truncate min-w-0">{activity.description}</span>
                        </>
                    ) : (
                        <>
                            <span className={`font-semibold flex-shrink-0 whitespace-nowrap ${activity.user.isAdmin ? 'text-brand-blue-dark' : 'text-brand-gray-dark'}`}>{activity.user.name}&nbsp;</span>
                            <span className="text-gray-600 truncate min-w-0">{activity.description}</span>
                        </>
                    )}
                </div>
                <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            {activity.pointsChange !== 0 && !isAnnouncement && (
                <div className={`text-sm font-bold flex-shrink-0 ml-2 ${activity.pointsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.pointsChange > 0 ? '+' : ''}{activity.pointsChange} SP
                </div>
            )}
        </>
    );
    
    if (isClickable) {
        return (
            <button 
                onClick={onClick}
                className={`flex w-full items-center gap-3 p-3 text-left ${isAnnouncement ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors`}
            >
               {content}
            </button>
        )
    }

    return (
        <div className={`flex w-full items-center gap-3 p-3 ${isAnnouncement ? 'bg-blue-50' : ''}`}>
            {content}
        </div>
    );
}

const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ activities, onActivityClick }) => {
    return (
        <div className="my-10 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                    <RssIcon />
                </div>
                <div>
                    <h2 className="font-bold text-2xl text-brand-gray-dark">Live Community Activity</h2>
                    <p className="text-gray-600 text-sm">Click on an activity to see details.</p>
                </div>
            </div>
            <div className="space-y-2">
                {activities.slice(0, 5).map((activity) => ( // Show latest 5 activities
                     <div key={activity.id} className="bg-white rounded-xl shadow-subtle border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                        <ActivityItem activity={activity} onClick={() => onActivityClick(activity)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveActivityFeed;