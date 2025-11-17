import React, { useState } from 'react';
import { UserStats, Activity, UserRank } from '../types';
import { REWARD_POINTS } from '../constants';
// FIX: Added missing icon import
import { SparklesIcon } from '../components/Icons';

interface CivicSenseHubPageProps {
  addPoints: (amount: number, message: string) => void;
  updateUserStats: (stat: keyof UserStats, value: boolean) => void;
  logActivity: (userName: string, activity: Omit<Activity, 'id' | 'timestamp' | 'user'>) => void;
  currentUser: UserRank;
}

const LearningCard: React.FC<{ title: string, content: string }> = ({ title, content }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-brand-blue-dark mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
    </div>
);

const Quiz: React.FC<{ 
    addPoints: (amount: number, message: string) => void; 
    updateUserStats: (stat: keyof UserStats, value: boolean) => void; 
    logActivity: (userName: string, activity: Omit<Activity, 'id' | 'timestamp' | 'user'>) => void; 
    currentUser: UserRank;
}> = ({ addPoints, updateUserStats, logActivity, currentUser }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const question = "What is the first step in proper waste management?";
    const options = ["Throwing it away", "Waste Segregation", "Burning it", "Hiding it"];
    const correctIndex = 1;

    const handleSubmit = () => {
        setSubmitted(true);
        if (selected === correctIndex) {
            addPoints(REWARD_POINTS.QUIZ_COMPLETE, `+${REWARD_POINTS.QUIZ_COMPLETE} SP for your civic knowledge!`);
            updateUserStats('quizCompleted', true);
            logActivity(currentUser.name, {
                type: 'quiz_completed',
                description: 'completed the Civic Sense Quiz',
                pointsChange: REWARD_POINTS.QUIZ_COMPLETE,
            });
        } else {
            alert("That's not correct. Try again next time!");
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h3 className="font-bold text-lg mb-3">Earn Extra Points!</h3>
            <p className="font-semibold mb-2">{question}</p>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => !submitted && setSelected(index)}
                        className={`w-full text-left p-2 rounded-md border ${
                            submitted && index === correctIndex ? 'bg-green-200 border-green-400 text-green-800 font-semibold' : 
                            submitted && selected === index && index !== correctIndex ? 'bg-red-200 border-red-400' :
                            selected === index ? 'bg-blue-100 border-blue-300' : 'bg-gray-50'
                        } ${submitted ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        disabled={submitted}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {!submitted && <button onClick={handleSubmit} disabled={selected === null} className="mt-4 w-full bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors disabled:bg-gray-300">Submit</button>}
            {submitted && selected === correctIndex && <p className="text-center mt-3 font-semibold text-green-600">Correct! Points awarded.</p>}
        </div>
    )
}

const CivicSenseHubPage: React.FC<CivicSenseHubPageProps> = ({ addPoints, updateUserStats, logActivity, currentUser }) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
              <SparklesIcon />
          </div>
          <h2 className="font-bold text-2xl text-brand-gray-dark">Civic Sense Hub</h2>
      </div>
      
      <div className="space-y-4">
        <LearningCard 
            title="Proper Waste Segregation"
            content="Separate your waste into wet (organic), dry (recyclable), and hazardous categories to help in recycling and reduce landfill."
        />
        <LearningCard 
            title="The Harm of Spitting Paan"
            content="Spitting paan not only makes public spaces dirty but also spreads diseases. Use designated bins."
        />
        <LearningCard 
            title="The Importance of Queuing"
            content="Following a queue shows respect for others and ensures fairness. It's a sign of a civilized society."
        />
      </div>

      <Quiz addPoints={addPoints} updateUserStats={updateUserStats} logActivity={logActivity} currentUser={currentUser} />

    </div>
  );
};

export default CivicSenseHubPage;