

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import PublicHomePage from './pages/PublicHomePage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import RewardsPage from './pages/RewardsPage';
import CivicSenseHubPage from './pages/CivicSenseHubPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForumPage from './pages/ForumPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadModal from './components/CreateThreadModal';
import RecyclePage from './pages/RecyclePage';
import SuppliesPage from './pages/SuppliesPage';
import MicroActionsModal from './components/MicroActionsModal';
import AdminPage from './pages/AdminPage';
import { Page, UserRank, UserStats, Badge, Ward, WardRank, Challenge, Activity, ForumThread, ForumPost, RecyclingMaterial, SupplyPoint, MicroAction, Issue, IssueCategory, Disturbance, DisturbanceCategory, DisturbanceImpact, Reward, FeatureFlags, FeatureFlag, MayorProfile, SafetyKitRedemption, ToastData, PurchaseReceipt, AdminPurchaseReceipt, HeroSlide, MerchandiseItem, MerchandiseReview } from './types';
import Toast from './components/Toast';
import { INITIAL_USERS, MOCK_ALL_BADGES, INITIAL_WARDS, MOCK_CHALLENGES, INITIAL_FORUM_THREADS, REWARD_POINTS, INITIAL_ISSUES, INITIAL_DISTURBANCES, INITIAL_REWARDS, INITIAL_FEATURE_FLAGS, INITIAL_MAYOR_PROFILES, INITIAL_SAFETY_KIT_REDEMPTIONS, SP_TO_NPR_RATE, INITIAL_HERO_SLIDES, INITIAL_MERCHANDISE } from './constants';
import ReportModal from './components/ReportModal';
import ReportDisturbanceModal from './components/ReportDisturbanceModal';
import ReceiptModal from './components/ReceiptModal';

