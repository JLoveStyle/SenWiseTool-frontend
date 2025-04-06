"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import { PaymentMethod, PaymentType } from '@/types/nokash-type';
import { createId } from '@paralleldrive/cuid2';
import { ValidationErrors } from '../type';
import EmailInputField from '../email-payment-info';
import { useRouter } from 'next/navigation';
import PaymentButton from './button-component';
import { toast } from 'sonner';
import { BASE_URL } from '@/utiles/services/constants';
import { useCompanyStore } from '@/lib/stores/companie-store';
import { usePriceStore } from '@/lib/stores/price-store';
import { PricePlanType } from '@/types/api-types';
import { Spinner } from '@/components/atoms/spinner/spinner';
import { LOCAL_STORAGE } from '@/utiles/services/storage';
import { NokashPaymentService } from '@/lib/ nokash';
import { sanitizeObject } from '@/utils/tool';


type NokashPaymentProps = {
    isLoading?: boolean;
    amount?: number;
    currentPlanId?: string;
    token?: string;
};

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);


const indicatifOrange = ['655', '656', '657', '658', '6590', '6591', '6592', '6593', '6594', '6595', '69'];
const indicatifMTN = ['650', '651', '652', '653', '654', '67', '680', '681', '682', '683', '684'];

export default function NokashPaymentForm({
    amount,
    currentPlanId,
    token
}: NokashPaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [operator, setOperator] = useState('MTN_MOMO');
    const [isNigeria, setIsNigeria] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hasInitiate, setHasInitiate] = useState(false);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [currentPricePlanId, setCurrentPricePlanId] = useState<string | null>(currentPlanId as string);

    // Load company object from store
    const company = useCompanyStore((state) => state.company);
    const pricePlan = usePriceStore((state) => state.price_plan);
    const accessToken = LOCAL_STORAGE.get('token');

    useEffect(() => {
        if (!currentPlanId)
            setCurrentPricePlanId(pricePlan?.id as string);

        if (company?.payment_id) {
            toast.success(`This company has an ongoing account with ID: ${company?.payment_id}`);
            setTimeout(() => {
                router.replace('/dashboard');
            }, 2000);
        }
    }, []);

    const router = useRouter();


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
    const pollPaymentStatus = async (id: string, pricePlanId: string) => {

        try {
            const response = await fetch('/api/nokash/check_payment_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction_id: id, current_price_id: pricePlanId || currentPricePlanId, token: accessToken }),
            });

            const result = await response.json();

            if (!result) {
                setError(`Payment ${result.data.status.toLowerCase().split('_').join(' ')}`);
                // Redirect to failure page
                return router.replace(BASE_URL + '/payment/cancel');
            }
            // Redirect to success page
            return router.replace(BASE_URL + '/payment/success');
        }

        catch (err) {
            console.log(`Error polling payment status:`, err);
        } finally {
            setIsUploading(false);
        }
    }

    // check payment status from payment api
    const getPaymentStatusFromCallback = async (orderId: string, transaction_id?: string) => {

        try {
            const response = await fetch('/api/nokash/payment_response?orderId=' + orderId);
            const result = await response.json();
            if (result && result?.status === 'SUCCESS') {
                setTransactionId(null);
                toast.success('Payment successful');
                setMessage(`PAYMENT REUSSI`);
                // poll the status of this transaction
                // await pollPaymentStatus(result?.id, currentPricePlanId as string);
                const data = await nokashService.storePaymentDetails({
                    ...result,
                    current_price_id: currentPricePlanId as string,
                    token: accessToken
                })
                if (data?.data) {
                    return router.replace(BASE_URL + '/payment/success');
                }
            }
            if (result?.status === 'FAILED') {
                setTransactionId(null);
                toast.error('Payment Failed. Please try again.');
                setMessage(`ECHEC DE PAYMENT. VEULLEZ REESSAYER`);
                await nokashService.alertUserOfFailedPayment({
                    ...result,
                    current_price_id: currentPricePlanId as string,
                    token: accessToken
                })
                return router.replace(BASE_URL + '/payment/cancel');
            }

            if (result?.error) {
                // checck the payment status
                await pollPaymentStatus(transaction_id as string, currentPricePlanId as string);
            }
        } catch (err) {
            console.log(`Error polling payment status: ${err}`);
            return null;
        } finally {
            setIsUploading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Validate all fields before submission
        const validationErrors: ValidationErrors = {};

        const phone = formData.get('user_phone') as string;
        if (!validatePhoneNumber(phone, operator)) {
            validationErrors.phone = `Numero de telephone incorrecte pour ${operator === 'MTN_MOMO' ? 'MTN' : 'Orange'} Mobile Money`;
        }

        // For Nigeria only.
        if (isNigeria) {
            const email = formData.get('user_email') as string;
            if (!validateEmail(email)) {
                validationErrors.email = 'Veuillez entrer un mail correspond';
            }

            const name = formData.get('user_name') as string;
            if (!validateName(name)) {
                validationErrors.name = 'Le nom doit avoir au moins 2 caracteres';
            }
        }

        const amountValue = Number(formData.get('amount'));
        if (!validateAmount(amountValue)) {
            validationErrors.amount = `Le Montant minimum est ${isNigeria ? '100 NGN' : '1 XAF'}`;
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
            // callback_url: `${API_URL}/api/nokash/payment_response`,
            callback_url: `${BASE_URL}/api/nokash/payment_response`,
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

            if (result.status === 'REQUEST_OK' && result.data) {
                setTransactionId(result.data.id);
                let paymentStatus;
                setIsUploading(true);
                // check the payment status fromm the callback 
                setTimeout(async () => {
                    await getPaymentStatusFromCallback(result.data.orderId, result.data.id);
                }, 1000 * 60);

            } else {
                setError(result.message || 'Erreur lors de l\'initiation du payement');
            }
        } catch (err) {
            setError('Error d\'initiation du payement');
        } finally {
            setLoading(false);
            // setIsUploading(false);
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
                <label className="block text-sm font-medium mb-1">Pays <span className='text-red-500 ml-1'>*</span></label>
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
                <label className="block text-sm font-medium mb-1">Methode de payment <span className='text-red-500 ml-1'>*</span></label>
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
                <label className="block text-sm font-medium mb-1">Montant (en FCFA) <span className='text-red-500 ml-1'>*</span></label>
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
                <label className="block text-sm font-medium mb-1">Numero de telephone<span className='text-red-500 ml-1'>*</span></label>
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

            <PaymentButton
                loading={loading}
                hasInitiate={hasInitiate}
                transactionId={transactionId as string}
                validationErrors={validationErrors}
                handleSubmit={handleSubmit}
            />

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
            {!!message && (
                <>
                    <div className="text-sm text-gray-500">
                        Transaction ID: {transactionId} {isUploading && <Spinner size="small" />}
                    </div>
                    <div className="text-green-600 text-xl">
                        {message.toLocaleLowerCase().includes('try again') ? <span className='text-red-600'>{message}</span> : <div>
                            {message}
                        </div>}
                    </div>
                </>
            )}
        </form>
    );
}