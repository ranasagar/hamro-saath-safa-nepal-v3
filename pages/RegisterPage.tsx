import React, { useState } from 'react';
import { UserRank, Ward } from '../types';
import { AtSymbolIcon, LockClosedIcon, UserIcon } from '../components/Icons';

interface RegisterPageProps {
  wards: Ward[];
  onRegister: (newUser: Omit<UserRank, 'rank' | 'points' | 'stats' | 'activity'>) => void;
  onSwitchToLogin: () => void;
}

const AVATAR_OPTIONS = [
    'https://picsum.photos/id/1005/100/100',
    'https://picsum.photos/id/1011/100/100',
    'https://picsum.photos/id/1025/100/100',
    'https://picsum.photos/id/1027/100/100',
    'https://picsum.photos/id/1040/100/100',
    'https://picsum.photos/id/1043/100/100',
];

const RegisterPage: React.FC<RegisterPageProps> = ({ wards, onRegister, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: AVATAR_OPTIONS[0],
    ward: wards.length > 0 ? wards[0].name : '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill all fields.');
        return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="min-h-screen bg-brand-gray-light flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-green-dark mb-2">Join the Movement</h1>
            <p className="text-gray-600">Create your account to start cleaning up Nepal.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
            {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="text-gray-400" /></div>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green text-gray-900" placeholder="Your Name" required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><AtSymbolIcon className="text-gray-400" /></div>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green text-gray-900" placeholder="you@example.com" required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="text-gray-400" /></div>
                            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green text-gray-900" placeholder="••••••••" required/>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition-colors duration-300">Next</button>
                </form>
            )}

            {step === 2 && (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Choose your Avatar</label>
                        <div className="flex justify-center space-x-2">
                            {AVATAR_OPTIONS.map(avatarUrl => (
                                <img
                                    key={avatarUrl}
                                    src={avatarUrl}
                                    alt="avatar"
                                    onClick={() => setFormData(prev => ({ ...prev, avatar: avatarUrl }))}
                                    className={`w-12 h-12 rounded-full cursor-pointer border-4 transition-all ${formData.avatar === avatarUrl ? 'border-brand-green' : 'border-transparent hover:border-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">Select your Ward</label>
                         <select name="ward" id="ward" value={formData.ward} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green text-gray-900">
                            {wards.map(ward => <option key={ward.id} value={ward.name}>{ward.name}</option>)}
                        </select>
                    </div>
                     <div className="flex space-x-4">
                        <button type="button" onClick={() => setStep(1)} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">Back</button>
                        <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition-colors duration-300">Create Account</button>
                     </div>
                 </form>
            )}
        </div>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-brand-green hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;