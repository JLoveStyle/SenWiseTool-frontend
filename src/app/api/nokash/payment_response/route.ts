import { NokashCallback } from '@/types/nokash-type';
import { NextResponse } from 'next/server';

const paymentStatusCache: Record<string, any> = {}; // Global in-memory cache

export async function POST(request: Request) {
    try {
        // Parse the callback data correctly
        const callbackData: NokashCallback = await request.json();

        // Validate required fields
        if (!callbackData.id || !callbackData.status || !callbackData.amount || !callbackData.orderId) {
            console.error("Invalid NOKASH callback data");
            return NextResponse.json({ error: 'Invalid callback data' }, { status: 400 });
        }

        // Store in cache
        paymentStatusCache[callbackData.orderId] = callbackData;

        switch (callbackData.status) {
            case 'SUCCESS':
                return await handleSuccessfulPayment(callbackData);
            case 'FAILED':
                return await handleFailedPayment(callbackData, request);
            default:
                console.error("Unknown status:", callbackData.status);
                return NextResponse.json({ error: "Unknown status" }, { status: 400 });
        }
    } catch (error) {
        console.error('Error processing NOKASH callback:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Handle a successful payment
async function handleSuccessfulPayment(data: NokashCallback) {
    console.log('✅ Processing successful payment:', data);

    // Store in cache
    paymentStatusCache[data.orderId] = data;

    return NextResponse.json({ message: "Payment successful", data }, { status: 200 });
}

// Handle a failed payment
async function handleFailedPayment(data: NokashCallback, request: Request) {
    console.log('❌ Processing failed payment:', data);

    // Store in cache
    paymentStatusCache[data.orderId] = data;
    console.log('✅ get the payment callback:', request.url);
    return NextResponse.json({ message: "Payment failed", data }, { status: 400 });
}

// GET request to fetch cached payments
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const data = paymentStatusCache[orderId];

    if (!data) {
        return NextResponse.json({ error: "Order ID not found" }, { status: 404 });
    }

    try {
        return NextResponse.json(JSON.parse(JSON.stringify(data)), { status: 200 });
    } catch (error) {
        console.error("Serialization error:", error);
        return NextResponse.json({ error: "Failed to serialize response" }, { status: 500 });
    }
}

