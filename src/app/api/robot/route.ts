import { NextRequest, NextResponse } from 'next/server';

import { processStage } from '@/helpers/processStage';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.orderId) throw new Error('No order id was provided');
        if (!body.robotId) throw new Error('No robot id was provided');
        if (!body.address) throw new Error('No robot id was provided');

        await processStage(body.orderId, body.stage, body.address);

        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
