
// libs
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    DISPATCH_ACTION,
    SCRIPT_LOADING_STATE
} from "@paypal/react-paypal-js";
import { PricePlanType } from "@/types/api-types";
<<<<<<< HEAD
import { toast } from "sonner";
=======
import { usePriceStore } from "@/lib/stores/price-store";
>>>>>>> 9cea6f8 (fixing conflicts)

const ButtonWrapper = ({ type }: { type: string, }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    // call the price store and init the plan

    const price_plans = usePriceStore((state) => state.price_plan);
    const plan_id = price_plans ? price_plans?.id : null;

    console.log("price plan: ", price_plans);

    // this is for mock only!!!!!!!!!!!!!!!!!!!
    const public_url = process.env.NEXT_PUBLIC_PUBLIC_URL;
    const server_url = process.env.NEXT_PUBLIC_SERVER_API_URL
    useEffect(() => {
        dispatch({
<<<<<<< HEAD
            // type: 'resetOptions' as DISPATCH_ACTION.RESET_OPTIONS,
            type: 'setLoadingStatus' as DISPATCH_ACTION.LOADING_STATUS,
            value: {
                state: 'pending' as SCRIPT_LOADING_STATE.PENDING,
                message: 'Loading...'
            }
=======
            type: 'setLoadingStatus' as DISPATCH_ACTION.LOADING_STATUS,
            value: {
                message: 'PayPal is Initializing...',
                state: 'pending' as SCRIPT_LOADING_STATE.PENDING
            },
>>>>>>> 9cea6f8 (fixing conflicts)
        });
    }, [type]);

    // TODO: handle the correct date starting for a plan.
    // to set the starting date.
    let now = new Date();
    const plan_id = plan?.id;
    return (<PayPalButtons
        createSubscription={(data, actions) => {
            return actions.subscription
                .create({
                    // TODO: set correct starting date with correct lib.
                    "plan_id": plan_id ? plan_id.toString() : "undefined",
                    "start_time": new Date(now.setDate(now.getDate() + 2)).toISOString(),
                    "subscriber": {
                        "name": {  // TODO: set the correct user data here.
                            "given_name": "avom",
                            "surname": "brice"
                        },
                        "email_address": "avomevariste@example.com.com",
                    },
                    "application_context": {
                        "brand_name": "SENWISETOOL",
                        "locale": "en-US",
                        "user_action": "SUBSCRIBE_NOW",
                        "payment_method": {
                            "payer_selected": "PAYPAL",
                            "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                        },
                        "return_url": `${server_url}/subscriptions/successPayPalPayment`,
                        "cancel_url": `${public_url}`,
                    }

                })

        }}
        style={{
            label: "subscribe",
            layout: "horizontal",
        }}
        onApprove={async function (data, actions) { //TODO: change this with a toast...
            toast.success(`You have successfully subscribed to ${plan?.plan_name}`); // Optional message given to subscriber
        }}
    />);
}

export function PaypalPaypements() {


    const paypalOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        components: "buttons",
        intent: "subscription",
        vault: true,
    }

    return (
        <PayPalScriptProvider
            options={paypalOptions}
        >
            <ButtonWrapper type="subscription" />
        </PayPalScriptProvider>
    );
}