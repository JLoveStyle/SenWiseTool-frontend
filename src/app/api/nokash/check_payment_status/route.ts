import { NextResponse } from 'next/server';
import { NokashPaymentService } from '@/lib/ nokash';

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);

export async function POST(request: Request) {
    try {
        const { transaction_id, current_price_id } = await request.json();
        const response = await nokashService.checkStatus(transaction_id);

        console.log("\n\n Response of status check:", response);

        if (response?.data?.status === 'SUCCESS') {
            console.log("Storing payment details...");
            const data = await nokashService.storePaymentDetails({
                ...response.data,
                current_price_id
            });
            console.log("Data stored:", data);

            return NextResponse.redirect(new URL('/payment/success', request.url));
        }
    } catch (error) {
        console.error("Failed to store payment details:", error);
        return NextResponse.redirect(new URL('/payment/cancel', request.url));
    }
}
