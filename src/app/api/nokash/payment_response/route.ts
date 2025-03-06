// app/api/nokash-callback/route.ts
import { NokashPaymentService } from '@/lib/ nokash'
import { NokashCallback } from '@/types/nokash-type';
import { BASE_URL } from '@/utiles/services/constants';
import { LOCAL_STORAGE } from '@/utiles/services/storage';
import { getStorageData } from '@/utils/tool';
import { NextResponse } from 'next/server'

// Define the expected payload structure

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);

const currentPlan = getStorageData('current_price_plan');
// console.log("\n\n\ninside the payment_response currentPlan: ", currentPlan);


export async function POST(request: Request) {
    try {

        console.log("\n\n\n inside the payment_response response: ", request);
        // Ensure the request has a body
        if (!request.json) {
            console.error("No request body found in NOKASH callback")
            return NextResponse.redirect(new URL(`${BASE_URL}/payment/cancel`))
        }

        // Parse the callback data
        const callbackData: NokashCallback = await request.json()

        console.log("\n\n\n inside the payment_response callbackData: ", callbackData);

        // Validate required fields
        if (!callbackData.id || !callbackData.status || !callbackData.amount || !callbackData.orderId) {
            return NextResponse.redirect(new URL(`${BASE_URL}/payment/cancel`))
        }

        switch (callbackData.status) {
            case 'SUCCESS':
                await handleSuccessfulPayment(callbackData, request);
                break
            case 'FAILED':
                await handleFailedPayment(callbackData, request);
                break
            case 'CANCELED':
                await handleCanceledPayment(callbackData, request);
                break
            case 'TIMEOUT':
                await handleTimedOutPayment(callbackData, request);
                break
            case 'PENDING':
                await handlePendingPayment(callbackData, request);
                break
        }

        // Return a success response to NOKASH
        return NextResponse.json(
            { message: 'Callback processed successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing NOKASH callback:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Example handler functions - implement these based on your needs
async function handleSuccessfulPayment(data: NokashCallback, request: Request) {

    // Log successful payment details
    console.log('\n\nProcessing successful payment:', { data, currentPlan });


    try {
        if (data?.status === 'SUCCESS' || !data?.statusReason) {
            // construct object to send to an api.
            const dataobj = {
                ...data,
                current_price_id: currentPlan?.id,
                initiatedAt: data?.initiatedAt && data?.initiatedAt.toString().split(',').join(''),
            };

            console.log("Storing payment details...");
            try {
                const response = await nokashService.storePaymentDetails(dataobj);
                console.log("Data stored:", response);
            } catch (error) {
                console.error("Failed to store payment details:", error);
                return NextResponse.json({ error: 'Failed to store payment details' }, { status: 500 });
            }
            return NextResponse.redirect(new URL('/payment/success', request.url), { status: 302 });
        }
    } catch (error) {
        console.error("errror checking for payment status", error);

    }
}

async function handleFailedPayment(data: NokashCallback, request: Request) {
    // Update order status to failed
    // Notify customer of failed payment
    // Log failure reason
    console.log('\n\nProcessing failed payment:', data);
    return NextResponse.redirect(new URL(`/payment/cancel`, request.url));
    // return NextResponse.redirect(new URL(`/payment/success`, `${BASE_URL}`));
}

async function handleCanceledPayment(data: NokashCallback, request: Request) {
    // Update order status to cancelled
    // Return held items to inventory
    // Notify customer of cancellation
    console.log('\n\nProcessing canceled payment:', data);
    return NextResponse.redirect(new URL('/payment/cancel', request.url));
}

async function handleTimedOutPayment(data: NokashCallback, request: Request) {
    // Update order status to expired
    // Release held inventory
    // Notify customer to try again
    console.log('\n\nProcessing timed out payment:', data);
    return NextResponse.redirect(new URL('/payment/cancel', request.url))
}

async function handlePendingPayment(data: NokashCallback, request: Request) {
    // Update order status to pending
    // Hold inventory if necessary
    // Set up monitoring for timeout
    console.log('\n\nProcessing pending payment:', data);
    return NextResponse.redirect(new URL('/payment/cancel', request.url))
}