import React, { useEffect, useRef, useState } from 'react';
import { CameraPinIcon, UsersIcon, SPGiftIcon, HomeIcon, TrophyIcon, GiftIcon, RecyclingIcon, HeartIcon, BroomIcon, StarIcon } from '../components/Icons';

interface PublicHomePageProps {
  stats: {
    issuesSolved: number;
    activeHeroes: number;
    totalPoints: number;
  };
  onRequestLogin: () => void;
  onRequestRegister: () => void;
}

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return [ref, isVisible] as const;
};

const AnimatedStat: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const startTime = performance.now();
                    const animate = (currentTime: number) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                             setCount(end); // Ensure it ends on the exact number
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };

    }, [end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

const AnimatedBackground: React.FC = () => {
    const icons = [
        { Icon: RecyclingIcon, color: 'text-brand-green/30' },
        { Icon: HeartIcon, color: 'text-red-500/20' },
        { Icon: BroomIcon, color: 'text-amber-600/20' },
        { Icon: StarIcon, color: 'text-amber-400/30' },
        { Icon: UsersIcon, color: 'text-brand-green/20' },
        { Icon: SPGiftIcon, color: 'text-amber-500/20' },
        { Icon: CameraPinIcon, color: 'text-brand-blue/20' },
    ];
    const items = Array.from({ length: 20 }).map((_, i) => {
        const { Icon, color } = icons[i % icons.length];
        const style = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 15}s`, // 15s to 35s duration
            animationDelay: `${Math.random() * 15}s`, // 0s to 15s delay
            transform: `scale(${Math.random() * 0.6 + 0.4})`, // 0.4 to 1.0 scale
        };
        return <Icon key={i} className={`absolute bottom-[-150px] animate-float-up ${color} w-16 h-16`} style={style} />;
    });

    return (
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
            {items}
        </div>
    );
};


const PublicHomePage: React.FC<PublicHomePageProps> = ({ stats, onRequestLogin, onRequestRegister }) => {

    const [refHowItWorks, isVisibleHowItWorks] = useScrollAnimation();
    const [refFeatures, isVisibleFeatures] = useScrollAnimation();
    const [refStats, isVisibleStats] = useScrollAnimation();

    const howItWorksSteps = [
        { icon: <CameraPinIcon className="w-12 h-12" />, title: "1. Spot & Snap", description: "See a problem like litter or an overflowing bin? Report it with a photo in seconds." },
        { icon: <UsersIcon className="w-12 h-12" />, title: "2. Organize & Act", description: "Organize a clean-up event or join one nearby. Team up with fellow Safa Heroes." },
        { icon: <SPGiftIcon className="w-12 h-12" />, title: "3. Earn & Redeem", description: "Earn Safa Points (SP) for every positive action and redeem them for real rewards." }
    ];

    const features = [
        { name: "Live Issue Map", icon: <HomeIcon />, description: "See real-time reports of civic issues on an interactive map." },
        { name: "Community Leaderboards", icon: <TrophyIcon />, description: "Compete with friends and neighbors to become a top Safa Hero." },
        { name: "Rewards Marketplace", icon: <GiftIcon />, description: "Redeem your Safa Points (SP) for real-world rewards from local partners." },
        { name: "Recycle & Supply Hubs", icon: <RecyclingIcon />, description: "Find nearby centers to recycle waste and pick up free clean-up kits." },
    ];
    
    return (
        <div className="text-brand-gray-dark relative overflow-hidden">
             <AnimatedBackground />
            {/* Hero Section */}
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue-dark">
                    Hamro Saath, Safa Nepal
                    </h1>
                    <div className="flex items-center space-x-2">
                        <button onClick={onRequestLogin} className="font-semibold text-brand-gray-dark px-4 py-1.5 rounded-md hover:bg-gray-100 transition-colors">Login</button>
                        <button onClick={onRequestRegister} className="font-semibold bg-brand-green text-white px-4 py-1.5 rounded-md hover:bg-brand-green-dark transition-colors shadow-sm">Join</button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Content */}
                <section className="text-center py-20 px-4 bg-white/50 backdrop-blur-sm relative">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-brand-gray-dark mb-4 animate-fadeInUp">
                        Your Tole, Your Responsibility.
                    </h2>
                    <p className="text-lg text-brand-gray-dark max-w-2xl mx-auto mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Join a community of heroes dedicated to making Nepal cleaner and more beautiful, one action at a time. Report issues, join events, and earn rewards.
                    </p>
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <button onClick={onRequestRegister} className="bg-brand-green text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform text-lg">
                            Join the Movement
                        </button>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 px-4">
                    <h3 className="text-4xl font-bold text-center mb-12">How It Works</h3>
                    <div ref={refHowItWorks} className="container mx-auto grid md:grid-cols-3 gap-12 text-center">
                        {howItWorksSteps.map((step, index) => (
                             <div key={index} className={`${isVisibleHowItWorks ? 'animate-fade-in-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}>
                                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-brand-blue/10 text-brand-blue-dark mx-auto mb-4">{step.icon}</div>
                                <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section ref={refStats} className={`py-20 px-4 bg-white/80 backdrop-blur-sm ${isVisibleStats ? 'animate-fade-in-slide-up' : 'opacity-0'}`}>
                    <h3 className="text-4xl font-bold text-center mb-12">Our Community Impact</h3>
                    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="text-center p-4">
                            <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue-dark">
                               <AnimatedStat end={stats.issuesSolved} />
                            </p>
                            <p className="text-lg font-semibold text-gray-600">Issues Solved</p>
                        </div>
                        <div className="text-center p-4">
                            <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue-dark">
                                <AnimatedStat end={stats.activeHeroes} />
                            </p>
                            <p className="text-lg font-semibold text-gray-600">Active Heroes</p>
                        </div>
                        <div className="text-center p-4">
                            <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-blue-dark">
                               <AnimatedStat end={stats.totalPoints} />+
                            </p>
                            <p className="text-lg font-semibold text-gray-600">SP Awarded</p>
                        </div>
                    </div>
                </section>

                 {/* Features Section */}
                <section className="py-20 px-4">
                     <h3 className="text-4xl font-bold text-center mb-12">Packed with Features</h3>
                     <div ref={refFeatures} className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                             <div key={feature.name} className={`bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${isVisibleFeatures ? 'animate-fade-in-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 150}ms` }}>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green-dark mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-bold mb-2">{feature.name}</h4>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Final CTA Section */}
                <section className="bg-gradient-to-r from-brand-green to-brand-blue text-white text-center py-20 px-4">
                    <h3 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h3>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                        Become a part of the solution. Your small actions can lead to big changes for our community.
                    </p>
                    <button onClick={onRequestRegister} className="bg-white text-brand-green font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform text-lg">
                        Sign Up for Free
                    </button>
                </section>
            </main>
        </div>
    );
};

export default PublicHomePage;