import React from 'react';
import { Reward } from '../types';
import { CloseIcon } from './Icons';
import { SP_TO_NPR_RATE } from '../constants';

interface QRCodePaymentModalProps {
    reward: Reward;
    userPoints: number;
    onClose: () => void;
    onPaymentSuccess: (pointsUsed: number) => void;
}

const QRCodePaymentModal: React.FC<QRCodePaymentModalProps> = ({ reward, userPoints, onClose, onPaymentSuccess }) => {
    
    const pointsToUse = Math.min(userPoints, reward.cost);
    const remainingCostInSP = reward.cost - pointsToUse;
    const amountToPayNPR = Math.round(remainingCostInSP / SP_TO_NPR_RATE);

    const isCombinedPayment = pointsToUse > 0;
    
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=esewa_payment_for_${reward.id}_price_${amountToPayNPR}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm animate-slideInUp">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-blue-dark">
                        {isCombinedPayment ? 'Combined Payment' : 'Pay with QR'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 text-center">
                    <p className="text-gray-700 mb-2">Scan the QR code below using your preferred payment app (eSewa, Khalti, etc.) to purchase:</p>
                    <h3 className="font-bold text-lg mb-1">{reward.title}</h3>

                    {isCombinedPayment && (
                        <div className="my-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Cost:</span>
                                <span className="font-semibold">{reward.cost.toLocaleString()} SP</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-600">Using your points:</span>
                                <span className="font-semibold text-red-600">-{pointsToUse.toLocaleString()} SP</span>
                            </div>
                             <hr className="my-2"/>
                             <div className="flex justify-between font-bold">
                                <span className="text-gray-800">Remaining to Pay:</span>
                                <span className="text-brand-green">Rs. {amountToPayNPR}</span>
                            </div>
                        </div>
                    )}
                    
                    {!isCombinedPayment && (
                         <p className="font-extrabold text-2xl text-brand-green mb-4">Rs. {amountToPayNPR}</p>
                    )}
                    
                    <div className="flex justify-center my-4">
                        <img src={qrCodeImageUrl} alt="QR Code for payment" className="w-56 h-56 border-4 border-gray-200 rounded-lg" />
                    </div>

                    <p className="text-sm text-gray-500">After completing the payment, click the button below to confirm.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg">
                    <button 
                        onClick={() => onPaymentSuccess(pointsToUse)} 
                        className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition-colors"
                    >
                        Confirm Payment & Get Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodePaymentModal;