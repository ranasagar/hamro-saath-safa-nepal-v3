import React from 'react';
// FIX: Import all necessary types for the new constants.
import { Issue, IssueCategory, UserRank, Ward, Reward, Badge, Challenge, ForumThread, RecyclingCenter, RecyclingMaterial, SupplyPoint, MicroAction, MayorProfile, Disturbance, FeatureFlags, SafetyKitRedemption, DisturbanceCategory, ForumPost, UserStats, PurchaseReceipt, HeroSlide, MerchandiseItem, MerchandiseReview } from './types';
// FIX: Added missing icon imports
import { TrashIcon, RecyclingIcon, WaterDropIcon, AcademicCapIcon, HeartIcon, CheckBadgeIcon, StarIcon, ShieldCheckIcon, SparklesIcon, BroomIcon, RoadClearIcon, SignpostIcon, WeedPullIcon } from './components/Icons';

// Icons for badges using the new vibrant icon set
const ToleTrailblazerIcon = () => <StarIcon className="h-8 w-8" />;
const RiverGuardianIcon = () => <ShieldCheckIcon className="h-8 w-8" />;
const WasteWarriorIcon = () => <TrashIcon className="h-8 w-8" />;
const CivicChampionIcon = () => <AcademicCapIcon className="h-8 w-8" />;
const RecycleRookieIcon = () => <RecyclingIcon className="h-8 w-8" />;
const GoodSamaritanIcon = () => <HeartIcon className="h-8 w-8" />;
const StreetSweeperIcon = () => <SparklesIcon className="h-8 w-8" />;
const CivicSentinelIcon = () => <CheckBadgeIcon className="h-8 w-8" />;


export const REWARD_POINTS = {
  REPORT_ISSUE: 50,
  PARTICIPATE_IN_EVENT: 100,
  COMPLETE_ORGANIZED_EVENT: 250, // Bonus for the organizer
  QUIZ_COMPLETE: 50,
  RECYCLE_LOG: 75,
  SUPPLY_KIT_PICKUP: 25,
  SAFETY_KIT_REDEMPTION: 100,
};

export const SP_TO_NPR_RATE = 10; // 10 SP = 1 NPR

export const COMMUNITY_GOAL_KG = 1000;
export const COMMUNITY_PROGRESS_KG = 350;

export const INITIAL_ISSUES: Issue[] = [
  { id: 1, user: 'Aarav Sharma', userAvatar: 'https://picsum.photos/id/1005/100/100', category: IssueCategory.OverflowingBin, imageUrl: 'https://picsum.photos/id/101/400/300', location: 'New Road, Kathmandu', ward: 'Ward 3, Kathmandu', description: 'Main dustbin near the corner store has been overflowing for two days. It is starting to smell and attract stray dogs.', timestamp: '2 hours ago', status: 'Reported', coordinates: { x: 55, y: 45 } },
  { id: 2, user: 'Sita Rai', userAvatar: 'https://picsum.photos/id/1011/100/100', category: IssueCategory.Litter, imageUrl: 'https://picsum.photos/id/1015/400/300', location: 'Thamel, Kathmandu', ward: 'Ward 10, Kathmandu', description: 'Large amount of plastic bottles and food wrappers dumped behind the alley of the main temple.', timestamp: '5 hours ago', status: 'In Progress', volunteersNeeded: 5, participants: ['Sita Rai', 'Aarav Sharma'], coordinates: { x: 40, y: 30 }, eventDetails: { date: 'Tomorrow', time: '10:00 AM' } },
  { id: 3, user: 'Bishal Gurung', userAvatar: 'https://picsum.photos/id/1025/100/100', category: IssueCategory.BlockedDrainage, imageUrl: 'https://picsum.photos/id/102/400/300', afterImageUrl: 'https://picsum.photos/id/119/400/300', location: 'Patan Durbar Square, Lalitpur', ward: 'Ward 5, Lalitpur', description: 'The main drain on the east side of the square was blocked with construction debris, causing water to pool.', timestamp: '1 day ago', status: 'Solved', coordinates: { x: 70, y: 65 } },
  { id: 4, user: 'Priya Thapa', userAvatar: 'https://picsum.photos/id/1027/100/100', category: IssueCategory.Graffiti, imageUrl: 'https://picsum.photos/id/103/400/300', location: 'Boudha, Kathmandu', ward: 'Ward 10, Kathmandu', description: 'Someone has spray-painted the wall of the public park. Needs to be cleaned up.', timestamp: '3 days ago', status: 'Reported', coordinates: { x: 25, y: 80 } },
];

