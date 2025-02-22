import { NextResponse } from 'next/server';
import { NokashPaymentService } from '@/lib/ nokash';

const nokashService = new NokashPaymentService(
    process.env.NEXT_PUBLIC_NOKASH_I_SPACE_KEY!,
    process.env.NEXT_PUBLIC_NOKASH_APP_SPACE_KEY!
);


export async function POST(request: Request) {
    try {
        const body = await request.json();

        // create a payment on payment api Nokash
        const response = await nokashService.initiatePayment(body);

        console.log("\n\n response of initiate payment: ", response);
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to initiate payment' },
            { status: 500 }
        );
    }
}
