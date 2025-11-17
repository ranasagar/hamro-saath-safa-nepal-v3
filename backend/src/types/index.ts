/**
 * Core type definitions for Hamro Saath backend
 * Covers: Issues, Events, Points Ledger, and related entities
 */

// ============ Issue Types ============
export type IssueCategory = 'litter' | 'blocked_drainage' | 'graffiti' | 'broken_bench' | 'construction_debris' | 'other';

export type IssueStatus = 'open' | 'in_progress' | 'resolved';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  imageUrls: string[];
  location: {
    lat: number;
    lng: number;
  };
  ward?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Event Types ============
export type EventStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  issueId: string;
  organizerId: string;
  startAt: string;
  endAt?: string;
  volunteerGoal: number;
  status: EventStatus;
  rsvpCount: number;
  rsvpList: string[]; // user IDs
  afterPhoto?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRSVP {
  eventId: string;
  userId: string;
  createdAt: string;
}

// ============ Points Ledger Types ============
export type TransactionType = 'award' | 'redeem' | 'adjust';
export type TransactionStatus = 'pending' | 'settled' | 'reversed';

export interface LedgerTransaction {
  txId: string;
  userId: string;
  amount: number; // positive for award, negative for redeem
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
  metadata?: Record<string, any>;
}

// ============ Reward Types ============
export interface Reward {
  id: string;
  title: string;
  costSP: number;
  cashPrice?: number;
  partner?: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export interface RedemptionRecord {
  id: string;
  userId: string;
  rewardId: string;
  spUsed: number;
  cashPaid: number;
  receiptUrl: string;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: string;
}

// ============ User Types ============
export interface UserProfile {
  id: string;
  displayName: string;
  avatar?: string;
  ward?: string;
  bio?: string;
  profileVisibility: 'public' | 'private';
  totalSP: number;
  createdAt: string;
  updatedAt: string;
}

// ============ API Response Types ============
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount?: number;
  nextCursor?: string;
  hasMore?: boolean;
}

// ============ Request Context ============
export interface RequestUser {
  id: string;
  role: 'user' | 'admin' | 'moderator' | 'anonymous';
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
      idempotencyKey?: string;
    }
  }
}
