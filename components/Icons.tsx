import React from 'react';

const iconClass = "w-6 h-6 mb-1";
const smallIconClass = "w-5 h-5";

// Navigation & General UI
export const HomeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12.1795L12 4L20 12.1795V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V12.1795Z" fill="#6EE7B7"/>
    <path d="M15 21V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H15Z" fill="#10B981"/>
    <path d="M21 11L12 2L3 11" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const TrophyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H6C4.89543 10 4 10.8954 4 12V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V12C20 10.8954 19.1046 10 18 10Z" fill="#FBBF24"/>
    <path d="M12 10V4M12 4H15M12 4H9" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 10C18 8.89543 17.1046 8 16 8H8C6.89543 8 6 8.89543 6 10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 20V22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const GiftIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="18" height="11" rx="2" fill="#93C5FD"/>
    <path d="M12 21V10" stroke="#1E40AF" strokeWidth="2"/>
    <rect x="5" y="5" width="14" height="5" rx="1" fill="#3B82F6"/>
    <path d="M12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10Z" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2"/>
  </svg>
);
export const RecyclingIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 17L3 12L8 7" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 7L21 12L16 17" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3L14.5 8L12 13L9.5 8L12 3Z" fill="#6EE7B7"/>
    <path d="M12 21L9.5 16L12 11L14.5 16L12 21Z" fill="#10B981"/>
  </svg>
);
export const SuppliesIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.6219C17.1765 20.2891 21 15.5915 21 9.74902V5.41882C21 4.70327 20.4494 4.10237 19.7574 4.0202L12.5574 3.0202C12.2103 2.97686 11.7897 2.97686 11.4426 3.0202L4.24256 4.0202C3.55059 4.10237 3 4.70327 3 5.41882V9.74902C3 15.5915 6.82355 20.2891 12 21.6219Z" fill="#6EE7B7"/>
    <path d="M15 11H13V9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11Z" fill="#047857"/>
  </svg>
);
export const ForumIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5523 20.5523 16 20 16H9C8.44772 16 8 16.4477 8 17V18C8 19.1046 8.89543 20 10 20H18L21 17V15Z" fill="#3B82F6"/>
    <path d="M4 6C4 4.89543 4.89543 4 6 4H16C17.1046 4 18 4.89543 18 6V14C18 15.1046 17.1046 16 16 16H6C4.89543 16 4 15.1046 4 14V6Z" fill="#93C5FD"/>
  </svg>
);
export const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#93C5FD"/>
    <circle cx="12" cy="10" r="4" fill="#3B82F6"/>
    <path d="M17.9691 20C17.81 17.1085 15.2371 15 12 15C8.76292 15 6.19004 17.1085 6.03088 20" fill="#3B82F6"/>
  </svg>
);
export const AdminPanelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.6219C17.1765 20.2891 21 15.5915 21 9.74902V5.41882C21 4.70327 20.4494 4.10237 19.7574 4.0202L12.5574 3.0202C12.2103 2.97686 11.7897 2.97686 11.4426 3.0202L4.24256 4.0202C3.55059 4.10237 3 4.70327 3 5.41882V9.74902C3 15.5915 6.82355 20.2891 12 21.6219Z" fill="#93C5FD"/>
        <path d="M15 11L12 14L9 11L12 8L15 11Z" fill="#1E40AF"/>
    </svg>
);
export const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-8 h-8"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Form & Action Icons
export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="15" rx="2" fill="#D1D5DB"/>
    <path d="M3 10H21" stroke="#4B5563" strokeWidth="2"/>
    <path d="M7 3V7" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 3V7" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#93C5FD"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7V12L16 14" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="13" rx="2" fill="#6EE7B7"/>
        <path d="M22 9H6C4.89543 9 4 8.10457 4 7V7C4 5.89543 4.89543 5 6 5H20C21.1046 5 22 5.89543 22 7V9Z" fill="#10B981"/>
    </svg>
);
export const AtSymbolIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8" fill="#D1D5DB"/>
      <path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.3411 18.9919 16.4633 17.3291 17.9238M17.3291 17.9238C17.7629 17.2234 18 16.4027 18 15.5V12C18 9.79086 16.2091 8 14 8" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="11" width="16" height="11" rx="2" fill="#D1D5DB"/>
        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#D1D5DB"/>
    <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" fill="#D1D5DB"/>
    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 20H6C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V13" fill="#93C5FD"/>
    <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V13" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5L21.5 5.5L12.5 14.5H9.5V11.5L18.5 2.5Z" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" fill="#FCA5A5"/>
    <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const LocationPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" clipRule="evenodd"/>
    </svg>
);


