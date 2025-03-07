import { Spinner } from '@/components/atoms/spinner/spinner';
import React from 'react';

interface PaymentButtonProps {
    loading: boolean;
    hasInitiate: boolean;
    transactionId: string;
    validationErrors: any;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function PaymentButton({
    loading,
    hasInitiate,
    transactionId,
    validationErrors,
    handleSubmit, // Assuming this is passed down from the parent component
}: PaymentButtonProps) {
    return (
        <>
            <button
                type="submit"
                disabled={loading || Object.keys(validationErrors).length > 0 || (hasInitiate && !!transactionId)}
                className={`
                    flex items-center justify-center gap-3 p-2
                    ${loading || (hasInitiate && transactionId) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}
                    ${Object.keys(validationErrors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}
                    font-semibold text-white w-full rounded
                `}
            >
                {loading && <Spinner />}
                <span>Initiate Payment</span>
            </button>
        </>
    )
}

export default PaymentButton;