export const INITIAL_USERS: UserRank[] = [
    { rank: 1, name: 'Sita Rai', avatar: 'https://picsum.photos/id/1011/100/100', points: 12500, stats: { reportsMade: 2, eventsOrganized: 1, eventsJoined: 2, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 }, ward: 'Ward 10, Kathmandu', activity: [
        { id: 'act1', user: { name: 'Sita Rai', avatar: 'https://picsum.photos/id/1011/100/100', isAdmin: true }, type: 'organized', description: `organized a clean-up for 'Litter'`, pointsChange: 0, issueId: 2, timestamp: Date.now() - 1000 * 60 * 5 },
    ], purchaseHistory: [], isAdmin: true, notifications: [] },
    { rank: 2, name: 'Aarav Sharma', avatar: 'https://picsum.photos/id/1005/100/100', points: 11800, stats: { reportsMade: 1, eventsOrganized: 0, eventsJoined: 1, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 }, ward: 'Ward 5, Lalitpur', activity: [
        { id: 'act2', user: { name: 'Aarav Sharma', avatar: 'https://picsum.photos/id/1005/100/100', isAdmin: false }, type: 'reported', description: `reported a new issue: 'Overflowing Bin'`, pointsChange: 50, issueId: 1, timestamp: Date.now() - 1000 * 60 * 2 },
    ], purchaseHistory: [], notifications: [] },
    { rank: 3, name: 'Bishal Gurung', avatar: 'https://picsum.photos/id/1025/100/100', points: 10500, stats: { reportsMade: 1, eventsOrganized: 1, eventsJoined: 0, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 }, ward: 'Ward 3, Kathmandu', activity: [
        { id: 'act3', user: { name: 'Bishal Gurung', avatar: 'https://picsum.photos/id/1025/100/100', isAdmin: false }, type: 'joined', description: `completed the clean-up for 'Blocked Drainage'`, pointsChange: 100, issueId: 3, timestamp: Date.now() - 1000 * 60 * 10 },
    ], purchaseHistory: [], notifications: [] },
    { rank: 4, name: 'Priya Thapa', avatar: 'https://picsum.photos/id/1027/100/100', points: 9200, stats: { reportsMade: 1, eventsOrganized: 0, eventsJoined: 0, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 }, ward: 'Ward 10, Kathmandu', activity: [
        { id: 'act4', user: { name: 'Priya Thapa', avatar: 'https://picsum.photos/id/1027/100/100', isAdmin: false }, type: 'reported', description: `reported a new issue: 'Graffiti'`, pointsChange: 50, issueId: 4, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3 },
    ], purchaseHistory: [], notifications: [] },
    { rank: 5, name: 'Rajesh Hamal', avatar: 'https://picsum.photos/id/1040/100/100', points: 8800, stats: { reportsMade: 0, eventsOrganized: 0, eventsJoined: 5, quizCompleted: true, recyclingLogs: 2, supplyKitsPickedUp: 1, supplyKitsToday: 0, microActionsLogged: 3, microActionsToday: 0, disturbanceReports: 1, safetyKitsRedeemed: 0 }, ward: 'Ward 5, Lalitpur', activity: [], purchaseHistory: [], notifications: [] },
    { rank: 6, name: 'Demo User', avatar: 'https://picsum.photos/id/1043/100/100', points: 100, stats: { reportsMade: 0, eventsOrganized: 0, eventsJoined: 0, quizCompleted: false, recyclingLogs: 0, supplyKitsPickedUp: 0, supplyKitsToday: 0, microActionsLogged: 0, microActionsToday: 0, disturbanceReports: 0, safetyKitsRedeemed: 0 }, ward: 'Ward 3, Kathmandu', activity: [], purchaseHistory: [], notifications: [] }
];

export const INITIAL_WARDS: Ward[] = [
    { id: 1, name: 'Ward 3, Kathmandu' },
    { id: 2, name: 'Ward 10, Kathmandu' },
    { id: 3, name: 'Ward 5, Lalitpur' },
    { id: 4, name: 'Ward 1, Dharan' },
];

export const INITIAL_REWARDS: Reward[] = [
  { id: 1, title: 'Rs. 100 eSewa Top-Up', partner: 'eSewa', cost: 1000, imageUrl: 'https://picsum.photos/id/201/400/300', rewardType: 'digital_wallet', priceNPR: 100, listingTier: 'Gold' },
  { id: 2, title: 'Free Coffee', partner: 'Himalayan Java', cost: 500, imageUrl: 'https://picsum.photos/id/225/400/300', priceNPR: 50, listingTier: 'Silver' },
  { id: 3, title: '1GB Ncell Data Pack', partner: 'Ncell', cost: 800, imageUrl: 'https://picsum.photos/id/30/400/300', priceNPR: 80, listingTier: 'Silver' },
  { id: 4, title: '10% off at Bhat-Bhateni', partner: 'Bhat-Bhateni', cost: 2000, imageUrl: 'https://picsum.photos/id/211/400/300', priceNPR: 200, listingTier: 'Bronze' },
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
    {
        id: 1,
        title: 'Featured Reward: eSewa Top-Up',
        subtitle: 'Redeem your points for instant mobile balance!',
        imageUrl: 'https://images.unsplash.com/photo-1611944212126-802c7417187a?q=80&w=2070&auto=format&fit=crop',
        ctaText: 'Redeem Now',
        ctaLink: '#',
    },
    {
        id: 2,
        title: 'New Partner: Himalayan Java',
        subtitle: 'Your next coffee is on us. Redeem 500 SP for a free coffee.',
        imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1964&auto=format&fit=crop',
        ctaText: 'View Details',
        ctaLink: '#',
    },
];

