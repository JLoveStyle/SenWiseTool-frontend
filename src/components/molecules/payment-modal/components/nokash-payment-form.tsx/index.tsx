

import { ChangeEvent, useState } from 'react';
import { PaymentMethod, PaymentType } from '@/types/nokash-type';
import { createId } from '@paralleldrive/cuid2';
import { Spinner } from "@/components/atoms/spinner/spinner";
import { BASE_URL } from '@/utiles/services/constants';
import { ValidationErrors } from '../type';
import EmailInputField from '../email-payment-info';

type NokashPaymentProps = {
    isLoading?: boolean;
    amount?: number;
    currentPlan?: string;
};



const indicatifOrange = ['655', '656', '657', '658', '6590', '6591', '6592', '6593', '6594', '6595', '69'];
const indicatifMTN = ['650', '651', '652', '653', '654', '67', '680', '681', '682', '683', '684'];

export default function NokashPaymentForm({ amount, currentPlan }: NokashPaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [operator, setOperator] = useState('MTN_MOMO');
    const [isNigeria, setIsNigeria] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [phoneNumber, setPhoneNumber] = useState('');


    const validatePhoneNumber = (number: string, selectedOperator: string): boolean => {
        // Remove spaces and any non-digit characters
        const cleanNumber = number.replace(/\D/g, '');

        // Check if it's a valid Cameroon number format (9 digits)
        if (cleanNumber.length !== 9) {
            return false;
        }

        if (selectedOperator === 'ORANGE_MONEY') {
            return indicatifOrange.some(prefix => cleanNumber.startsWith(prefix));
        } else if (selectedOperator === 'MTN_MOMO') {
            return indicatifMTN.some(prefix => cleanNumber.startsWith(prefix));
        }

        return false;
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string): boolean => {
        return name.trim().length >= 2;
    };

    const validateAmount = (value: number): boolean => {
        return isNigeria ? value >= 100 : value >= 1;
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 9);
        setPhoneNumber(value);

        if (value.length === 9) {
            if (!validatePhoneNumber(value, operator)) {
                setValidationErrors(prev => ({
                    ...prev,
                    phone: `Invalid phone number for ${operator === 'MTN_MOMO' ? 'MTN' : 'Orange'} Mobile Money`
                }));
            } else {
                setValidationErrors(prev => {
                    const { phone, ...rest } = prev;
                    return rest;
                });
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'user_email':
                if (!validateEmail(value)) {
                    setValidationErrors(prev => ({
                        ...prev,
                        email: 'Please enter a valid email address'
                    }));
                } else {
                    setValidationErrors(prev => {
                        const { email, ...rest } = prev;
                        return rest;
                    });
                }
                break;

            case 'user_name':
                if (!validateName(value)) {
                    setValidationErrors(prev => ({
                        ...prev,
                        name: 'Name must be at least 2 characters long'
                    }));
                } else {
                    setValidationErrors(prev => {
                        const { name, ...rest } = prev;
                        return rest;
                    });
                }
                break;

            case 'amount':
                const numValue = Number(value);
                if (!validateAmount(numValue)) {
                    setValidationErrors(prev => ({
                        ...prev,
                        amount: `Minimum amount is ${isNigeria ? '100 NGN' : '1 XAF'}`
                    }));
                } else {
                    setValidationErrors(prev => {
                        const { amount, ...rest } = prev;
                        return rest;
                    });
                }
                break;
        }
    };

    const handleOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newOperator = e.target.value;
        setOperator(newOperator);

        // Revalidate phone number when operator changes
        if (phoneNumber) {
            if (!validatePhoneNumber(phoneNumber, newOperator)) {
                setValidationErrors(prev => ({
                    ...prev,
                    phone: `Invalid phone number for ${newOperator === 'MTN_MOMO' ? 'MTN' : 'Orange'} Mobile Money`
                }));
            } else {
                setValidationErrors(prev => {
                    const { phone, ...rest } = prev;
                    return rest;
                });
            }
        }
    };


    // Automatic polling of payment status after initiation
    const pollPaymentStatus = async (id: string, current_price_id: string) => {

        const response = await fetch('/api/nokash/check_payment_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transaction_id: id, current_price_id }),
        });

        const result = await response.json();

        console.log("\n\n response of status check UI: ", result?.data);
        if (result.data?.status === 'SUCCESS') {
            // Handle successful payment
            return true;
        } else {
            if ((['FAILED', 'CANCELED', 'TIMEOUT']).includes(result.data?.status)) {
                setError(`Payment ${result.data.status.toLowerCase()}`);
                return true;
            }
            if (result.data?.status === 'REQUEST_BAD_INFOS') {
                setError(`Payment ${result.data.status.toLowerCase().split('_').join(' ')}`);
                return true;
            }
        }
        return false;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Validate all fields before submission
        const validationErrors: ValidationErrors = {};

        const phone = formData.get('user_phone') as string;
        if (!validatePhoneNumber(phone, operator)) {
            validationErrors.phone = `Invalid phone number for ${operator === 'MTN_MOMO' ? 'MTN' : 'Orange'} Mobile Money`;
        }

        // For Nigeria only.
        if (isNigeria) {
            const email = formData.get('user_email') as string;
            if (!validateEmail(email)) {
                validationErrors.email = 'Please enter a valid email address';
            }

            const name = formData.get('user_name') as string;
            if (!validateName(name)) {
                validationErrors.name = 'Name must be at least 2 characters long';
            }
        }

        const amountValue = Number(formData.get('amount'));
        if (!validateAmount(amountValue)) {
            validationErrors.amount = `Minimum amount is ${isNigeria ? '100 NGN' : '1 XAF'}`;
        }

        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return;
        }

        setLoading(true);
        setError(null);

        const paymentData = {
            payment_type: formData.get('payment_type') as PaymentType,
            country: formData.get('country') as 'CM' | 'NG',
            payment_method: formData.get('payment_method') as PaymentMethod,
            order_id: createId(),
            amount: String(amountValue) ?? String(amount),
            callback_url: `http://192.168.100.30:3000/api/nokash/payment_response`,
            user_data: {
                user_phone: '237' + phone,
                user_email: formData.get('user_email') as string,
                // user_name: formData.get('user_name') as string,
            },
        };

        try {
            const response = await fetch('/api/nokash/initiate_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            console.log("\n\n response of initiate payment UI: ", result);

            if (result.status === 'REQUEST_OK' && result.data) {
                setTransactionId(result.data.id);

                // poll the status of this transaction
                // setTimeout(async () => {
                //     await pollPaymentStatus(result.data.id, currentPlan as string);
                // }, 3000);
            } else {
                setError(result.message || 'Payment initiation failed');
            }
        } catch (err) {
            setError('Failed to process payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white">
            <div>
                <label className="block text-sm font-medium mb-1">Payment Type <span className='text-red-500 ml-1'>*</span></label>
                <select name="payment_type" className="w-full p-2 border rounded" required>
                    <option value="CM_MOBILEMONEY">Cameroon Mobile Money</option>
                    {/* <option value="NG_BANKTRANSFER">Nigeria Bank Transfer</option> */}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Country <span className='text-red-500 ml-1'>*</span></label>
                <select
                    // onChange={getSelectedCountry}
                    name="country"
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="CM">Cameroon</option>
                    {/* <option value="NG">Nigeria</option> */}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Payment Method <span className='text-red-500 ml-1'>*</span></label>
                <select
                    name="payment_method"
                    className="w-full p-2 border rounded"
                    required
                    value={operator}
                    onChange={handleOperatorChange}
                >
                    <option value="MTN_MOMO">MTN Mobile Money</option>
                    <option value="ORANGE_MONEY">Orange Money</option>
                    {/* {isNigeria && <option value="BANK_TRANSFER">Bank Transfer</option>} */}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Amount (in African CFA franc) <span className='text-red-500 ml-1'>*</span></label>
                <input
                    type="number"
                    name="amount"
                    min={isNigeria ? 100 : 1}
                    className="w-full p-2 border rounded"
                    required
                    defaultValue={Number(amount) * 632.25}
                    onChange={handleInputChange}
                />
                {validationErrors.amount && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.amount}</p>
                )}
            </div>


            {/* add email field with tooltip info */}
            <EmailInputField handleInputChange={handleInputChange} validationErrors={validationErrors} />

            <div>
                <label className="block text-sm font-medium mb-1">Phone Number <span className='text-red-500 ml-1'>*</span></label>
                <input
                    type="tel"
                    name="user_phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full p-2 border rounded ${validationErrors.phone ? 'border-red-500' : ''}`}
                    placeholder="Example: 650123456"
                />
                {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
            </div>



            {isNigeria && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email <span className='text-red-500 ml-1'>*</span></label>
                        <input
                            type="email"
                            name="user_email"
                            className={`w-full p-2 border rounded ${validationErrors.email ? 'border-red-500' : ''}`}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Name <span className='text-red-500 ml-1'>*</span></label>
                        <input
                            type="text"
                            name="user_name"
                            className={`w-full p-2 border rounded ${validationErrors.name ? 'border-red-500' : ''}`}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                        )}
                    </div>
                </>
            )}

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
                type="submit"
                disabled={loading || Object.keys(validationErrors).length > 0}
                className={`
                    flex items-center justify-center gap-3 p-2
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}
                    ${Object.keys(validationErrors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}
                    font-semibold text-white w-full rounded
                `}
            >
                {loading && <Spinner />}
                <span>Initiate Payment</span>
            </button>

            {transactionId && (
                <>
                    <div className="text-sm text-gray-500">
                        Transaction ID: {transactionId}
                    </div>
                    <div className="text-green-600 text-xl">
                        Transaction initiated. please check you phone to validate. 🚀
                    </div>
                </>
            )}
        </form>
    );
}