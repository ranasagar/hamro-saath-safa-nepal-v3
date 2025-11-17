import React, { useState, useRef } from 'react';
import { Issue } from '../types';
import { CloseIcon } from './Icons';
import { enhanceImage, dataUrlToFile } from '../imageUtils';

interface CompleteEventModalProps {
    issue: Issue;
    onClose: () => void;
    onSubmit: (data: { photo: File; }) => void;
}

const CompleteEventModal: React.FC<CompleteEventModalProps> = ({ issue, onClose, onSubmit }) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [originalPhotoPreview, setOriginalPhotoPreview] = useState<string | null>(null);
    const [isEnhanced, setIsEnhanced] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPhoto(file);
            setIsEnhanced(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPhotoPreview(result);
                setOriginalPhotoPreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    const handleEnhance = async () => {
        if (!photoPreview) return;
        try {
            const enhancedDataUrl = await enhanceImage(photoPreview);
            setPhotoPreview(enhancedDataUrl);
            setIsEnhanced(true);
        } catch (error) {
            console.error("Image enhancement failed:", error);
        }
    };

    const handleRevert = () => {
        if (originalPhotoPreview) {
            setPhotoPreview(originalPhotoPreview);
            setIsEnhanced(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!photo && !photoPreview) {
            alert("Please upload an 'After' photo to complete the event.");
            return;
        }
        setIsSubmitting(true);
        
        let finalPhoto: File;
        if (isEnhanced && photoPreview) {
            finalPhoto = await dataUrlToFile(photoPreview, photo?.name || 'enhanced_complete.jpg');
        } else if (photo) {
            finalPhoto = photo;
        } else {
            setIsSubmitting(false);
            return;
        }

        setTimeout(() => {
            onSubmit({ photo: finalPhoto });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-brand-green-dark">Complete Clean-Up</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">Please upload a photo of the cleaned area for: <span className="font-semibold">{issue.category}</span>.</p>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (After)</label>
                            <div onClick={triggerFileSelect} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-green">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="max-h-48 rounded-lg"/>
                                ) : (
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-600">Click to upload the 'After' image</p>
                                        <p className="text-xs text-gray-500">PNG or JPG</p>
                                    </div>
                                )}
                            </div>
                            <input id="file-upload-after" ref={fileInputRef} name="file-upload-after" type="file" accept="image/png, image/jpeg" className="sr-only" onChange={handleFileChange} />
                            <div className="mt-2 space-x-2 text-center">
                                {photoPreview && !isEnhanced && (
                                    <button type="button" onClick={handleEnhance} className="text-sm font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200">
                                        ✨ Enhance Image
                                    </button>
                                )}
                                {photoPreview && isEnhanced && (
                                    <button type="button" onClick={handleRevert} className="text-sm font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">
                                        Revert
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={!photo || isSubmitting} className="px-4 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Submitting...' : 'Submit & Claim Reward'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteEventModal;