import { NextResponse } from 'next/server';
import { NokashPaymentService } from '@/lib/ nokash';


const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);

// Function to retry the request
async function retryPaymentRequest(body: any, retries = 3, delay = 2000): Promise<any> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await nokashService.initiatePayment(body);
            return response; // Return response if successful
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            if (attempt < retries) {
                await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
            } else {
                throw new Error('Max retry attempts reached');
            }
        }
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Retry payment request in case of failure
        const response = await retryPaymentRequest(body);

        console.log("\n\n Response of initiate payment: ", response);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Final error after retries:', error);
        return NextResponse.json(
            { error: 'Failed to initiate payment after multiple attempts' },
            { status: 500 }
        );
    }
}
