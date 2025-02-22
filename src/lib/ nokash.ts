import { NokashPaymentRequest, NokashCallback } from "@/types/nokash-type";
import { API_URL, PAYMENT_API_URL } from "@/utiles/services/constants";
import { mutateApiData } from "@/utiles/services/mutations";
import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { toast } from "sonner";

export class NokashPaymentService {
    private baseUrl = PAYMENT_API_URL;
    private iSpaceKey: string;
    private appSpaceKey: string;


    constructor(iSpaceKey: string, appSpaceKey: string) {
        this.iSpaceKey = iSpaceKey;
        this.appSpaceKey = appSpaceKey;
    }

    // initiate payment on payment api
    async initiatePayment(paymentDetails: Omit<NokashPaymentRequest, 'i_space_key' | 'app_space_key'>) {
        console.log("\n\n initiate payment for \n\n", paymentDetails);

        const user_email = paymentDetails.user_data?.user_email;
        delete paymentDetails.user_data?.user_email;
        // remove user email from the payment details

        try {
            const response = await fetch(`${this.baseUrl}/api-payin-request/407`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    i_space_key: this.iSpaceKey,
                    app_space_key: this.appSpaceKey,
                    ...paymentDetails,
                }),
            });

            return await response.json();
        } catch (error) {
            console.error('Failed to initiate payment:', error);
            throw error;
        }
    }

    // check payment status from payment api
    async checkStatus(transactionId: string) {
        console.log("\n\n Check payment status for id \n\n", transactionId);

        try {
            const response = await fetch(`${this.baseUrl}/310/status-request?transaction_id=${transactionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transaction_id: transactionId,
                }),
            });

            return await response.json();
        } catch (error) {
            console.error('Failed to check payment status:', error);
            throw error;
        }
    }

    // store payment details on senwisetool 
    async storePaymentDetails(paymentDetails: NokashCallback) {
        if (!paymentDetails.current_price_id) {
            toast.error("No current price Identifier provided");
            return;
        }
        const token = LOCAL_STORAGE.get('token');
        console.log("\n\n data to store: ", paymentDetails, token);
        try {
            const response = await fetch(`${API_URL}/subscriptions/success_payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(paymentDetails),
            });

            console.log("\n\n response of storage payment: ", response);
            return await response.json();
        } catch (error) {
            console.error('Failed to store payment details:', error);
            throw error;
        }
    }
}
