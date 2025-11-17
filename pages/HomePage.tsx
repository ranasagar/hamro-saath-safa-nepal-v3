import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Issue, IssueCategory, UserRank, UserStats, Challenge, Activity, Disturbance, DisturbanceCategory, DisturbanceImpact, FeatureFlags, Reward, Page, ForumThread } from '../types';
// FIX: Replaced missing icon components with suitable alternatives.
// FIX: Added missing icon imports
import { HomeIcon, TrophyIcon, CheckCircleIcon, UsersIcon, MegaphoneIcon, WarningIcon, TrashIcon, AddTaskIcon, FilterListIcon, SortIcon, ConstructionIcon, WaterDropIcon, BroomIcon, HardwareIcon, StorefrontIcon, ForumIcon, RecyclingIcon } from '../components/Icons';
import { COMMUNITY_GOAL_KG, COMMUNITY_PROGRESS_KG } from '../constants';
import Heatmap from '../components/Heatmap';
import IssueDetailModal from '../components/IssueDetailModal';
import OrganizeEventModal from '../components/OrganizeEventModal';
import CompleteEventModal from '../components/CompleteEventModal';
import LiveActivityFeed from '../components/LiveActivityFeed';

interface HomePageProps {
  currentUser: UserRank | null;
  addPoints?: (amount: number, message: string, userName?: string) => void;
  updateUserStats?: (stat: keyof UserStats, value: number | boolean, userName?: string) => void;
  // FIX: Replaced Omit with its equivalent implementation using Pick and Exclude to resolve a TypeScript parsing issue.
  logActivity?: (userName: string, activity: Pick<Activity, Exclude<keyof Activity, 'id' | 'timestamp' | 'user'>>) => void;
  activeChallenge: Challenge | null;
  allUsers: UserRank[];
  allActivities: Activity[];
  issues: Issue[];
  disturbances: Disturbance[];
  rewards: Reward[];
  forumThreads: ForumThread[];
  setCurrentPage: (page: Page) => void;
  onUpdateIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  onOrganizeSubmit?: (issue: Issue, details: { date: string; time: string; volunteersNeeded: number; }) => void;
  onJoinEvent?: (issue: Issue) => void;
  onCompleteSubmit?: (issue: Issue, data: { photo: File; }) => void;
  onRequestLogin?: () => void;
  onRequestRegister?: () => void;
  onPromptLogin?: () => void;
  onOpenReportModal?: () => void;
  onOpenDisturbanceModal?: () => void;
  onOpenMicroActionsModal?: () => void;
  featureFlags: FeatureFlags;
  onViewThread: (threadId: number) => void;
}

