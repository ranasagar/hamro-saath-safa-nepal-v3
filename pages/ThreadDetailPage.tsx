import React, { useState } from 'react';
import { ForumThread, ForumPost, UserRank } from '../types';
// FIX: Added missing icon imports
import { ReplyIcon, ArrowUpwardIcon, ArrowDownwardIcon, ImageIcon, VideoIcon, AdminPanelIcon } from '../components/Icons';

interface ThreadDetailPageProps {
    thread: ForumThread;
    currentUser: UserRank;
    onAddReply: (threadId: number, parentId: number | null, content: string, imageUrl?: string, youtubeLink?: string) => void;
    onVote: (threadId: number, postId: number, vote: 1 | -1) => void;
    onBack: () => void;
}

const ReplyForm: React.FC<{ 
    onSubmit: (content: string, imageUrl?: string, youtubeLink?: string) => void; 
    onCancel: () => void;
    currentUser: UserRank;
}> = ({ onSubmit, onCancel, currentUser }) => {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content, imageUrl, youtubeLink);
        setContent('');
        setImageUrl('');
        setYoutubeLink('');
    };

    return (
        <div className="mt-2 ml-10 p-4 bg-gray-50 rounded-lg border">
            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Replying as ${currentUser.name}...`}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue text-gray-900"
                    required
                ></textarea>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-md border">
                        <ImageIcon className="text-gray-500 w-6 h-6" />
                    </div>
                    <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL (optional)" className="flex-grow pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue text-gray-900" />
                </div>
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-md border">
                        <VideoIcon className="text-gray-500 w-6 h-6" />
                    </div>
                    <input type="text" value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)} placeholder="YouTube Link (optional)" className="flex-grow pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue text-gray-900" />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onCancel} className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100">Cancel</button>
                    <button type="submit" disabled={!content.trim()} className="text-sm font-semibold bg-brand-blue text-white px-3 py-1 rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400">Reply</button>
                </div>
            </form>
        </div>
    )
}

const RecursivePost: React.FC<{
    post: ForumPost;
    threadId: number;
    currentUser: UserRank;
    onVote: (threadId: number, postId: number, vote: 1 | -1) => void;
    onAddReply: (threadId: number, parentId: number | null, content: string, imageUrl?: string, youtubeLink?: string) => void;
    isOriginalPost?: boolean;
}> = ({ post, threadId, currentUser, onVote, onAddReply, isOriginalPost = false }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const userVote = currentUser ? post.votes[currentUser.name] : 0;

    const handleReplySubmit = (content: string, imageUrl?: string, youtubeLink?: string) => {
        onAddReply(threadId, post.id, content, imageUrl, youtubeLink);
        setShowReplyForm(false);
    }
    
    return (
        <div className={`p-4 ${!isOriginalPost ? 'ml-4 sm:ml-6 border-l-2 border-gray-200' : 'border-b-2 border-gray-100'}`}>
            <div className="flex items-start space-x-3">
                 <img src={post.userAvatar} alt={post.user} className="w-8 h-8 rounded-full flex-shrink-0" />
                 <div className="flex-grow">
                    <div className="flex items-baseline space-x-2">
                        <p className={`font-semibold ${post.userIsAdmin ? 'text-brand-blue-dark' : 'text-gray-800'}`}>{post.user}</p>
                        {post.userIsAdmin && <AdminPanelIcon className="w-4 h-4 text-brand-blue" title="Admin" />}
                        {post.userFlair && <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{post.userFlair}</span>}
                        <p className="text-xs text-gray-500">&bull; {post.timestamp}</p>
                    </div>
                    <div className="prose prose-sm max-w-none mt-1">
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                        {post.imageUrl && (
                            <img src={post.imageUrl} alt="User submitted content" className="mt-2 rounded-lg max-w-full h-auto" />
                        )}
                        {post.youtubeVideoId && (
                             <div className="mt-3 aspect-video">
                                <iframe 
                                    className="w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${post.youtubeVideoId}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-1">
                            <button onClick={() => onVote(threadId, post.id, 1)} className={`p-1 rounded-full ${userVote === 1 ? 'text-brand-green' : 'hover:bg-gray-100'}`}><ArrowUpwardIcon className="w-4 h-4" /></button>
                            <span className="font-bold">{post.score}</span>
                            <button onClick={() => onVote(threadId, post.id, -1)} className={`p-1 rounded-full ${userVote === -1 ? 'text-red-500' : 'hover:bg-gray-100'}`}><ArrowDownwardIcon className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center gap-1 font-semibold hover:text-brand-blue">
                            <ReplyIcon className="w-4 h-4" /> Reply
                        </button>
                    </div>
                    {showReplyForm && <ReplyForm onSubmit={handleReplySubmit} onCancel={() => setShowReplyForm(false)} currentUser={currentUser} />}
                 </div>
            </div>
             <div className="mt-2">
                {post.replies?.map(reply => (
                    <RecursivePost key={reply.id} post={reply} threadId={threadId} currentUser={currentUser} onVote={onVote} onAddReply={onAddReply} />
                ))}
            </div>
        </div>
    );
};

const ThreadDetailPage: React.FC<ThreadDetailPageProps> = ({ thread, currentUser, onAddReply, onVote, onBack }) => {
    return (
        <div className="container mx-auto px-0 sm:px-4 py-4 flex flex-col h-full">
            <div className="px-4 mb-4">
                <button onClick={onBack} className="text-brand-blue font-semibold mb-2">&larr; Back to all discussions</button>
                <h2 className="text-2xl font-bold">{thread.title}</h2>
            </div>

            <div className="flex-grow overflow-y-auto bg-white rounded-lg shadow-inner">
                 {thread.posts.map(post => (
                    <RecursivePost 
                        key={post.id} 
                        post={post} 
                        threadId={thread.id}
                        currentUser={currentUser} 
                        onVote={onVote} 
                        onAddReply={onAddReply}
                        isOriginalPost
                    />
                 ))}
            </div>
        </div>
    );
};

export default ThreadDetailPage;