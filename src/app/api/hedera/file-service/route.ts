import { NextRequest, NextResponse } from 'next/server';

import { Client, FileContentsQuery, FileCreateTransaction, PrivateKey } from '@hashgraph/sdk';

const client = Client.forTestnet();
const privateKey = PrivateKey.fromStringECDSA(process.env.OWNER_PK as string);
client.setOperator('0.0.5159889', privateKey);

export const maxDuration = 60;

// Upload Receipt
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.content) throw new Error('No content');

        const transaction = new FileCreateTransaction()
            .setKeys([privateKey.publicKey])
            .setContents(body.content)
            .freezeWith(client);

        const signTx = await transaction.sign(privateKey);

        const signed = await signTx.execute(client);
        const receipt = await signed.getReceipt(client);

        return NextResponse.json(
            { receipt: receipt.fileId ? receipt.fileId.toString() : '' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}

// Get Receipt
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.fileId) throw new Error('No File ID');

        const query = new FileContentsQuery().setFileId(body.fileId);
        const contents = await query.execute(client);
        const decoded = new TextDecoder().decode(contents);

        return NextResponse.json(
            {
                data: decoded,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}
