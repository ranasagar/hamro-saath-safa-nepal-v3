import React, { useState } from 'react';
// FIX: Added missing icon imports
import { CloseIcon, ImageIcon, VideoIcon } from './Icons';

interface CreateThreadModalProps {
    onClose: () => void;
    onSubmit: (title: string, content: string, imageUrl?: string, youtubeLink?: string) => void;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Please fill in both title and content.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(title, content, imageUrl, youtubeLink);
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-blue-dark">Start a New Discussion</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900"
                                placeholder="A clear and concise title"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Your Post</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900"
                                placeholder="Share your thoughts, ideas, or questions..."
                                required
                            ></textarea>
                        </div>
                        <div className="space-y-3">
                             <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
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
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Posting...' : 'Post Discussion'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateThreadModal;