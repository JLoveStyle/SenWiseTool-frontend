export type PaymentType = 'CM_MOBILEMONEY' | 'NG_BANKTRANSFER';
export type PaymentMethod = 'MTN_MOMO' | 'ORANGE_MONEY' | 'BANK_TRANSFER';
export type PaymentStatus = 'PENDING' | 'FAILED' | 'CANCELED' | 'TIMEOUT' | 'SUCCESS';

export interface NokashPaymentRequest {
    i_space_key: string;
    app_space_key: string;
    payment_type: PaymentType;
    country: 'CM' | 'NG';
    payment_method: PaymentMethod;
    order_id: string;
    amount: number;
    callback_url?: string;
    user_data: {
        user_phone?: string;
        user_email?: string;
        user_name?: string;
    };
}


export interface NokashCallback {
    id: string
    status: 'PENDING' | 'FAILED' | 'CANCELED' | 'TIMEOUT' | 'SUCCESS'
    amount: number
    phone?: string
    initiatedAt?: number[] | string
    statusReason?: string
    orderId: string
    current_price_id?: string
}