// Category & Feature Icons
export const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#6EE7B7"/>
    <path d="M9 12L11 14L15 10" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const UsersIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="4" fill="#93C5FD"/>
    <path d="M2 20C2 16.6863 4.68629 14 8 14H10C13.3137 14 16 16.6863 16 20" fill="#93C5FD"/>
    <path d="M17 7C17 9.20914 15.2091 11 13 11" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 20C21 17.3431 19.3431 15 17 15" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8.5V15.5C6 16.0523 6.44772 16.5 7 16.5H9L14 20.5V3.5L9 7.5H7C6.44772 7.5 6 7.94772 6 8.5Z" fill="#FBBF24"/>
    <path d="M18 8C19.1046 9.10457 19.1046 10.8954 18 12M21 5C23.2091 7.20914 23.2091 10.7909 21 13" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 20H22L12 3L2 20Z" fill="#FBBF24"/>
    <path d="M12 9V13" stroke="#9A3412" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17V17.01" stroke="#9A3412" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" fill="#FCA5A5"/>
        <path d="M4 7H20" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 7L18 19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19L5 7" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const StorefrontIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 21V10.5556C4 10.2487 4.24871 10 4.55556 10H19.4444C19.7513 10 20 10.2487 20 10.5556V21H4Z" fill="#93C5FD"/>
        <path d="M3 7H21V10H3V7Z" fill="#3B82F6"/>
        <path d="M2 7L12 3L22 7" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 21V14H9V21" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 21H20" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// FIX: Added all missing icons below
export const WaterDropIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 00-9-9c0-4.968 4.032-9 9-9s9 4.032 9 9a9 9 0 00-9 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    </svg>
);
export const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v5.5a2.5 2.5 0 005 0V14" />
    </svg>
);
export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
export const CheckBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
);
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.03a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);
export const StarSolidIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);
export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.21-1.401a2.25 2.25 0 00-1.625-2.31l-1.401-.21a2.25 2.25 0 00-2.31 1.625l-.21 1.401a2.25 2.25 0 001.625 2.31l1.401.21a2.25 2.25 0 002.31-1.625z" />
    </svg>
);
export const BroomIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3.5M12 17.5L8.25 3h7.5L12 17.5zM8.25 3h7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 17.5h15" />
    </svg>
);
export const RoadClearIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.5 5.691m0 0L2.25 10.941" />
    </svg>
);
export const SignpostIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 9.75l-3.75-3.75M15.75 9.75h-7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6H4.5v3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25m3.75-3.75L12 6m3.75 3.75H18v-3.75" />
    </svg>
);
export const WeedPullIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21a3.75 3.75 0 01-2.25-6.75c.958-.501 1.833-1.309 2.5-2.25M20.25 21a3.75 3.75 0 002.25-6.75c-.958-.501-1.833-1.309-2.5-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const FilterListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
);
export const SortIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
);
export const AddTaskIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5v10.5h-7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25v-6.75M9.375 12h5.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);
export const ConstructionIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.625a2.25 2.25 0 01-2.36 0l-7.5-4.625A2.25 2.25 0 013.25 6.993V6.75" />
    </svg>
);
export const HardwareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.97-.63 1.563-.43A6.002 6.002 0 0121 8.25z" />
    </svg>
);
export const TshirtIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 4.5l-2.5 2.25-1 4.5h15l-1-4.5-2.5-2.25M9.5 4.5c0 .621.504 1.125 1.125 1.125h2.75c.621 0 1.125-.504 1.125-1.125M9.5 4.5v3.375c0 .621.504 1.125 1.125 1.125h2.75c.621 0 1.125-.504 1.125-1.125V4.5" />
    </svg>
);
export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
export const ReplyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);
export const CampaignIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0h9.75m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);
export const ReceiptIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
    </svg>
);
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
export const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
);
export const TrendingUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.94.886M21 7.75l-3.94-.886" />
    </svg>
);
export const ArrowUpwardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);
export const ArrowDownwardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);
export const ChecklistIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || smallIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5m-15 0a7.5 7.5 0 017.5-7.5 7.5 7.5 0 017.5 7.5m0 0H6.375" />
    </svg>
);
export const RssIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5h-.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75m.75.75h-.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5v.75a13.5 13.5 0 0013.5 13.5h.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5A.75.75 0 015.25 3h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5A.75.75 0 014.5 6v-1.5z" />
    </svg>
);
export const GlobeAltIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 019 9h-18a9 9 0 019-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5" />
    </svg>
);
export const CameraPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className || iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        <circle cx="12" cy="10.5" r="1.5" fill="currentColor"/>
    </svg>
);
export const SPGiftIcon: React.FC<{ className?: string }> = ({ className }) => <GiftIcon className={className} />;