export const MOCK_ALL_BADGES: Badge[] = [
    { id: 1, name: 'Tole Trailblazer', description: 'Report your first issue.', icon: <ToleTrailblazerIcon />, condition: (stats: UserStats) => stats.reportsMade >= 1 },
    { id: 2, name: 'River Guardian', description: 'Join your first clean-up event.', icon: <RiverGuardianIcon />, condition: (stats: UserStats) => stats.eventsJoined >= 1 },
    { id: 3, name: 'Waste Warrior', description: 'Organize a successful clean-up event.', icon: <WasteWarriorIcon />, condition: (stats: UserStats) => stats.eventsOrganized >= 1 },
    { id: 4, name: 'Civic Champion', description: 'Complete the Civic Sense Quiz.', icon: <CivicChampionIcon />, condition: (stats: UserStats) => stats.quizCompleted },
    { id: 5, name: 'Recycle Rookie', description: 'Log your first recycling drop-off.', icon: <RecycleRookieIcon />, condition: (stats: UserStats) => stats.recyclingLogs >= 1 },
    { id: 6, name: 'Good Samaritan', description: 'Pick up your first clean-up supply kit.', icon: <GoodSamaritanIcon />, condition: (stats: UserStats) => stats.supplyKitsPickedUp >= 1 },
    { id: 7, name: 'Street Sweeper', description: 'Log 5 micro-actions.', icon: <StreetSweeperIcon />, condition: (stats: UserStats) => stats.microActionsLogged >= 5 },
    { id: 8, name: 'Civic Sentinel', description: 'Report your first public disturbance.', icon: <CivicSentinelIcon />, condition: (stats: UserStats) => stats.disturbanceReports >= 1 },
];

export const MOCK_CHALLENGES: Challenge[] = [
    { id: 1, title: "Mayor's Challenge: Clean Up Boudha!", description: "Help clean up reported issues in Ward 10, Kathmandu and earn a massive bonus for each completed event!", ward: 'Ward 10, Kathmandu', bonusPoints: 500, isActive: true }
];

export const INITIAL_FORUM_THREADS: ForumThread[] = [
    { id: 1, title: 'Idea: Community composting bins in every Tole?', posts: [{ id: 1, user: 'Aarav Sharma', userAvatar: 'https://picsum.photos/id/1005/100/100', userFlair: 'Safa Hero', userIsAdmin: false, content: 'What if we could get local government to sponsor large composting bins for organic waste in each neighborhood? It would reduce landfill waste significantly.', timestamp: '2 days ago', parentId: null, replies: [], score: 15, votes: {} }] },
    { id: 2, title: 'How to deal with dust from construction sites?', posts: [{ id: 2, user: 'Priya Thapa', userAvatar: 'https://picsum.photos/id/1027/100/100', userFlair: 'Safa Contributor', userIsAdmin: false, content: 'The new building construction near my house is creating unbearable dust clouds. Are there any regulations they should be following?', timestamp: '5 days ago', parentId: null, replies: [], score: 8, votes: {} }] },
    { id: 3, title: 'Let\'s organize a tree plantation drive!', posts: [{ id: 3, user: 'Sita Rai', userAvatar: 'https://picsum.photos/id/1011/100/100', userFlair: 'Safa Hero', userIsAdmin: true, content: 'With monsoon approaching, it\'s the perfect time to plant some trees around the ring road. Who is with me?', timestamp: '1 day ago', parentId: null, replies: [], score: 25, votes: {} }] },
];

export const INITIAL_DISTURBANCES: Disturbance[] = [];

export const INITIAL_FEATURE_FLAGS: FeatureFlags = {
    rewards: true,
    hub: true,
    forum: true,
    recycle: true,
    supplies: true,
    disturbances: true,
    microActions: true,
    liveFeed: true,
    safetyKitRedemption: true,
};

