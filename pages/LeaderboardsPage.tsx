import React, { useState, useMemo } from 'react';
import { UserRank, WardRank, MayorProfile } from '../types';
import MayorCard from '../components/MayorCard';
import { TrophyIcon } from '../components/Icons';

interface LeaderboardsPageProps {
  individualRanks: UserRank[];
  wardRanks: WardRank[];
  mayorProfiles: MayorProfile[];
}

const LeaderboardTabs: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <div className="mb-4 flex border-b border-gray-200">
    <button
      onClick={() => setActiveTab('individual')}
      className={`px-4 py-2 font-semibold ${activeTab === 'individual' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500'}`}
    >
      Top Safa Heroes
    </button>
    <button
      onClick={() => setActiveTab('ward')}
      className={`px-4 py-2 font-semibold ${activeTab === 'ward' ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-500'}`}
    >
      Top Wards
    </button>
  </div>
);

const UserRankItem: React.FC<{ user: UserRank }> = ({ user }) => {
    const rankClasses = {
        1: 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300',
        2: 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300',
        3: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300',
    };
    const rankTextClasses = {
        1: 'text-amber-500',
        2: 'text-slate-500',
        3: 'text-orange-600',
    };
    
    const rankClass = user.rank <= 3 ? rankClasses[user.rank as 1|2|3] : 'bg-white';
    const rankTextClass = user.rank <= 3 ? rankTextClasses[user.rank as 1|2|3] : 'text-gray-500';

    return (
      <li className={`flex items-center p-3 rounded-lg shadow-subtle mb-2 gap-4 border ${rankClass}`}>
        <span className={`font-bold text-xl w-10 text-center flex items-center justify-center gap-1 ${rankTextClass}`}>
          {user.rank <= 3 ? <TrophyIcon className="w-6 h-6" /> : user.rank}
        </span>
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-grow">
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.ward}</p>
        </div>
        <span className="font-bold text-brand-green">{user.points.toLocaleString()} SP</span>
      </li>
    );
};


const WardRankItem: React.FC<{ ward: WardRank }> = ({ ward }) => {
     const rankClasses = {
        1: 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300',
        2: 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300',
        3: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300',
    };
    const rankTextClasses = {
        1: 'text-amber-500',
        2: 'text-slate-500',
        3: 'text-orange-600',
    };
    
    const rankClass = ward.rank <= 3 ? rankClasses[ward.rank as 1|2|3] : 'bg-white';
    const rankTextClass = ward.rank <= 3 ? rankTextClasses[ward.rank as 1|2|3] : 'text-gray-500';

    return (
      <li className={`flex items-center p-3 rounded-lg shadow-subtle mb-2 gap-4 border ${rankClass}`}>
        <span className={`font-bold text-xl w-10 text-center flex items-center justify-center gap-1 ${rankTextClass}`}>
            {ward.rank <= 3 ? <TrophyIcon className="w-6 h-6" /> : ward.rank}
        </span>
        <div className="flex-grow">
          <p className="font-semibold text-gray-800">{ward.name}</p>
        </div>
        <span className="font-bold text-brand-green">{ward.points.toLocaleString()} SP</span>
      </li>
    );
};

const CitySelector: React.FC<{
    cities: string[];
    selectedCity: string;
    onSelectCity: (city: string) => void;
}> = ({ cities, selectedCity, onSelectCity }) => (
    <div className="mb-4 flex items-center justify-center gap-2">
        {cities.map(city => (
            <button
                key={city}
                onClick={() => onSelectCity(city)}
                className={`px-4 py-2 font-semibold rounded-full text-sm transition-colors ${
                    selectedCity === city
                        ? 'bg-brand-green text-white shadow'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
                {city}
            </button>
        ))}
    </div>
);


const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({ individualRanks, wardRanks, mayorProfiles }) => {
  const [activeTab, setActiveTab] = useState('individual');
  const cities = useMemo(() => Array.from(new Set(mayorProfiles.map(p => p.city))), [mayorProfiles]);
  const [selectedCity, setSelectedCity] = useState(cities[0] || '');

  const selectedMayor = useMemo(() => mayorProfiles.find(p => p.city === selectedCity), [selectedCity, mayorProfiles]);

  const filteredIndividualRanks = useMemo(() => {
    return individualRanks
      .filter(u => u.ward.includes(selectedCity))
      .map((user, index) => ({...user, rank: index + 1}));
  }, [individualRanks, selectedCity]);

  const filteredWardRanks = useMemo(() => {
    return wardRanks
      .filter(w => w.name.includes(selectedCity))
      .map((ward, index) => ({...ward, rank: index + 1}));
  }, [wardRanks, selectedCity]);


  return (
    <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                <TrophyIcon />
            </div>
            <h2 className="font-bold text-2xl text-brand-gray-dark">Leaderboards</h2>
        </div>
      <CitySelector cities={cities} selectedCity={selectedCity} onSelectCity={setSelectedCity} />
      
      {selectedMayor && <MayorCard mayor={selectedMayor} />}

      <div className="mt-6">
        <LeaderboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'individual' && (
          <ul>
            {filteredIndividualRanks.map(user => <UserRankItem key={user.name} user={user} />)}
          </ul>
        )}

        {activeTab === 'ward' && (
          <ul>
            {filteredWardRanks.map(ward => <WardRankItem key={ward.name} ward={ward} />)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeaderboardsPage;