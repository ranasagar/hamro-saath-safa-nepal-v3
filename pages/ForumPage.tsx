import React from 'react';
import { ForumThread, UserRank, ForumPost } from '../types';
// FIX: Added missing icon imports
import { ReplyIcon, TrendingUpIcon, ArrowUpwardIcon, ArrowDownwardIcon, ImageIcon, ForumIcon, ClockIcon } from '../components/Icons';

interface ForumPageProps {
    threads: ForumThread[];
    onSelectThread: (id: number) => void;
    onOpenCreateModal: () => void;
    sortBy: 'top' | 'newest';
    setSortBy: (sort: 'top' | 'newest') => void;
    onVote: (threadId: number, postId: number, vote: 1 | -1) => void;
    currentUser: UserRank | null;
}

const ThreadCard: React.FC<{ 
    thread: ForumThread, 
    onSelect: () => void,
    onVote: (threadId: number, postId: number, vote: 1 | -1) => void;
    currentUser: UserRank | null;
}> = ({ thread, onSelect, onVote, currentUser }) => {
    const originalPost = thread.posts[0];
    const replyCount = thread.posts.reduce((acc, post) => {
        const countReplies = (p: ForumPost): number => {
            return p.replies.reduce((sum, reply) => sum + 1 + countReplies(reply), 0);
        };
        return acc + countReplies(post);
    }, thread.posts.length - 1);
    
    const userVote = currentUser ? originalPost.votes[currentUser.name] : 0;

    const handleVoteClick = (e: React.MouseEvent, vote: 1 | -1) => {
        e.stopPropagation(); // Prevent card click
        if (currentUser) {
            onVote(thread.id, originalPost.id, vote);
        }
    }

    return (
        <div className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center justify-start p-3 bg-gray-50 rounded-l-lg">
                <button onClick={(e) => handleVoteClick(e, 1)} className={`p-1 rounded-full ${userVote === 1 ? 'text-white bg-brand-green' : 'text-gray-500 hover:bg-green-100'}`}><ArrowUpwardIcon /></button>
                <span className="font-bold text-lg my-1 text-gray-700">{originalPost.score}</span>
                 <button onClick={(e) => handleVoteClick(e, -1)} className={`p-1 rounded-full ${userVote === -1 ? 'text-white bg-red-500' : 'text-gray-500 hover:bg-red-100'}`}><ArrowDownwardIcon /></button>
            </div>
            <div onClick={onSelect} className="p-4 flex-grow cursor-pointer">
                <h3 className="font-bold text-lg text-brand-blue-dark mb-2">{thread.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <img src={originalPost.userAvatar} alt={originalPost.user} className="w-6 h-6 rounded-full mr-2" />
                    <span>Started by <span className="font-semibold">{originalPost.user}</span> &bull; {originalPost.timestamp}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{originalPost.content}</p>
                <div className="flex items-center text-sm gap-4">
                    <div className="flex items-center font-semibold text-brand-green gap-1">
                        <ReplyIcon className="w-4 h-4" />
                        <span>{replyCount === 1 ? '1 Reply' : `${replyCount} Replies`}</span>
                    </div>
                    {(originalPost.imageUrl || originalPost.youtubeVideoId) && (
                         <div className="flex items-center text-gray-500 font-semibold gap-1">
                             <ImageIcon className="w-4 h-4"/>
                             <span>Media Attached</span>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SortControls: React.FC<{ sortBy: 'top' | 'newest', setSortBy: (sort: 'top' | 'newest') => void }> = ({ sortBy, setSortBy }) => (
    <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setSortBy('top')} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'top' ? 'bg-brand-green-light text-brand-green-dark' : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100'}`}>
            <TrendingUpIcon /> Top
        </button>
        <button onClick={() => setSortBy('newest')} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'newest' ? 'bg-brand-green-light text-brand-green-dark' : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100'}`}>
            <ClockIcon className="w-5 h-5" /> Newest
        </button>
    </div>
);

const ForumPage: React.FC<ForumPageProps> = ({ threads, onSelectThread, onOpenCreateModal, sortBy, setSortBy, onVote, currentUser }) => {

    const sortedThreads = [...threads].sort((a, b) => {
        if (sortBy === 'top') {
            return b.posts[0].score - a.posts[0].score;
        } else { // 'newest'
            return b.id - a.id;
        }
    });

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 text-brand-green rounded-xl">
                    <ForumIcon />
                </div>
                <h2 className="font-bold text-2xl text-brand-gray-dark">Community Forum</h2>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Community Discussions</h3>
                <button
                    onClick={onOpenCreateModal}
                    className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-brand-green-dark transition-colors"
                >
                    Start a New Discussion
                </button>
            </div>

            <SortControls sortBy={sortBy} setSortBy={setSortBy} />

            <div className="space-y-4">
                {sortedThreads.length > 0 ? (
                    sortedThreads.map(thread => (
                        <ThreadCard key={thread.id} thread={thread} onSelect={() => onSelectThread(thread.id)} onVote={onVote} currentUser={currentUser} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">No discussions yet.</p>
                        <p className="mt-2">Be the first one to start a conversation!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumPage;