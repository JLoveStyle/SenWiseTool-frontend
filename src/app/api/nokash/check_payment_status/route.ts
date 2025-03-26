import { NextResponse } from 'next/server';
import { NokashPaymentService } from '@/lib/ nokash';
import { retry, sanitizeObject } from '@/utils/tool';

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);

export async function POST(request: Request) {
    try {
        const { transaction_id, current_price_id, token } = await request.json();

        // Retry the status check up to 3 times with a 1-second delay between retries
        const response = await retry(
            () => nokashService.checkStatus(transaction_id),
            3, // Max retries
            1000 // Delay between retries in milliseconds
        );

        console.log("\n\n Response of status check:", { response, transaction_id, current_price_id, token });

        if (response?.data?.status === 'SUCCESS') {
            console.log("Storing payment details...");

            // Retry storing payment details up to 3 times with a 1-second delay between retries
            const data = await retry(
                () =>
                    nokashService.storePaymentDetails({
                        ...response.data,
                        current_price_id,
                        token,
                    }),
                3, // Max retries
                1000 // Delay between retries in milliseconds
            );

            console.log("Data to return:", data?.data);

            if (!data?.data) {
                return NextResponse.json({ message: "No data found" }, { status: 404 });
            }

            const sanitizedData = sanitizeObject(data?.data);
            return NextResponse.json(sanitizedData);
        }

        return NextResponse.json(null);
    } catch (error) {
        console.error("Failed to store payment details:", error);
        return NextResponse.redirect(new URL('/payment/cancel', request.url));
    }
}