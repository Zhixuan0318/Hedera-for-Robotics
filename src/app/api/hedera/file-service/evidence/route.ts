import { NextRequest, NextResponse } from 'next/server';

import { Client, FileContentsQuery, FileCreateTransaction, PrivateKey } from '@hashgraph/sdk';

const client = Client.forTestnet();
const privateKey = PrivateKey.fromStringECDSA(process.env.OWNER_PK as string);
client.setOperator('0.0.5159889', privateKey);

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('blob') as File | null;
        if (!file) throw new Error('No file was provided');

        const buffer = await file.arrayBuffer();

        const transaction = new FileCreateTransaction()
            .setKeys([privateKey.publicKey])
            .setContents(new Uint8Array(buffer))
            .freezeWith(client);

        const signTx = await transaction.sign(privateKey);

        const signed = await signTx.execute(client);
        const receipt = await signed.getReceipt(client);

        return NextResponse.json(
            {
                cid: receipt.fileId?.toString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
}

// Get Image
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.fileId) throw new Error('No File ID');

        const query = new FileContentsQuery().setFileId(body.fileId);
        const contents = await query.execute(client);

        return NextResponse.json(
            {
                data: contents,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}
