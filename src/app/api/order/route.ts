import { NextRequest, NextResponse } from 'next/server';

import { processStage } from '@/helpers/processStage';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.orderId) throw new Error('No order was provided');
        if (!body.stage) throw new Error('No stage was provided');
        if (!body.address) throw new Error('No address was provided');

        await processStage(body.orderId, body.stage, body.address);

        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}