const App: React.FC = () => {
  // Load state from localStorage or use mocks
  const [allUsers, setAllUsers] = useState<UserRank[]>(() => {
    const saved = localStorage.getItem('safaNepal-users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [issues, setIssues] = useState<Issue[]>(() => {
      const saved = localStorage.getItem('safaNepal-issues');
      return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });
  const [disturbances, setDisturbances] = useState<Disturbance[]>(() => {
      const saved = localStorage.getItem('safaNepal-disturbances');
      return saved ? JSON.parse(saved) : INITIAL_DISTURBANCES;
  });
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(() => {
      const saved = localStorage.getItem('safaNepal-forumThreads');
      return saved ? JSON.parse(saved) : INITIAL_FORUM_THREADS;
  });
  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('safaNepal-rewards');
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });
   const [merchandise, setMerchandise] = useState<MerchandiseItem[]>(() => {
    const saved = localStorage.getItem('safaNepal-merchandise');
    return saved ? JSON.parse(saved) : INITIAL_MERCHANDISE;
  });
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('safaNepal-heroSlides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(() => {
    const saved = localStorage.getItem('safaNepal-featureFlags');
    return saved ? JSON.parse(saved) : INITIAL_FEATURE_FLAGS;
  });
  const [announcements, setAnnouncements] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('safaNepal-announcements');
    return saved ? JSON.parse(saved) : [];
  });
   const [mayorProfiles, setMayorProfiles] = useState<MayorProfile[]>(() => {
    const saved = localStorage.getItem('safaNepal-mayorProfiles');
    return saved ? JSON.parse(saved) : INITIAL_MAYOR_PROFILES;
  });
  const [wards, setWards] = useState<Ward[]>(() => {
    const saved = localStorage.getItem('safaNepal-wards');
    return saved ? JSON.parse(saved) : INITIAL_WARDS;
  });
  const [safetyKitRedemptions, setSafetyKitRedemptions] = useState<SafetyKitRedemption[]>(() => {
    const saved = localStorage.getItem('safaNepal-safetyKitRedemptions');
    return saved ? JSON.parse(saved) : INITIAL_SAFETY_KIT_REDEMPTIONS;
  });
  const [currentUser, setCurrentUser] = useState<UserRank | null>(() => {
    const savedUser = localStorage.getItem('safaNepal-currentUser');
    if (savedUser) {
      const userFromFile = JSON.parse(savedUser);
      if (userFromFile) {
        // Ensure user data is up-to-date with the main list
        return allUsers.find(u => u.name === userFromFile.name) || null;
      }
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [toast, setToast] = useState<ToastData | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [forumSortBy, setForumSortBy] = useState<'top' | 'newest'>('top');
  
  // Modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDisturbanceModalOpen, setIsDisturbanceModalOpen] = useState(false);
  const [isMicroActionsModalOpen, setIsMicroActionsModalOpen] = useState(false);
  const [isCreateThreadModalOpen, setIsCreateThreadModalOpen] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<PurchaseReceipt | null>(null);

  // Derived state
  const individualRanks = useMemo(() => [...allUsers].sort((a, b) => b.points - a.points).map((user, index) => ({ ...user, rank: index + 1 })), [allUsers]);
  const wardRanks = useMemo(() => {
    const pointsByWard = allUsers.reduce((acc, user) => {
      acc[user.ward] = (acc[user.ward] || 0) + user.points;
      return acc;
    }, {} as { [key: string]: number });
    return Object.entries(pointsByWard)
      .map(([name, points]) => ({ name, points, rank: 0 }))
      .sort((a, b) => b.points - a.points)
      .map((ward, index) => ({ ...ward, rank: index + 1 }));
  }, [allUsers]);
  const allActivities = useMemo(() => {
    const userActivities = allUsers.flatMap(u => u.activity);
    return [...announcements, ...userActivities].sort((a, b) => b.timestamp - a.timestamp);
  }, [allUsers, announcements]);
  const allPurchases = useMemo<AdminPurchaseReceipt[]>(() => {
    return allUsers.flatMap(user => 
        user.purchaseHistory.map(receipt => ({
            ...receipt,
            userAvatar: user.avatar
        }))
    ).sort((a, b) => b.timestamp - a.timestamp);
  }, [allUsers]);
  const activeChallenge = useMemo(() => MOCK_CHALLENGES.find(c => c.isActive) || null, []);

  // Sync state to localStorage
  useEffect(() => { localStorage.setItem('safaNepal-users', JSON.stringify(allUsers)); }, [allUsers]);
  useEffect(() => { localStorage.setItem('safaNepal-issues', JSON.stringify(issues)); }, [issues]);
  useEffect(() => { localStorage.setItem('safaNepal-disturbances', JSON.stringify(disturbances)); }, [disturbances]);
  useEffect(() => { localStorage.setItem('safaNepal-forumThreads', JSON.stringify(forumThreads)); }, [forumThreads]);
  useEffect(() => { localStorage.setItem('safaNepal-rewards', JSON.stringify(rewards)); }, [rewards]);
  useEffect(() => { localStorage.setItem('safaNepal-merchandise', JSON.stringify(merchandise)); }, [merchandise]);
  useEffect(() => { localStorage.setItem('safaNepal-heroSlides', JSON.stringify(heroSlides)); }, [heroSlides]);
  useEffect(() => { localStorage.setItem('safaNepal-featureFlags', JSON.stringify(featureFlags)); }, [featureFlags]);
  useEffect(() => { localStorage.setItem('safaNepal-announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('safaNepal-mayorProfiles', JSON.stringify(mayorProfiles)); }, [mayorProfiles]);
  useEffect(() => { localStorage.setItem('safaNepal-wards', JSON.stringify(wards)); }, [wards]);
  useEffect(() => { localStorage.setItem('safaNepal-safetyKitRedemptions', JSON.stringify(safetyKitRedemptions)); }, [safetyKitRedemptions]);
  useEffect(() => { localStorage.setItem('safaNepal-currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  
  // Notification check effect
  useEffect(() => {
    if (currentUser?.notifications?.length) {
      const notification = currentUser.notifications[0];
      setToast({ message: notification });
      // Clear notification after showing
      setAllUsers(prevUsers => prevUsers.map(u => 
        u.name === currentUser.name 
          ? { ...u, notifications: u.notifications?.slice(1) }
          : u
      ));
    }
  }, [currentUser]);

  // Handlers
  const addPoints = (amount: number, message: string, userName?: string) => {
    const targetUser = userName || currentUser?.name;
    if (!targetUser) return;

    setAllUsers(prevUsers => prevUsers.map(user =>
      user.name === targetUser ? { ...user, points: user.points + amount } : user
    ));
    setToast({ message, isReward: true });
  };
  
  const updateUserStats = (stat: keyof UserStats, value: number | boolean, userName?: string) => {
      const targetUser = userName || currentUser?.name;
      if (!targetUser) return;
      setAllUsers(prevUsers => prevUsers.map(user => {
          if (user.name === targetUser) {
              const newStats = { ...user.stats };
              if (stat === 'quizCompleted') {
                  if (typeof value === 'boolean') {
                      newStats.quizCompleted = value;
                  }
              } else {
                  // FIX: The compiler cannot infer that `stat` refers to a numeric property
                  // inside this `else` block. This leads to an error when trying to add
                  // `newStats[stat]` (which is inferred as `number | boolean`) to `value`.
                  // Adding a type guard for `currentValue` resolves the ambiguity and ensures
                  // both operands are numbers.
                  const currentValue = newStats[stat];
                  if (typeof value === 'number' && typeof currentValue === 'number') {
                      // Since we've established `stat` is not 'quizCompleted', we can safely
                      // cast it to a numeric-only key type for the assignment.
                      newStats[stat as Exclude<keyof UserStats, 'quizCompleted'>] = currentValue + value;
                  }
              }
              return { ...user, stats: newStats };
          }
          return user;
      }));
  };

  const logActivity = (userName: string, activity: Pick<Activity, Exclude<keyof Activity, 'id' | 'timestamp' | 'user'>>) => {
      const user = allUsers.find(u => u.name === userName);
      if (!user) return;

      const newActivity: Activity = {
          id: `act_${Date.now()}_${Math.random()}`,
          timestamp: Date.now(),
          user: { name: user.name, avatar: user.avatar, isAdmin: user.isAdmin },
          ...activity,
      };

      setAllUsers(prevUsers => prevUsers.map(u =>
          u.name === userName
              ? { ...u, activity: [newActivity, ...u.activity].slice(0, 50) } // Keep last 50 activities
              : u
      ));
  };
  
  const handleLogin = (email: string) => {
    const userToLogin = allUsers.find(user => user.name.toLowerCase().replace(' ', '') + '@safa.com' === email);
    if (userToLogin) {
      setCurrentUser(userToLogin);
      return true;
    }
    return false;
  };
  
  const handleLogout = () => setCurrentUser(null);

  const handleRegister = (newUser: Omit<UserRank, 'rank' | 'points' | 'stats' | 'activity' | 'purchaseHistory' | 'notifications'>) => {
      const newUserData: UserRank = {
        ...newUser,
        rank: 0,
        points: 100, // Starting points
        stats: { reportsMade: 0, eventsOrganized: 0, eventsJoined: 0, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 },
        activity: [],
        purchaseHistory: [],
        notifications: [],
      };
      setAllUsers(prev => [...prev, newUserData]);
      setCurrentUser(newUserData);
  };
  
  const handleReportSubmit = (data: { category: IssueCategory; description: string; photo: File; }) => {
    if (!currentUser) return;
    const newIssue: Issue = {
      id: Date.now(),
      user: currentUser.name,
      userAvatar: currentUser.avatar,
      category: data.category,
      imageUrl: URL.createObjectURL(data.photo),
      location: 'New Baneshwor, Kathmandu',
      ward: 'Ward 10, Kathmandu',
      description: data.description,
      timestamp: 'Just now',
      status: 'Reported',
      coordinates: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
    };
    setIssues(prev => [newIssue, ...prev]);
    addPoints(REWARD_POINTS.REPORT_ISSUE, `+${REWARD_POINTS.REPORT_ISSUE} SP for your report!`);
    updateUserStats('reportsMade', 1);
    logActivity(currentUser.name, { type: 'reported', description: `reported a new issue: '${data.category}'`, pointsChange: REWARD_POINTS.REPORT_ISSUE, issueId: newIssue.id });
    setIsReportModalOpen(false);
  };
  
  const handleDisturbanceReport = (data: { category: DisturbanceCategory; impacts: DisturbanceImpact[]; }) => {
    if (!currentUser) return;

    const newDisturbance: Disturbance = {
        id: Date.now(),
        category: data.category,
        impacts: data.impacts,
        location: 'Asan, Kathmandu',
        coordinates: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
        timestamp: Date.now(),
        reports: 1,
        reporters: [currentUser.name],
    };

    setDisturbances(prev => [newDisturbance, ...prev]);
    addPoints(20, "+20 SP for reporting a disturbance.");
    updateUserStats('disturbanceReports', 1);
    setIsDisturbanceModalOpen(false);
  };

  const handleOrganizeSubmit = (issue: Issue, details: { date: string; time: string; volunteersNeeded: number; }) => {
    setIssues(prevIssues => prevIssues.map(i =>
        i.id === issue.id
            ? {
                ...i,
                status: 'In Progress',
                eventDetails: details,
                volunteersNeeded: details.volunteersNeeded,
                participants: [currentUser!.name]
            }
            : i
    ));
    logActivity(currentUser!.name, { type: 'organized', description: `organized a clean-up for '${issue.category}'`, pointsChange: 0, issueId: issue.id });
  };
  
  const handleJoinEvent = (issue: Issue) => {
    setIssues(prevIssues => prevIssues.map(i =>
        i.id === issue.id
            ? { ...i, participants: [...(i.participants || []), currentUser!.name] }
            : i
    ));
    logActivity(currentUser!.name, { type: 'joined', description: `joined the clean-up for '${issue.category}'`, pointsChange: 0, issueId: issue.id });
  };

  const handleCompleteSubmit = (issue: Issue, data: { photo: File; }) => {
    const organizer = allUsers.find(u => u.name === issue.user);
    if (organizer) {
        addPoints(REWARD_POINTS.COMPLETE_ORGANIZED_EVENT, `+${REWARD_POINTS.COMPLETE_ORGANIZED_EVENT} SP bonus for organizing!`, organizer.name);
        updateUserStats('eventsOrganized', 1, organizer.name);
    }
    issue.participants?.forEach(participantName => {
        if (participantName !== issue.user) {
            addPoints(REWARD_POINTS.PARTICIPATE_IN_EVENT, `+${REWARD_POINTS.PARTICIPATE_IN_EVENT} SP for participating!`, participantName);
            updateUserStats('eventsJoined', 1, participantName);
        }
    });
    setIssues(prevIssues => prevIssues.map(i =>
        i.id === issue.id
            ? { ...i, status: 'Solved', afterImageUrl: URL.createObjectURL(data.photo) }
            : i
    ));
  };
  
  const handleLogRecycle = (materials: RecyclingMaterial[]) => {
      if (!currentUser) return;
      addPoints(REWARD_POINTS.RECYCLE_LOG, `+${REWARD_POINTS.RECYCLE_LOG} SP for recycling!`);
      updateUserStats('recyclingLogs', 1);
      logActivity(currentUser.name, { type: 'recycled_item', description: `logged recycling of ${materials.join(', ')}`, pointsChange: REWARD_POINTS.RECYCLE_LOG });
  };
  
  const handleLogSupplyPickup = (supplyPoint: SupplyPoint) => {
      if (!currentUser) return;
      addPoints(REWARD_POINTS.SUPPLY_KIT_PICKUP, `+${REWARD_POINTS.SUPPLY_KIT_PICKUP} SP for picking up a kit!`);
      updateUserStats('supplyKitsPickedUp', 1);
      updateUserStats('supplyKitsToday', 1);
      logActivity(currentUser.name, { type: 'supply_kit_pickup', description: `picked up a clean-up kit from ${supplyPoint.name}`, pointsChange: REWARD_POINTS.SUPPLY_KIT_PICKUP });
  };

  const handleLogMicroAction = (action: MicroAction) => {
      if (!currentUser || currentUser.stats.microActionsToday >= 3) return;
      addPoints(action.points, `+${action.points} SP for your quick action!`);
      updateUserStats('microActionsLogged', 1);
      updateUserStats('microActionsToday', 1);
      logActivity(currentUser.name, { type: 'micro_action_logged', description: `logged a quick action: '${action.name}'`, pointsChange: action.points });
  };

  const handlePurchaseReward = (reward: Reward, pointsUsed: number, amountPaidNPR: number) => {
    if (!currentUser) return;
    
    const isCashPayment = amountPaidNPR > 0;
    const status = isCashPayment ? 'pending' : 'confirmed';

    const newReceipt: PurchaseReceipt = {
        id: Date.now(),
        userName: currentUser.name,
        rewardTitle: reward.title,
        rewardPartner: reward.partner,
        rewardImageUrl: reward.imageUrl,
        costInSP: reward.cost,
        pointsUsed,
        amountPaidNPR,
        timestamp: Date.now(),
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=safa_nepal_receipt_${Date.now()}`,
        status,
    };

    setAllUsers(prevUsers => prevUsers.map(user =>
      user.name === currentUser.name
        ? {
            ...user,
            points: status === 'confirmed' ? user.points - pointsUsed : user.points,
            purchaseHistory: [newReceipt, ...user.purchaseHistory],
          }
        : user
    ));

    if (status === 'confirmed') {
      logActivity(currentUser.name, {
        type: 'redeemed',
        description: `redeemed '${reward.title}'`,
        pointsChange: -pointsUsed,
      });
    }

    setViewingReceipt(newReceipt);
    setToast({ message: isCashPayment ? 'Purchase pending approval!' : 'Reward redeemed successfully!' });
  };
  
  const handlePurchaseMerchandise = (item: MerchandiseItem) => {
     if (!currentUser) return;
    
    const newReceipt: PurchaseReceipt = {
      id: Date.now(),
      userName: currentUser.name,
      rewardTitle: item.title,
      rewardPartner: 'Official Merchandise',
      rewardImageUrl: item.imageUrl,
      costInSP: 0,
      pointsUsed: 0,
      amountPaidNPR: item.priceNPR,
      timestamp: Date.now(),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=safa_nepal_receipt_${Date.now()}`,
      status: 'pending',
    };

    setAllUsers(prevUsers => prevUsers.map(u => u.name === currentUser.name ? { ...u, purchaseHistory: [newReceipt, ...u.purchaseHistory] } : u));
    logActivity(currentUser.name, { type: 'merchandise_purchased', description: `purchased '${item.title}'`, pointsChange: 0 });
    setViewingReceipt(newReceipt);
    setToast({ message: 'Purchase pending approval!' });
  };

  const handleMerchandiseReviewSubmit = (itemId: number, rating: number, comment: string) => {
    if (!currentUser) return;
    
    const newReview: MerchandiseReview = {
        id: Date.now(),
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        rating,
        comment,
        timestamp: Date.now(),
    };

    setMerchandise(prev => prev.map(item => 
        item.id === itemId ? { ...item, reviews: [newReview, ...item.reviews] } : item
    ));

    logActivity(currentUser.name, { type: 'merchandise_review', description: `reviewed a merchandise item`, pointsChange: 0 });
    setToast({ message: "Thank you for your review!" });
  };
  
  const handleDiscussMerchandise = (item: MerchandiseItem) => {
    if (!currentUser) return;
    
    const existingThread = forumThreads.find(t => t.merchandiseId === item.id);
    if (existingThread) {
        setSelectedThreadId(existingThread.id);
        setCurrentPage('forum');
        return;
    }
    
    // Create a new thread
    const botPost: ForumPost = {
        id: Date.now(),
        user: 'Safa Nepal Bot',
        userAvatar: 'https://picsum.photos/id/42/100/100',
        userIsAdmin: true,
        content: `This is the official discussion thread for "${item.title}".\n\n${item.description}\n\nShare your thoughts, questions, or reviews here!`,
        timestamp: 'Just now',
        parentId: null,
        replies: [],
        score: 1,
        votes: { 'Safa Nepal Bot': 1 },
        imageUrl: item.imageUrl,
    };
    const newThread: ForumThread = {
        id: Date.now(),
        title: `Discussion: ${item.title}`,
        posts: [botPost],
        merchandiseId: item.id,
    };

    setForumThreads(prev => [newThread, ...prev]);
    setSelectedThreadId(newThread.id);
    setCurrentPage('forum');
  };

  // Forum Handlers
  const handleCreateThread = (title: string, content: string, imageUrl?: string, youtubeLink?: string) => {
      if (!currentUser) return;
      const newPost: ForumPost = {
          id: Date.now(),
          user: currentUser.name,
          userAvatar: currentUser.avatar,
          userIsAdmin: currentUser.isAdmin,
          content,
          timestamp: 'Just now',
          parentId: null,
          replies: [],
          score: 1,
          votes: { [currentUser.name]: 1 },
          imageUrl: imageUrl,
          youtubeVideoId: youtubeLink?.split('v=')[1]?.split('&')[0],
      };
      const newThread: ForumThread = {
          id: Date.now(),
          title,
          posts: [newPost],
      };
      setForumThreads(prev => [newThread, ...prev]);
      logActivity(currentUser.name, { type: 'forum_thread_created', description: `started a new discussion: "${title}"`, pointsChange: 0 });
      setIsCreateThreadModalOpen(false);
  };
  
  const handleAddReply = (threadId: number, parentId: number | null, content: string, imageUrl?: string, youtubeLink?: string) => {
      if (!currentUser) return;
      const newPost: ForumPost = {
          id: Date.now(),
          user: currentUser.name,
          userAvatar: currentUser.avatar,
          userIsAdmin: currentUser.isAdmin,
          content,
          timestamp: 'Just now',
          parentId,
          replies: [],
          score: 1,
          votes: { [currentUser.name]: 1 },
          imageUrl: imageUrl,
          youtubeVideoId: youtubeLink?.split('v=')[1]?.split('&')[0],
      };
      setForumThreads(prev => prev.map(thread => {
          if (thread.id === threadId) {
              const findAndAddReply = (posts: ForumPost[]): ForumPost[] => {
                  return posts.map(p => {
                      if (p.id === parentId) {
                          return { ...p, replies: [newPost, ...p.replies] };
                      }
                      if (p.replies.length > 0) {
                          return { ...p, replies: findAndAddReply(p.replies) };
                      }
                      return p;
                  });
              };
              const newPosts = parentId ? findAndAddReply(thread.posts) : [...thread.posts, newPost];
              return { ...thread, posts: newPosts };
          }
          return thread;
      }));
      logActivity(currentUser.name, { type: 'forum_reply', description: `replied to a discussion`, pointsChange: 0 });
  };
  
  const handleVote = (threadId: number, postId: number, vote: 1 | -1) => {
    if (!currentUser) return;
    setForumThreads(prev => prev.map(thread => {
        if (thread.id === threadId) {
            const findAndVote = (posts: ForumPost[]): ForumPost[] => {
                return posts.map(p => {
                    if (p.id === postId) {
                        const existingVote = p.votes[currentUser!.name] || 0;
                        let newScore = p.score;
                        const newVotes = { ...p.votes };
                        if (existingVote === vote) { // User is undoing their vote
                            newScore -= vote;
                            delete newVotes[currentUser!.name];
                        } else {
                            newScore += vote - existingVote;
                            newVotes[currentUser!.name] = vote;
                        }
                        return { ...p, score: newScore, votes: newVotes };
                    }
                    if (p.replies.length > 0) {
                        return { ...p, replies: findAndVote(p.replies) };
                    }
                    return p;
                });
            };
            return { ...thread, posts: findAndVote(thread.posts) };
        }
        return thread;
    }));
  };

  const handleViewThread = (threadId: number) => {
    setSelectedThreadId(threadId);
    setCurrentPage('forum');
  };

  // Admin Handlers
  const handleAdminDeleteUser = (userName: string) => setAllUsers(prev => prev.filter(u => u.name !== userName));
  const handleAdminEditUserPoints = (userName: string, newPoints: number) => setAllUsers(prev => prev.map(u => u.name === userName ? { ...u, points: newPoints } : u));
  const handleAdminDeleteIssue = (issueId: number) => setIssues(prev => prev.filter(i => i.id !== issueId));
  const handleAdminDeleteDisturbance = (dId: number) => setDisturbances(prev => prev.filter(d => d.id !== dId));
  const handleAdminAddReward = (newReward: Omit<Reward, 'id'>) => setRewards(prev => [{ ...newReward, id: Date.now() }, ...prev]);
  const handleAdminEditReward = (updatedReward: Reward) => setRewards(prev => prev.map(r => r.id === updatedReward.id ? updatedReward : r));
  const handleAdminDeleteReward = (rewardId: number) => setRewards(prev => prev.filter(r => r.id !== rewardId));
  const handleAdminAddHeroSlide = (newSlide: Omit<HeroSlide, 'id'>) => setHeroSlides(prev => [{ ...newSlide, id: Date.now() }, ...prev]);
  const handleAdminEditHeroSlide = (updatedSlide: HeroSlide) => setHeroSlides(prev => prev.map(s => s.id === updatedSlide.id ? updatedSlide : s));
  const handleAdminDeleteHeroSlide = (slideId: number) => setHeroSlides(prev => prev.filter(s => s.id !== slideId));
  const handleAdminAddMerchandise = (newItem: Omit<MerchandiseItem, 'id' | 'reviews'>) => setMerchandise(prev => [{ ...newItem, id: Date.now(), reviews: [] }, ...prev]);
  const handleAdminEditMerchandise = (updatedItem: MerchandiseItem) => setMerchandise(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
  const handleAdminDeleteMerchandise = (itemId: number) => setMerchandise(prev => prev.filter(i => i.id !== itemId));
  const handleAdminToggleFeature = (feature: FeatureFlag) => setFeatureFlags(prev => ({ ...prev, [feature]: !prev[feature] }));
  const handleAdminCreateAnnouncement = (description: string) => {
    if (!currentUser?.isAdmin) return;
    const newAnnouncement: Activity = {
        id: `ann_${Date.now()}`,
        user: { name: currentUser.name, avatar: currentUser.avatar },
        type: 'announcement',
        description,
        timestamp: Date.now(),
        pointsChange: 0,
        isAnnouncement: true,
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };
  const handleAdminDeleteActivity = (activityId: string) => {
    if (activityId.startsWith('ann_')) {
        setAnnouncements(prev => prev.filter(a => a.id !== activityId));
    } else {
        setAllUsers(prevUsers => prevUsers.map(u => ({ ...u, activity: u.activity.filter(a => a.id !== activityId) })));
    }
  };
  const handleAdminAddMayor = (newMayor: Omit<MayorProfile, 'id'>) => setMayorProfiles(prev => [{ ...newMayor, id: Date.now() }, ...prev]);
  const handleAdminEditMayor = (updatedMayor: MayorProfile) => setMayorProfiles(prev => prev.map(m => m.id === updatedMayor.id ? updatedMayor : m));
  const handleAdminDeleteMayor = (mayorId: number) => setMayorProfiles(prev => prev.filter(m => m.id !== mayorId));
  const handleAdminAddWard = (newWard: Omit<Ward, 'id'>) => setWards(prev => [{ ...newWard, id: Date.now() }, ...prev]);
  const handleAdminEditWard = (updatedWard: Ward) => setWards(prev => prev.map(w => w.id === updatedWard.id ? updatedWard : w));
  const handleAdminDeleteWard = (wardId: number) => setWards(prev => prev.filter(w => w.id !== wardId));
  const handleAdminApproveRedemption = (redemptionId: number) => {
    const redemption = safetyKitRedemptions.find(r => r.id === redemptionId);
    if (redemption) {
        setSafetyKitRedemptions(prev => prev.map(r => r.id === redemptionId ? { ...r, status: 'approved' } : r));
        addPoints(REWARD_POINTS.SAFETY_KIT_REDEMPTION, `+${REWARD_POINTS.SAFETY_KIT_REDEMPTION} SP for your purchase!`, redemption.userName);
        updateUserStats('safetyKitsRedeemed', 1, redemption.userName);
        logActivity(redemption.userName, { type: 'safety_kit_redeemed', description: 'had a safety kit purchase approved', pointsChange: REWARD_POINTS.SAFETY_KIT_REDEMPTION });
    }
  };
  const handleAdminRejectRedemption = (redemptionId: number) => setSafetyKitRedemptions(prev => prev.map(r => r.id === redemptionId ? { ...r, status: 'rejected' } : r));
  const handleAdminConfirmPurchase = (receiptId: number, userName: string) => {
    setAllUsers(prevUsers => prevUsers.map(u => {
        if (u.name === userName) {
            const purchase = u.purchaseHistory.find(p => p.id === receiptId);
            if (!purchase) return u;
            
            const updatedHistory = u.purchaseHistory.map(p => p.id === receiptId ? { ...p, status: 'confirmed' as const } : p);
            
            logActivity(u.name, {
                type: 'redeemed',
                description: `redeemed '${purchase.rewardTitle}'`,
                pointsChange: -purchase.pointsUsed,
            });
            
            const updatedUser = { ...u, points: u.points - purchase.pointsUsed, purchaseHistory: updatedHistory };
            
            // Send notification
            const notificationMessage = `Your purchase of "${purchase.rewardTitle}" has been confirmed!`;
            updatedUser.notifications = [...(updatedUser.notifications || []), notificationMessage];

            return updatedUser;
        }
        return u;
    }));
    setToast({ message: "Purchase confirmed and user notified." });
  };
  const handleSafetyKitRequest = (receipt: File) => {
    if (!currentUser) return;
    const newRedemption: SafetyKitRedemption = {
        id: Date.now(),
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        receiptImageUrl: URL.createObjectURL(receipt),
        status: 'pending',
        timestamp: Date.now(),
    };
    setSafetyKitRedemptions(prev => [newRedemption, ...prev]);
    setToast({ message: 'Request submitted for admin approval.' });
  };

  // Page rendering logic
  if (!currentUser) {
    const publicStats = {
      issuesSolved: issues.filter(i => i.status === 'Solved').length,
      activeHeroes: allUsers.length,
      totalPoints: allUsers.reduce((sum, user) => sum + user.points, 0),
    };

    if (authPage === 'login') {
      return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthPage('register')} />;
    }
    if (authPage === 'register') {
      return <RegisterPage wards={wards} onRegister={handleRegister} onSwitchToLogin={() => setAuthPage('login')} />;
    }
    
    // Default to public home page if not logging in/registering
    return <PublicHomePage stats={publicStats} onRequestLogin={() => setAuthPage('login')} onRequestRegister={() => setAuthPage('register')} />;
  }

  const earnedBadgeIds = new Set(MOCK_ALL_BADGES.filter(badge => badge.condition(currentUser.stats)).map(b => b.id));

  const renderPage = () => {
    if (selectedThreadId !== null) {
      const thread = forumThreads.find(t => t.id === selectedThreadId);
      if (thread) {
        return <ThreadDetailPage thread={thread} currentUser={currentUser} onAddReply={handleAddReply} onVote={handleVote} onBack={() => setSelectedThreadId(null)} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage currentUser={currentUser} issues={issues} disturbances={disturbances} rewards={rewards} forumThreads={forumThreads} setCurrentPage={setCurrentPage} onUpdateIssues={setIssues} activeChallenge={activeChallenge} allUsers={allUsers} allActivities={allActivities} onOrganizeSubmit={handleOrganizeSubmit} onJoinEvent={handleJoinEvent} onCompleteSubmit={handleCompleteSubmit} onOpenReportModal={() => setIsReportModalOpen(true)} onOpenDisturbanceModal={() => setIsDisturbanceModalOpen(true)} onOpenMicroActionsModal={() => setIsMicroActionsModalOpen(true)} featureFlags={featureFlags} onViewThread={handleViewThread} />;
      case 'leaderboards':
        return <LeaderboardsPage individualRanks={individualRanks} wardRanks={wardRanks} mayorProfiles={mayorProfiles} />;
      case 'rewards':
        return <RewardsPage userPoints={currentUser.points} onPurchaseReward={handlePurchaseReward} currentUser={currentUser} rewards={rewards} heroSlides={heroSlides} merchandise={merchandise} onPurchaseMerchandise={handlePurchaseMerchandise} onReviewSubmit={handleMerchandiseReviewSubmit} onDiscussMerchandise={handleDiscussMerchandise} />;
      case 'hub':
        return <CivicSenseHubPage addPoints={addPoints} updateUserStats={updateUserStats} logActivity={logActivity} currentUser={currentUser} />;
      case 'profile':
        return <ProfilePage user={currentUser} earnedBadgeIds={earnedBadgeIds} onLogout={handleLogout} />;
      case 'forum':
        return <ForumPage threads={forumThreads} onSelectThread={handleViewThread} onOpenCreateModal={() => setIsCreateThreadModalOpen(true)} sortBy={forumSortBy} setSortBy={setForumSortBy} onVote={handleVote} currentUser={currentUser} />;
      case 'recycle':
        return <RecyclePage onLogRecycle={handleLogRecycle} />;
      case 'supplies':
        return <SuppliesPage onLogSupplyPickup={handleLogSupplyPickup} onRequestRedemption={handleSafetyKitRequest} currentUser={currentUser} featureFlags={featureFlags} />;
      case 'admin':
        return currentUser.isAdmin ? <AdminPage allUsers={allUsers} currentUser={currentUser} allActivities={allActivities} issues={issues} disturbances={disturbances} rewards={rewards} heroSlides={heroSlides} merchandise={merchandise} featureFlags={featureFlags} mayorProfiles={mayorProfiles} wards={wards} safetyKitRedemptions={safetyKitRedemptions} allPurchases={allPurchases} onDeleteUser={handleAdminDeleteUser} onEditUserPoints={handleAdminEditUserPoints} onDeleteIssue={handleAdminDeleteIssue} onDeleteDisturbance={handleAdminDeleteDisturbance} onAddReward={handleAdminAddReward} onEditReward={handleAdminEditReward} onDeleteReward={handleAdminDeleteReward} onAddHeroSlide={handleAdminAddHeroSlide} onEditHeroSlide={handleAdminEditHeroSlide} onDeleteHeroSlide={handleAdminDeleteHeroSlide} onAddMerchandise={handleAdminAddMerchandise} onEditMerchandise={handleAdminEditMerchandise} onDeleteMerchandise={handleAdminDeleteMerchandise} onToggleFeature={handleAdminToggleFeature} onCreateAnnouncement={handleAdminCreateAnnouncement} onDeleteActivity={handleAdminDeleteActivity} onAddMayor={handleAdminAddMayor} onEditMayor={handleAdminEditMayor} onDeleteMayor={handleAdminDeleteMayor} onAddWard={handleAdminAddWard} onEditWard={handleAdminEditWard} onDeleteWard={handleAdminDeleteWard} onApproveRedemption={handleAdminApproveRedemption} onRejectRedemption={handleAdminRejectRedemption} onConfirmPurchase={handleAdminConfirmPurchase} /> : <HomePage currentUser={currentUser} issues={issues} disturbances={disturbances} rewards={rewards} forumThreads={forumThreads} setCurrentPage={setCurrentPage} onUpdateIssues={setIssues} activeChallenge={activeChallenge} allUsers={allUsers} allActivities={allActivities} onOrganizeSubmit={handleOrganizeSubmit} onJoinEvent={handleJoinEvent} onCompleteSubmit={handleCompleteSubmit} onOpenReportModal={() => setIsReportModalOpen(true)} onOpenDisturbanceModal={() => setIsDisturbanceModalOpen(true)} onOpenMicroActionsModal={() => setIsMicroActionsModalOpen(true)} featureFlags={featureFlags} onViewThread={handleViewThread} />;
      default:
        return <HomePage currentUser={currentUser} issues={issues} disturbances={disturbances} rewards={rewards} forumThreads={forumThreads} setCurrentPage={setCurrentPage} onUpdateIssues={setIssues} activeChallenge={activeChallenge} allUsers={allUsers} allActivities={allActivities} onOrganizeSubmit={handleOrganizeSubmit} onJoinEvent={handleJoinEvent} onCompleteSubmit={handleCompleteSubmit} onOpenReportModal={() => setIsReportModalOpen(true)} onOpenDisturbanceModal={() => setIsDisturbanceModalOpen(true)} onOpenMicroActionsModal={() => setIsMicroActionsModalOpen(true)} featureFlags={featureFlags} onViewThread={handleViewThread} />;
    }
  };

  return (
    <div className="relative pb-20 min-h-screen bg-brand-gray-light">
      <Toast toast={toast} onClear={() => setToast(null)} />
      {viewingReceipt && <ReceiptModal receipt={viewingReceipt} onClose={() => setViewingReceipt(null)} />}
      <Header points={currentUser.points} currentUser={currentUser} setCurrentPage={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} featureFlags={featureFlags} />

      {/* Global Modals */}
      {isReportModalOpen && <ReportModal onClose={() => setIsReportModalOpen(false)} onSubmit={handleReportSubmit} />}
      {isDisturbanceModalOpen && <ReportDisturbanceModal onClose={() => setIsDisturbanceModalOpen(false)} onSubmit={handleDisturbanceReport} />}
      {isMicroActionsModalOpen && <MicroActionsModal onClose={() => setIsMicroActionsModalOpen(false)} onLogAction={handleLogMicroAction} actionsLeft={3 - currentUser.stats.microActionsToday} />}
      {isCreateThreadModalOpen && <CreateThreadModal onClose={() => setIsCreateThreadModalOpen(false)} onSubmit={handleCreateThread} />}
    </div>
  );
};

export default App;