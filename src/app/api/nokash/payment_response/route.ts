// app/api/nokash-callback/route.ts
import { NokashPaymentService } from '@/lib/ nokash'
import { NokashCallback } from '@/types/nokash-type';
import { BASE_URL } from '@/utiles/services/constants';
import { LOCAL_STORAGE } from '@/utiles/services/storage';
import { NextResponse } from 'next/server'

// Define the expected payload structure

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);

const currentPlan = JSON.parse(localStorage.getItem('current_price_plan') ?? '{}');
// console.log("\n\n\ninside the payment_response currentPlan: ", currentPlan);


export async function POST(request: Request) {
    try {


        console.log("\n\n\n inside the payment_response response: ", request);
        // Ensure the request has a body
        if (!request.json) {
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
                await handleSuccessfulPayment(callbackData);
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
async function handleSuccessfulPayment(data: NokashCallback) {
    // Update order status to confirmed
    const response = await fetch('/api/nokash/check_payment_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transaction_id: data?.id, current_price_id: currentPlan.id }),
    });

    const result = await response.json();
    if (result.data?.status === 'REQUEST_OK') {  //we can now store the transaction in the database.
        // Handle successful payment
        console.log("\n\n\n inside the payment_response data to store: ", data);
        const resp = await nokashService.storePaymentDetails({ ...data, current_price_id: currentPlan.id });
        if (!resp) {
            return NextResponse.redirect(new URL(`${BASE_URL}/payment/cancel`))
        }
        // Release purchased items-services
        // TODO: Send confirmation email to customer
        console.log('\n\n Processing successful payment:', resp);
    }

}

async function handleFailedPayment(data: NokashCallback, request: Request) {
    // Update order status to failed
    // Notify customer of failed payment
    // Log failure reason
    console.log('\n\nProcessing failed payment:', data);
    return NextResponse.redirect(new URL(`/payment/cancel`, request.url));
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