const CommunityGoalCard: React.FC<{ progress: number; goal: number; animationDelay: string; }> = ({ progress, goal, animationDelay }) => (
    <div className="bg-white p-4 rounded-xl shadow-subtle text-center transform transition-transform duration-300 hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green-dark mx-auto mb-3">
            <RecyclingIcon className="w-7 h-7" />
        </div>
        <p className="text-sm text-brand-gray-dark font-medium">Recycling Goal</p>
        <p className="text-2xl font-bold text-brand-gray-dark mt-1">{((progress / goal) * 100).toFixed(0)}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-brand-green h-2.5 rounded-full" 
            style={{ width: `${(progress / goal) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-right font-semibold text-gray-500 mt-1">{progress.toLocaleString()} / {goal.toLocaleString()} kg</p>
    </div>
);

const StickyActionHeader: React.FC<{
  onOpenReportModal?: () => void;
  onOpenDisturbanceModal?: () => void;
  onOpenMicroActionsModal?: () => void;
  featureFlags: FeatureFlags;
}> = ({ onOpenReportModal, onOpenDisturbanceModal, onOpenMicroActionsModal, featureFlags }) => {
  const buttonStyle = "flex flex-col items-center gap-1 font-semibold text-xs p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100";
  
  return (
    <div className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md z-40 animate-fadeInDown">
      <div className="container mx-auto px-4 py-2 flex justify-around items-center">
        {featureFlags.microActions && (
          <button onClick={onOpenMicroActionsModal} className={`${buttonStyle} text-brand-blue`}>
            <AddTaskIcon className="w-6 h-6"/>
            <span>Quick Action</span>
          </button>
        )}
        <button onClick={onOpenReportModal} className={`${buttonStyle} text-brand-green`}>
          <TrashIcon className="w-6 h-6" />
          <span>Report Issue</span>
        </button>
        {featureFlags.disturbances && (
          <button onClick={onOpenDisturbanceModal} className={`${buttonStyle} text-amber-500`}>
            <WarningIcon className="w-6 h-6" />
            <span>Disturbance</span>
          </button>
        )}
      </div>
    </div>
  );
};


const ChallengeBanner: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-300 to-orange-400 text-yellow-900 p-4 rounded-lg shadow-lg mb-6 flex items-center space-x-4">
      <MegaphoneIcon className="w-8 h-8 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-lg">{challenge.title}</h3>
        <p className="text-sm">{challenge.description}</p>
      </div>
    </div>
  )
}

const IssueCard: React.FC<{ issue: Issue, onSelect: () => void, activeChallenge: Challenge | null }> = ({ issue, onSelect, activeChallenge }) => {
  const getStatusColor = () => {
    switch (issue.status) {
      case 'Reported': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Solved': return 'bg-green-100 text-green-800';
    }
  };
  
  const categoryIconMap: Record<IssueCategory, React.ReactNode> = {
    [IssueCategory.Litter]: <TrashIcon className="w-5 h-5" />,
    [IssueCategory.OverflowingBin]: <TrashIcon className="w-5 h-5" />,
    // FIX: Replaced missing icon components with suitable alternatives.
    [IssueCategory.ConstructionDebris]: <ConstructionIcon className="w-5 h-5" />,
    [IssueCategory.BlockedDrainage]: <WaterDropIcon className="w-5 h-5" />,
    [IssueCategory.Graffiti]: <BroomIcon className="w-5 h-5" />,
    [IssueCategory.BrokenBench]: <HardwareIcon className="w-5 h-5" />,
  };
  
  const volunteersJoined = issue.participants?.length ?? 0;
  const isChallengeIssue = activeChallenge && issue.ward === activeChallenge.ward;

  return (
    <div 
      onClick={onSelect} 
      className={`bg-white rounded-lg shadow-subtle overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer border ${isChallengeIssue ? 'border-brand-green shadow-lg' : 'border-gray-100'}`}
    >
      <img src={issue.imageUrl} alt={issue.category} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
            <div>
                 <h3 className="font-bold text-md leading-tight text-brand-gray-dark">{issue.category}</h3>
                <p className="text-xs text-gray-500">{issue.location}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor()}`}>{issue.status}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{issue.description}</p>

        {issue.status === 'In Progress' && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-brand-blue h-2 rounded-full" style={{ width: `${(volunteersJoined / issue.volunteersNeeded!) * 100}%` }}></div>
            </div>
            <p className="text-xs text-center mt-1.5 text-gray-600">{volunteersJoined} of {issue.volunteersNeeded} volunteers joined</p>
          </div>
        )}

        <div className="border-t pt-3 mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
                <img src={issue.userAvatar} alt={issue.user} className="w-6 h-6 rounded-full mr-2" />
                <span className="font-semibold text-gray-600">{issue.user}</span>
            </div>
            <span>{issue.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const ViewToggle: React.FC<{ view: 'map' | 'list'; setView: (view: 'map' | 'list') => void }> = ({ view, setView }) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full shadow-sm bg-white border border-gray-200" role="group">
                <button
                    type="button"
                    onClick={() => setView('map')}
                    className={`px-4 py-2 text-sm font-semibold rounded-l-full transition-colors duration-200 ${
                        view === 'map'
                            ? 'bg-brand-green text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Map View
                </button>
                <button
                    type="button"
                    onClick={() => setView('list')}
                    className={`px-4 py-2 text-sm font-semibold rounded-r-full transition-colors duration-200 ${
                        view === 'list'
                            ? 'bg-brand-green text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    List View
                </button>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; animationDelay: string; }> = ({ icon, label, value, animationDelay }) => (
    <div className="bg-white p-4 rounded-xl shadow-subtle text-center transform transition-transform duration-300 hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green-dark mx-auto mb-3">
            {icon}
        </div>
        <p className="text-3xl font-bold text-brand-gray-dark animate-pulse-number">{value}</p>
        <p className="text-sm text-brand-gray-dark font-medium">{label}</p>
    </div>
);

const FilterControls: React.FC<{
    filters: { status: string; category: string };
    setFilters: React.Dispatch<React.SetStateAction<{ status: string; category: string }>>;
    sortBy: 'newest' | 'oldest';
    setSortBy: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
}> = ({ filters, setFilters, sortBy, setSortBy }) => {
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-subtle mb-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-grow w-full sm:w-auto">
                <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-brand-green focus:ring-brand-green text-gray-900 bg-white">
                    <option value="all">All Statuses</option>
                    <option value="Reported">Reported</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Solved">Solved</option>
                </select>
            </div>
            <div className="flex-grow w-full sm:w-auto">
                <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-brand-green focus:ring-brand-green text-gray-900 bg-white">
                    <option value="all">All Categories</option>
                    {Object.values(IssueCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => setSortBy('newest')} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'newest' ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    Newest
                </button>
                <button onClick={() => setSortBy('oldest')} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'oldest' ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    Oldest
                </button>
            </div>
        </div>
    );
};

const TopHeroesCarousel: React.FC<{ users: UserRank[] }> = ({ users }) => {
  const topUsers = [...users].sort((a, b) => b.points - a.points).slice(0, 10);
  const marqueeContent = [...topUsers, ...topUsers]; // Duplicate for seamless loop

  const getRankStyling = (rankIndex: number) => {
    switch (rankIndex) {
      case 0: // Gold
        return {
          card: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-amber-300/50',
          name: 'text-white',
          points: 'text-white',
        };
      case 1: // Silver
        return {
          card: 'bg-gradient-to-br from-slate-400 to-gray-500 text-white shadow-slate-400/50',
          name: 'text-white',
          points: 'text-white',
        };
      case 2: // Bronze
        return {
          card: 'bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-orange-300/50',
          name: 'text-white',
          points: 'text-white',
        };
      default:
        return {
          card: 'bg-white/30 backdrop-blur-lg border border-white/20 hover:border-white/40',
          name: 'text-brand-gray-dark',
          points: 'text-amber-500',
        };
    }
  };

  return (
    <div className="my-10 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
      <h2 className="text-2xl font-bold mb-4 text-center">Today's Top Heroes</h2>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-scroll-x group-hover:[animation-play-state:paused]">
          {marqueeContent.map((user, index) => {
            const rankIndex = index % topUsers.length;
            const styles = getRankStyling(rankIndex);

            return (
              <div key={`${user.name}-${index}`} className="flex-shrink-0 w-48 sm:w-64 mx-4">
                <div className={`${styles.card} rounded-2xl p-4 shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-3 shadow-md border-4 border-white/50" />
                  <p className={`font-bold text-lg truncate ${styles.name}`}>{user.name}</p>
                  <div className={`flex items-center justify-center font-bold mt-1 ${styles.points}`}>
                    <TrophyIcon className="w-5 h-5 mr-1" />
                    <span>{user.points.toLocaleString()} SP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FeaturedRewardsCarousel: React.FC<{ rewards: Reward[]; onNavigate: () => void }> = ({ rewards, onNavigate }) => {
  const featuredRewards = rewards.filter(r => r.listingTier === 'Gold');

  if (featuredRewards.length === 0) {
    return null;
  }

  return (
    <div className="my-10 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
          <StorefrontIcon />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-brand-gray-dark">Featured Rewards</h2>
          <p className="text-gray-600 text-sm">Top picks from our marketplace.</p>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
        {featuredRewards.map(reward => (
          <div 
            key={reward.id} 
            onClick={onNavigate} 
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-subtle overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
          >
            <img src={reward.imageUrl} alt={reward.title} className="w-full h-24 object-cover" />
            <div className="p-3">
              <h4 className="font-bold text-sm truncate">{reward.title}</h4>
              <p className="text-xs text-gray-500">{reward.partner}</p>
              <p className="font-bold text-brand-green mt-1">{reward.cost.toLocaleString()} SP</p>
            </div>
          </div>
        ))}
         <div 
            onClick={onNavigate} 
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-subtle overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center justify-center text-center p-3 border-2 border-dashed hover:border-brand-green"
          >
            <p className="font-semibold text-brand-green">View All</p>
            <p className="text-xs text-gray-500">Rewards</p>
          </div>
      </div>
    </div>
  );
};

const TopDiscussions: React.FC<{ threads: ForumThread[]; onViewThread: (id: number) => void }> = ({ threads, onViewThread }) => {
  const topThreads = [...threads]
    .sort((a, b) => b.posts[0].score - a.posts[0].score)
    .slice(0, 3);

  if (topThreads.length === 0) {
    return null;
  }

  return (
    <div className="my-10 animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/10 text-brand-blue rounded-xl">
          <ForumIcon />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-brand-gray-dark">Top Discussions</h2>
          <p className="text-gray-600 text-sm">Join the conversation.</p>
        </div>
      </div>
      <div className="space-y-3">
        {topThreads.map(thread => (
          <div
            key={thread.id}
            onClick={() => onViewThread(thread.id)}
            className="bg-white rounded-lg shadow-subtle p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-gray-100"
          >
            <h4 className="font-bold text-md text-brand-blue-dark truncate">{thread.title}</h4>
            <p className="text-xs text-gray-500 mt-1">
              Started by <span className="font-semibold">{thread.posts[0].user}</span> &bull; {thread.posts[0].score} points
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


const HomePage: React.FC<HomePageProps> = ({ 
    currentUser, 
    issues,
    disturbances,
    rewards,
    forumThreads,
    setCurrentPage,
    onOrganizeSubmit,
    onJoinEvent,
    onCompleteSubmit,
    activeChallenge, 
    allUsers, 
    allActivities,
    onRequestLogin, 
    onRequestRegister, 
    onPromptLogin, 
    onOpenReportModal,
    onOpenDisturbanceModal,
    onOpenMicroActionsModal,
    featureFlags,
    onViewThread,
}) => {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [organizingIssue, setOrganizingIssue] = useState<Issue | null>(null);
  const [completingIssue, setCompletingIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({ status: 'all', category: 'all' });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyHeader(!entry.isIntersecting);
      },
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);

  const communityStats = useMemo(() => ({
      issuesSolved: issues.filter(i => i.status === 'Solved').length,
      activeHeroes: allUsers.length,
      totalPoints: allUsers.reduce((sum, user) => sum + user.points, 0),
  }), [issues, allUsers]);

  // This effect ensures that the data shown in the modal is always in sync
  // with the main application state, preventing stale data after an action.
  useEffect(() => {
    if (selectedIssue) {
      const updatedIssueData = issues.find(i => i.id === selectedIssue.id);
      if (updatedIssueData) {
        setSelectedIssue(updatedIssueData);
      } else {
        // Issue might have been deleted, close the modal
        setSelectedIssue(null);
      }
    }
  }, [issues]);

  const filteredAndSortedIssues = useMemo(() => {
      return issues
          .filter(issue => {
              const statusMatch = filters.status === 'all' || issue.status === filters.status;
              const categoryMatch = filters.category === 'all' || issue.category === filters.category;
              return statusMatch && categoryMatch;
          })
          .sort((a, b) => {
              if (sortBy === 'newest') {
                  return b.id - a.id;
              } else {
                  return a.id - b.id;
              }
          });
  }, [issues, filters, sortBy]);
  
  const handleFindCleanUp = () => {
    hotspotsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSelectIssue = (issue: Issue) => {
      if (currentUser) {
          setSelectedIssue(issue);
      } else {
          onPromptLogin?.();
      }
  };

  const handleActivityClick = (activity: Activity) => {
    if (activity.issueId) {
      const relatedIssue = issues.find(issue => issue.id === activity.issueId);
      if (relatedIssue) {
        handleSelectIssue(relatedIssue);
      }
    }
  };
  
  const handleOpenOrganizeModal = (issue: Issue) => {
    setSelectedIssue(null);
    setOrganizingIssue(issue);
  };

  const handleOrganizeSubmitWrapper = (details: { date: string; time: string; volunteersNeeded: number; }) => {
      if (organizingIssue) {
          onOrganizeSubmit?.(organizingIssue, details);
      }
      setOrganizingIssue(null);
  };

  const handleOpenCompleteModal = (issue: Issue) => {
    setSelectedIssue(null);
    setCompletingIssue(issue);
  };

  const handleCompleteSubmitWrapper = (data: { photo: File }) => {
    if (completingIssue) {
        onCompleteSubmit?.(completingIssue, data);
    }
    setCompletingIssue(null);
  };
  
  const handleJoinEventWrapper = (issueToJoin: Issue) => {
      // Simply call the parent handler. The useEffect will sync the modal state.
      onJoinEvent?.(issueToJoin);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {showStickyHeader && currentUser && (
          <StickyActionHeader
            onOpenReportModal={onOpenReportModal}
            onOpenDisturbanceModal={onOpenDisturbanceModal}
            onOpenMicroActionsModal={onOpenMicroActionsModal}
            featureFlags={featureFlags}
          />
        )}
        {activeChallenge && <ChallengeBanner challenge={activeChallenge} />}
        {/* Hero Section */}
        <div ref={heroSectionRef} className="text-center pt-8">
             {currentUser ? (
                <>
                    <h1 className="text-4xl font-extrabold text-brand-gray-dark mb-2 animate-fadeInUp">
                        Welcome, {currentUser.name.split(' ')[0]}!
                    </h1>
                    <p className="text-lg text-brand-gray-dark mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        Let's make our community cleaner, together.
                    </p>
                </>
             ) : (
                <>
                    <h1 className="text-4xl font-extrabold text-brand-gray-dark mb-2 animate-fadeInUp">
                        Welcome to Safa Nepal!
                    </h1>
                    <p className="text-lg text-brand-gray-dark mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        Join the movement to make our communities cleaner.
                    </p>
                </>
             )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<CheckCircleIcon className="w-7 h-7" />} label="Issues Solved" value={communityStats.issuesSolved.toLocaleString()} animationDelay="0.2s" />
                <StatCard icon={<UsersIcon className="w-7 h-7" />} label="Active Safa Heroes" value={communityStats.activeHeroes.toLocaleString()} animationDelay="0.3s" />
                <StatCard icon={<TrophyIcon className="w-7 h-7"/>} label="Total Community SP" value={communityStats.totalPoints.toLocaleString()} animationDelay="0.4s" />
                <CommunityGoalCard progress={COMMUNITY_PROGRESS_KG} goal={COMMUNITY_GOAL_KG} animationDelay="0.5s" />
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                 {currentUser ? (
                    <>
                        {featureFlags.microActions && (
                            <button onClick={onOpenMicroActionsModal} className="bg-brand-blue text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform flex items-center justify-center gap-2">
                               <AddTaskIcon /> Log a Quick Action
                            </button>
                        )}
                        <button onClick={onOpenReportModal} className="bg-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                            Report a Clean-up Issue
                        </button>
                         {featureFlags.disturbances && (
                            <button onClick={onOpenDisturbanceModal} className="bg-amber-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform flex items-center justify-center gap-2">
                               <WarningIcon className="w-5 h-5" /> Report a Disturbance
                            </button>
                        )}
                        <button onClick={handleFindCleanUp} className="bg-white text-brand-green font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform border-2 border-brand-green">
                            Find a Clean-Up
                        </button>
                    </>
                 ) : (
                    <>
                        <button onClick={onRequestLogin} className="bg-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                           Login to Participate
                        </button>
                        <button onClick={onRequestRegister} className="bg-white text-brand-green font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform border-2 border-brand-green">
                            Create an Account
                        </button>
                    </>
                 )}
            </div>
        </div>

        {/* Community Hotspots Section */}
        <div ref={hotspotsRef} className="pt-12">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                    <HomeIcon />
                </div>
                <div>
                  <h2 className="font-bold text-2xl text-brand-gray-dark">Community Hotspots</h2>
                  <p className="text-gray-600 text-sm">See where our community is making a difference in real-time.</p>
                </div>
            </div>
            
            <FilterControls filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} />
            
            <ViewToggle view={view} setView={setView} />
            {view === 'map' ? (
                <Heatmap issues={filteredAndSortedIssues} disturbances={disturbances} onSelectIssue={handleSelectIssue} activeChallenge={activeChallenge} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedIssues.map(issue => (
                        <IssueCard key={issue.id} issue={issue} onSelect={() => handleSelectIssue(issue)} activeChallenge={activeChallenge} />
                    ))}
                </div>
            )}
        </div>
      
        {currentUser && <TopHeroesCarousel users={allUsers} />}
        
        {currentUser && (
            <FeaturedRewardsCarousel rewards={rewards} onNavigate={() => setCurrentPage('rewards')} />
        )}
        
        {currentUser && featureFlags.forum && <TopDiscussions threads={forumThreads} onViewThread={onViewThread} />}

        {currentUser && featureFlags.liveFeed && <LiveActivityFeed activities={allActivities} onActivityClick={handleActivityClick} />}

        {currentUser && selectedIssue && <IssueDetailModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} onOrganize={handleOpenOrganizeModal} onJoin={handleJoinEventWrapper} onComplete={handleOpenCompleteModal} currentUser={currentUser} />}
        {currentUser && organizingIssue && <OrganizeEventModal issue={organizingIssue} onClose={() => setOrganizingIssue(null)} onSubmit={handleOrganizeSubmitWrapper} />}
        {currentUser && completingIssue && <CompleteEventModal issue={completingIssue} onClose={() => setCompletingIssue(null)} onSubmit={handleCompleteSubmitWrapper} />}
      
    </div>
  );
};

export default HomePage;