export const INITIAL_MAYOR_PROFILES: MayorProfile[] = [
  { id: 1, city: 'Kathmandu', name: 'Balen Shah', photoUrl: 'https://picsum.photos/id/433/200/200', term: '2022 - Present', bio: 'Independent mayor focused on urban infrastructure and waste management.', promises: ['Improve waste disposal systems', 'Clear illegal street vendors', 'Preserve cultural heritage sites'], currentWorks: ['Bagmati River cleaning campaign', 'Road expansion projects'] },
  { id: 2, city: 'Lalitpur', name: 'Chiri Babu Maharjan', photoUrl: 'https://picsum.photos/id/434/200/200', term: '2017 - Present', bio: 'Dedicated to preserving Patan\'s rich cultural heritage and improving city services.', promises: ['Promote local tourism', 'Upgrade public transportation', 'Increase green spaces'], currentWorks: ['Patan Durbar Square restoration', 'Cycle lane development'] },
  { id: 3, city: 'Dharan', name: 'Harka Sampang', photoUrl: 'https://picsum.photos/id/435/200/200', term: '2022 - Present', bio: 'A grassroots leader known for his hands-on approach to solving civic issues.', promises: ['Solve the city\'s drinking water crisis', 'Promote afforestation and environmental protection', 'Ensure government transparency'], currentWorks: ['Public-led water pipeline construction', 'Tree plantation drives across the city'] },
];


export const INITIAL_SAFETY_KIT_REDEMPTIONS: SafetyKitRedemption[] = [];

export const MOCK_RECYCLING_CENTERS: RecyclingCenter[] = [
  { id: 1, name: 'Clean Up Nepal', location: 'Baneshwor', coordinates: { lat: 27.693, lng: 85.342 }, accepts: ['Plastics', 'Paper', 'Glass'], hours: '9am - 5pm' },
  { id: 2, name: 'Doko Recyclers', location: 'Patan', coordinates: { lat: 27.672, lng: 85.325 }, accepts: ['Plastics', 'Paper', 'E-Waste', 'Metals'], hours: '10am - 6pm' },
];

export const MOCK_SUPPLY_POINTS: SupplyPoint[] = [
    { id: 1, name: 'Himalayan Java', location: 'Thamel', coordinates: { lat: 27.715, lng: 85.312 }, hours: '7am - 8pm', imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=400' },
    { id: 2, name: 'The Local Project', location: 'Jhamsikhel', coordinates: { lat: 27.683, lng: 85.318 }, hours: '10am - 7pm', imageUrl: 'https://images.unsplash.com/photo-1511920170033-f83297292737?q=80&w=400' },
];

export const MOCK_MICRO_ACTIONS: MicroAction[] = [
    { id: 'litter', name: 'Picked up stray litter', category: 'Sanitation', icon: <BroomIcon />, points: 10 },
    { id: 'road', name: 'Moved stone from road', category: 'Public Safety', icon: <RoadClearIcon />, points: 15 },
    { id: 'sign', name: 'Fixed fallen public sign', category: 'Public Safety', icon: <SignpostIcon />, points: 20 },
    { id: 'weeds', name: 'Pulled weeds from public path', category: 'Community Greenery', icon: <WeedPullIcon />, points: 10 },
];

export const INITIAL_MERCHANDISE: MerchandiseItem[] = [
  {
    id: 1,
    title: 'Safa Nepal T-Shirt',
    description: 'Official logo, 100% organic cotton.',
    priceNPR: 800,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
    reviews: [
      { id: 1, userName: 'Sita Rai', userAvatar: 'https://picsum.photos/id/1011/100/100', rating: 5, comment: 'Great quality and fits perfectly! Proud to support the cause.', timestamp: Date.now() - 86400000 * 2 },
      { id: 2, userName: 'Aarav Sharma', userAvatar: 'https://picsum.photos/id/1005/100/100', rating: 4, comment: 'I love the design. Wish it came in more colors.', timestamp: Date.now() - 86400000 * 5 },
    ]
  },
  {
    id: 2,
    title: 'Safa Nepal Tote Bag',
    description: 'Durable canvas bag for your daily needs.',
    priceNPR: 500,
    imageUrl: 'https://images.unsplash.com/photo-1594295343564-972159515939?q=80&w=1964&auto=format&fit=crop',
    reviews: [
      { id: 3, userName: 'Priya Thapa', userAvatar: 'https://picsum.photos/id/1027/100/100', rating: 5, comment: 'Very sturdy and spacious. I use it for groceries all the time.', timestamp: Date.now() - 86400000 * 1 },
    ]
  },
  {
    id: 3,
    title: 'Community Hero Cap',
    description: 'A stylish cap to show your support.',
    priceNPR: 450,
    imageUrl: 'https://images.unsplash.com/photo-1588850566953-c42144d283b3?q=80&w=1974&auto=format&fit=crop',
    reviews: []
  },
];