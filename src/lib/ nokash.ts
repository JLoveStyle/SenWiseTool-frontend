import { NokashPaymentRequest, NokashCallback } from "@/types/nokash-type";
import { API_URL, PAYMENT_API_URL } from "@/utiles/services/constants";
// import { toast } from "sonner";


export class NokashPaymentService {
    private baseUrl = PAYMENT_API_URL;
    private iSpaceKey: string;
    private appSpaceKey: string;

    constructor(iSpaceKey: string, appSpaceKey: string) {
        this.iSpaceKey = iSpaceKey;
        this.appSpaceKey = appSpaceKey;
    }

    // initiate payment on payment api
    async initiatePayment(
        paymentDetails: Omit<NokashPaymentRequest, "i_space_key" | "app_space_key">
    ) {
        const user_email = paymentDetails.user_data?.user_email;
        delete paymentDetails.user_data?.user_email;
        // remove user email from the payment details

        try {
            const response = await fetch(`${this.baseUrl}/api-payin-request/407`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    i_space_key: this.iSpaceKey,
                    app_space_key: this.appSpaceKey,
                    ...paymentDetails,
                }),
            });

            return await response.json();
        } catch (error) {
            console.error("Failed to initiate payment:", error);
            throw error;
        }
    }

    // check payment status from payment api
    async checkStatus(transactionId: string) {

        try {
            const response = await fetch(
                `${this.baseUrl}/310/status-request?transaction_id=${transactionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        transaction_id: transactionId,
                    }),
                }
            );

            return await response.json();
        } catch (error) {
            console.error("Failed to check payment status:", error);
            throw error;
        }
    }

    // store payment details on senwisetool
    async storePaymentDetails(paymentDetails: NokashCallback) {
        const { current_price_id, token } = paymentDetails;
        if (!current_price_id || !token) {
            return console.error("No current price or token Identifier provided");
        }

        const maxRetries = 3;
        const baseDelay = 1000; // 1 second initial delay
        let retries = 0;

        while (retries <= maxRetries) {
            try {
                const response = await fetch(
                    `${API_URL}/subscriptions/success_payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(paymentDetails),
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `API responded with status ${response.status}: ${errorText}`
                    );
                }

                return await response.json();
            } catch (error) {
                console.error(
                    `Failed to store payment details (attempt ${retries + 1}/${maxRetries + 1
                    }):`,
                    error
                );

                if (retries === maxRetries) {
                    throw error; // Throw error after all retries are exhausted
                }

                // Exponential backoff with jitter
                const delay = baseDelay * Math.pow(2, retries) + Math.random() * 1000;
                await new Promise((resolve) => setTimeout(resolve, delay));

                retries++;
            }
        }
    }

    async alertUserOfFailedPayment(paymentDetails: NokashCallback) {
        const { current_price_id, token } = paymentDetails;
        if (!current_price_id || !token) {
            return console.error("No current price or token Identifier provided");
        }

        const maxRetries = 3;
        const baseDelay = 1000; // 1 second initial delay
        let retries = 0;

        while (retries <= maxRetries) {
            try {
                const response = await fetch(
                    `${API_URL}/subscriptions/cancel_payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(paymentDetails),
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `API responded with status ${response.status}: ${errorText}`
                    );
                }
                return await response.json();
            } catch (error) {
                console.error(
                    `Failed to alert user of failed payment (attempt ${retries + 1}/${maxRetries + 1
                    }):`,
                    error
                );

                if (retries === maxRetries) {
                    throw error; // Throw error after all retries are exhausted
                }

                // Exponential backoff with jitter
                const delay = baseDelay * Math.pow(2, retries) + Math.random() * 1000;
                console.log(`Retrying in ${Math.round(delay / 1000)} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));

                retries++;
            }
        }
    }
}
