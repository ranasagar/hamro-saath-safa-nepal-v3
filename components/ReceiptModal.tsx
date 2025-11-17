import React from 'react';
import { PurchaseReceipt } from '../types';
import { CloseIcon } from './Icons';

interface ReceiptModalProps {
    receipt: PurchaseReceipt;
    onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
    const isPending = receipt.status === 'pending';
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[70] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm animate-slideInUp overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-gray-dark">Purchase Receipt</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 relative font-sans">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        {isPending ? (
                             <p className="text-8xl font-black text-amber-500/10 transform -rotate-12 select-none">PENDING</p>
                        ) : (
                             <p className="text-8xl font-black text-green-500/10 transform -rotate-12 select-none">PAID</p>
                        )}
                    </div>

                    <div className="text-center mb-4">
                        <h3 className="font-bold text-lg">{receipt.rewardTitle}</h3>
                        <p className="text-sm text-gray-500">from {receipt.rewardPartner}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm border-t border-b border-dashed py-3 my-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Issued to:</span>
                            <span className="font-semibold">{receipt.userName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-semibold">{new Date(receipt.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-semibold">{new Date(receipt.timestamp).toLocaleTimeString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-semibold text-xs font-mono">{receipt.id}</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                        <p className="font-bold mb-2">Payment Details:</p>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="py-1 text-gray-600">Total Cost:</td>
                                    <td className="py-1 text-right font-mono font-semibold">{receipt.costInSP.toLocaleString()} SP</td>
                                </tr>
                                {receipt.pointsUsed > 0 && (
                                    <tr>
                                        <td className="py-1 text-gray-600">Points Used:</td>
                                        <td className="py-1 text-right font-mono font-semibold text-red-600">-{receipt.pointsUsed.toLocaleString()} SP</td>
                                    </tr>
                                )}
                                {receipt.amountPaidNPR > 0 && (
                                     <tr>
                                        <td className="py-1 text-gray-600">Cash Paid (QR):</td>
                                        <td className="py-1 text-right font-mono font-semibold">Rs. {receipt.amountPaidNPR.toLocaleString()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                     <div className="text-center text-sm font-semibold p-2 rounded-md
                        ${isPending ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}
                     ">
                        Status: {receipt.status.toUpperCase()}
                     </div>


                    <div className="flex flex-col items-center border-t pt-4 mt-4">
                         <p className="text-xs text-gray-500 mb-2">Show this QR to the vendor for verification</p>
                         <img src={receipt.qrCodeUrl} alt="Verification QR Code" className="w-32 h-32 border-2 border-gray-200 rounded-md" />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg">
                    <button 
                        onClick={onClose} 
                        className="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;