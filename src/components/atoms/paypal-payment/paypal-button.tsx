
// libs
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type, plan_id }: { type: string, plan_id: string }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    const public_url = process.env.NEXT_PUBLIC_PUBLIC_URL
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                intent: "subscription",
            },
        });
    }, [type]);

    // TODO: handle the correct date starting for a plan.
    // to set the starting date.
    let now = new Date();

    return (<PayPalButtons
        createSubscription={(data, actions) => {
            return actions.subscription
                .create({

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
                        "return_url": `${public_url}`,
                        "cancel_url": `${public_url}`,
                    }

                })

        }}
        style={{
            label: "subscribe",
            layout: "horizontal",
        }}
        onApprove={async function (data, actions) { //TODO: change this with a toast...
            alert('You have successfully subscribed to ' + data.subscriptionID); // Optional message given to subscriber
        }}
    />);
}

export function PaypalPaypements({ plan_id }: { plan_id: string }) {

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
            <ButtonWrapper type="subscription" plan_id={plan_id} />
        </PayPalScriptProvider>
    );
}