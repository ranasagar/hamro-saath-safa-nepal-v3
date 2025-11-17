import React from 'react';
import { Page, UserRank } from '../types';
import { UserCircleIcon, AdminPanelIcon } from './Icons';

interface HeaderProps {
  points: number;
  currentUser: UserRank | null;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ points, currentUser, setCurrentPage }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue-dark">
          Hamro Saath, Safa Nepal
        </h1>
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-brand-green/80 to-brand-blue/80 text-white font-bold py-1.5 px-4 rounded-full shadow-sm">
                <span>SP</span>
                <span className="font-mono">{points.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setCurrentPage('profile')} className="text-brand-gray-dark hover:text-brand-green transition-colors" title="Profile">
                  <UserCircleIcon />
                </button>
                {currentUser.isAdmin && (
                  <button onClick={() => setCurrentPage('admin')} className="text-brand-gray-dark hover:text-brand-blue transition-colors" title="Admin Panel">
                    <AdminPanelIcon />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;