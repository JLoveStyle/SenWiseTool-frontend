// src/components/molecules/PaymentModal.tsx
import React from 'react';
import NokashPaymentForm from '@/components/molecules/payment-modal/components/nokash-payment-form.tsx';
import { PricePlanType } from '@/types/api-types';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    planType: string;
    currentPricePlan?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    amount,
    planType,
    currentPricePlan
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl ">
                <div className="bg-white rounded-lg shadow-xl m-4">
                    {/* Header */}
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[16px] font-semibold text-center flex justify-center items-center">
                                <span>Complete Payment</span>
                            </h2>
                            {/* close button */}
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl text-blue-800 font-semibold ">
                                Payment for {planType} - {amount.toLocaleString()} USD
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                        <NokashPaymentForm
                            amount={amount}
                            currentPlan={currentPricePlan}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;