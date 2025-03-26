// import { NokashCallback } from '@/types/nokash-type';
// import { NextResponse } from 'next/server';

// const paymentStatusCache: Record<string, any> = {}; // Global in-memory cache

// export async function POST(request: Request) {
//     try {
//         // Parse the callback data correctly
//         const callbackData: NokashCallback = await request.json();

//         // Validate required fields
//         if (!callbackData.id || !callbackData.status || !callbackData.amount || !callbackData.orderId) {
//             console.error("Invalid NOKASH callback data");
//             return NextResponse.json({ error: 'Invalid callback data' }, { status: 400 });
//         }

//         // Store in cache
//         paymentStatusCache[callbackData.orderId] = callbackData;

//         console.log("\n\n data stored in the cache: ", paymentStatusCache);

//         switch (callbackData.status) {
//             case 'SUCCESS':
//                 return await handleSuccessfulPayment(callbackData);
//             case 'FAILED':
//                 return await handleFailedPayment(callbackData, request);
//             default:
//                 console.error("Unknown status:", callbackData.status);
//                 return NextResponse.json({ error: "Unknown status" }, { status: 400 });
//         }
//     } catch (error) {
//         console.error('Error processing NOKASH callback:', error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

// // Handle a successful payment
// async function handleSuccessfulPayment(data: NokashCallback) {
//     console.log('✅ Processing successful payment:', data);

//     // Store in cache
//     paymentStatusCache[data.orderId] = data;

//     return NextResponse.json({ message: "Payment successful", data }, { status: 200 });
// }

// // Handle a failed payment
// async function handleFailedPayment(data: NokashCallback, request: Request) {
//     console.log('❌ Processing failed payment:', data);

//     // Store in cache
//     paymentStatusCache[data.orderId] = data;
//     console.log('✅ get the payment callback:', request.url);
//     return NextResponse.json({ message: "Payment failed", data }, { status: 400 });
// }

// // GET request to fetch cached payments
// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get('orderId');

//     if (!orderId) {
//         return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
//     }

//     const data = paymentStatusCache[orderId];

//     console.log("\n\n from the api response payment:GET \n\n", data);

//     if (!data) {
//         return NextResponse.json({ error: "Order ID not found" }, { status: 404 });
//     }

//     try {
//         return NextResponse.json(JSON.parse(JSON.stringify(data)), { status: 200 });
//     } catch (error) {
//         console.error("Serialization error:", error);
//         return NextResponse.json({ error: "Failed to serialize response" }, { status: 500 });
//     }
// }

import { NokashCallback } from '@/types/nokash-type';
import { NextResponse } from 'next/server';

interface CacheItem {
    data: any;
    promise?: Promise<any>;
    resolved: boolean;
}

const paymentStatusCache: Record<string, CacheItem> = {}; // Global in-memory cache with promises

export async function POST(request: Request) {
    try {
        // Parse the callback data correctly
        const callbackData: NokashCallback = await request.json();

        // Validate required fields
        if (!callbackData.id || !callbackData.status || !callbackData.amount || !callbackData.orderId) {
            console.error("Invalid NOKASH callback data");
            return NextResponse.json({ error: 'Invalid callback data' }, { status: 400 });
        }

        let result;

        switch (callbackData.status) {
            case 'SUCCESS':
                result = await handleSuccessfulPayment(callbackData);
                break;
            case 'FAILED':
                result = await handleFailedPayment(callbackData, request);
                break;
            default:
                console.error("Unknown status:", callbackData.status);
                return NextResponse.json({ error: "Unknown status" }, { status: 400 });
        }

        // Mark as resolved and store data
        if (paymentStatusCache[callbackData.orderId]) {
            paymentStatusCache[callbackData.orderId].data = callbackData;
            paymentStatusCache[callbackData.orderId].resolved = true;
        } else {
            paymentStatusCache[callbackData.orderId] = {
                data: callbackData,
                resolved: true
            };
        }

        console.log("\n\n data stored in the cache: ", paymentStatusCache);

        return result;
    } catch (error) {
        console.error('Error processing NOKASH callback:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Handle a successful payment
async function handleSuccessfulPayment(data: NokashCallback) {
    console.log('✅ Processing successful payment:', data);
    return NextResponse.json({ message: "Payment successful", data }, { status: 200 });
}

// Handle a failed payment
async function handleFailedPayment(data: NokashCallback, request: Request) {
    console.log('❌ Processing failed payment:', data);
    console.log('✅ get the payment callback:', request.url);
    return NextResponse.json({ message: "Payment failed", data }, { status: 400 });
}

// GET request to fetch cached payments with waiting mechanism
// Update the GET function to handle timeouts more gracefully

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const timeoutMs = Number(searchParams.get('timeout') || 120000); // Default 120-second timeout

    // Validate orderId
    if (!orderId) {
        return NextResponse.json(
            { error: "Missing orderId" },
            { status: 400 }
        );
    }

    // Check if data already exists and is resolved in the cache
    if (paymentStatusCache[orderId]?.resolved && paymentStatusCache[orderId]?.data) {
        console.log("\n\n GET returning cached data immediately:", paymentStatusCache[orderId].data);
        try {
            return NextResponse.json(paymentStatusCache[orderId].data, { status: 200 });
        } catch (error) {
            console.error("Serialization error:", error);
            return NextResponse.json(
                { error: "Failed to serialize response" },
                { status: 500 }
            );
        }
    }

    // If the orderId is not in the cache, create a new entry with a promise
    if (!paymentStatusCache[orderId]) {
        let resolvePromise: (value: any) => void;
        const promise = new Promise<any>((resolve) => {
            resolvePromise = resolve;
        });

        paymentStatusCache[orderId] = {
            data: null,
            promise,
            resolved: false,
        };
    }

    // Wait for the promise to resolve or timeout
    try {
        console.log(`\n\n GET waiting for POST to complete for orderId: ${orderId}`);

        // Use Promise.race to handle timeout
        const result = await Promise.race([
            paymentStatusCache[orderId].promise,
            new Promise((_, reject) =>
                setTimeout(() => reject({ timeoutError: true }), timeoutMs)
            ),
        ]);

        console.log("\n\n GET returning data after waiting:", result);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error or timeout waiting for payment data:", error);

        // Handle timeout specifically
        if (error?.timeoutError) {
            return NextResponse.json(
                {
                    error: "Timeout waiting for payment data",
                    message: "The payment webhook has not been received yet",
                },
                { status: 408 } // 408 Request Timeout
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                error: "Failed to retrieve payment data",
                message: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}