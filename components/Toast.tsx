import React, { useState, useEffect } from 'react';
import { ToastData } from '../types';
import { GiftIcon } from './Icons';

interface ToastProps {
  toast: ToastData | null;
  onClear: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClear }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow fade-out transition to complete before clearing the message
        setTimeout(onClear, 500);
      }, 3000); // Display for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toast, onClear]);

  const content = (
    <div className={`bg-brand-green-dark text-white font-bold py-2 px-6 rounded-full shadow-lg flex items-center space-x-2 ${toast?.onClick ? 'cursor-pointer' : ''}`}>
      {toast?.isReward ? (
        <GiftIcon className="h-5 w-5" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
      <span>{toast?.message}</span>
    </div>
  );

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      {toast && (
        toast.onClick ? (
          <button onClick={toast.onClick}>{content}</button>
        ) : (
          content
        )
      )}
    </div>
  );
};

export default Toast;