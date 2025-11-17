// FIX: Import React to resolve the "Cannot find namespace 'React'" error.
import React from 'react';

export type Page = 'home' | 'leaderboards' | 'rewards' | 'hub' | 'profile' | 'forum' | 'recycle' | 'supplies' | 'admin';

export interface ToastData {
  message: string;
  onClick?: () => void;
  isReward?: boolean;
}

export enum IssueCategory {
  Litter = 'Litter',
  OverflowingBin = 'Overflowing Bin',
  ConstructionDebris = 'Construction Debris',
  BlockedDrainage = 'Blocked Drainage',
  Graffiti = 'Graffiti',
  BrokenBench = 'Broken Public Bench',
}

export interface Issue {
  id: number;
  user: string;
  userAvatar: string;
  category: IssueCategory;
  imageUrl: string;
  afterImageUrl?: string;
  location: string;
  ward: string;
  description: string;
  timestamp: string;
  status: 'Reported' | 'In Progress' | 'Solved';
  volunteersNeeded?: number;
  participants?: string[];
  coordinates: { x: number; y: number; };
  eventDetails?: {
      date: string;
      time: string;
  };
}

export interface UserStats {
    reportsMade: number;
    eventsOrganized: number;
    eventsJoined: number;
    quizCompleted: boolean;
    recyclingLogs: number;
    supplyKitsPickedUp: number;
    supplyKitsToday: number;
    microActionsLogged: number;
    microActionsToday: number;
    disturbanceReports: number;
    safetyKitsRedeemed: number;
}

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAdmin?: boolean;
  };
  type: 'reported' | 'organized' | 'joined' | 'redeemed' | 'quiz_completed' | 'forum_thread_created' | 'forum_reply' | 'recycled_item' | 'supply_kit_pickup' | 'micro_action_logged' | 'announcement' | 'safety_kit_redeemed' | 'merchandise_purchased' | 'merchandise_review';
  description: string;
  timestamp: number; // Changed to number for sorting
  pointsChange: number;
  issueId?: number;
  isAnnouncement?: boolean;
}

export interface PurchaseReceipt {
  id: number;
  userName: string;
  rewardTitle: string;
  rewardPartner: string;
  rewardImageUrl: string;
  costInSP: number;
  pointsUsed: number;
  amountPaidNPR: number;
  timestamp: number;
  qrCodeUrl: string;
  status: 'pending' | 'confirmed';
}

export interface AdminPurchaseReceipt extends PurchaseReceipt {
  userAvatar: string;
}

export interface UserRank {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  stats: UserStats;
  ward: string;
  activity: Activity[];
  purchaseHistory: PurchaseReceipt[];
  isAdmin?: boolean;
  notifications?: string[];
}

export interface Ward {
    id: number;
    name: string;
}

export interface WardRank {
  rank: number;
  name: string;
  points: number;
}

export interface Reward {
  id: number;
  title: string;
  partner: string;
  cost: number;
  imageUrl: string;
  rewardType?: 'digital_wallet';
  priceNPR?: number;
  listingTier: 'Gold' | 'Silver' | 'Bronze';
}

export interface MerchandiseReview {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5
  comment: string;
  timestamp: number;
}

export interface MerchandiseItem {
  id: number;
  title: string;
  description: string;
  priceNPR: number;
  imageUrl: string;
  reviews: MerchandiseReview[];
}

export interface Badge {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    condition: (stats: UserStats) => boolean;
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    ward: string;
    bonusPoints: number;
    isActive: boolean;
}

export interface ForumPost {
    id: number;
    user: string;
    userAvatar: string;
    userFlair?: string;
    userIsAdmin?: boolean;
    content: string;
    timestamp: string;
    parentId?: number | null;
    replies: ForumPost[];
    score: number;
    votes: { [userName: string]: 1 | -1 };
    imageUrl?: string;
    youtubeVideoId?: string;
}

export interface ForumThread {
    id: number;
    title: string;
    posts: ForumPost[]; // Now only top-level posts
    merchandiseId?: number;
}

export type RecyclingMaterial = 'Plastics' | 'Paper' | 'Glass' | 'Metals' | 'E-Waste' | 'Organic';

export interface RecyclingCenter {
    id: number;
    name: string;
    location: string;
    coordinates: { lat: number; lng: number };
    accepts: RecyclingMaterial[];
    hours: string;
}

export interface SupplyPoint {
    id: number;
    name: string;
    location: string;
    coordinates: { lat: number; lng: number };
    hours: string;
    imageUrl?: string;
}

export interface MicroAction {
    id: string;
    name: string;
    category: 'Sanitation' | 'Public Safety' | 'Community Greenery';
    icon: React.ReactNode;
    points: number;
}

export interface MayorProfile {
    id: number;
    city: string;
    name: string;
    photoUrl: string;
    term: string;
    bio: string;
    promises: string[];
    currentWorks: string[];
}

export enum DisturbanceCategory {
  PoliticalRally = 'Political Rally',
  Protest = 'Protest',
  LoudCommercialPromotion = 'Loud Commercial Promotion',
  Other = 'Other',
}
export type DisturbanceImpact = 'Noise Pollution' | 'Traffic Blockage' | 'Unsafe Atmosphere' | 'Unsolicited Promotion';

export interface Disturbance {
    id: number;
    category: DisturbanceCategory;
    impacts: DisturbanceImpact[];
    location: string;
    coordinates: { x: number; y: number };
    timestamp: number;
    reports: number;
    reporters: string[];
}

export interface SafetyKitRedemption {
    id: number;
    userName: string;
    userAvatar: string;
    receiptImageUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    timestamp: number;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export type FeatureFlag = 'rewards' | 'hub' | 'forum' | 'recycle' | 'supplies' | 'disturbances' | 'microActions' | 'liveFeed' | 'safetyKitRedemption';

export type FeatureFlags = {
    [key in FeatureFlag]: boolean;
};