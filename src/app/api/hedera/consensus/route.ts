import { NextRequest, NextResponse } from 'next/server';

import {
    Client,
    PrivateKey,
    Status,
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TransactionRecordQuery,
} from '@hashgraph/sdk';

const client = Client.forTestnet();
const privateKey = PrivateKey.fromStringECDSA(process.env.OWNER_PK as string);
client.setOperator('0.0.5159889', privateKey);

export const maxDuration = 60;

// Create Topic
export async function GET() {
    try {
        const transaction = new TopicCreateTransaction().setAdminKey(privateKey);

        const txResponse = await transaction.execute(client);
        const receipt = await txResponse.getReceipt(client);

        return NextResponse.json(
            { topicId: receipt.topicId ? receipt.topicId.toString() : '' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}

// Submit message
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.topicId) throw new Error('No Topic ID');
        if (!body.message) throw new Error('No Message');

        const transaction = new TopicMessageSubmitTransaction()
            .setTopicId(body.topicId)
            .setMessage(body.message);

        const txResponse = await transaction.execute(client);
        const record = await txResponse.getRecord(client);

        if (record.receipt.status != Status.Success) throw new Error('Tx Error');

        return NextResponse.json(
            { transactionId: record.transactionId.toString() },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}

// Get message
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.topicId) throw new Error('No Topic ID');
        if (!body.txId) throw new Error('No txId');

        const response = await fetch(
            `https://testnet.mirrornode.hedera.com/api/v1/topics/${body.topicId}/messages`
        );
        const json = await response.json();

        const record = await new TransactionRecordQuery()
            .setTransactionId(body.txId)
            .execute(client);

        const element = json.messages.find(
            (item: any) => item.consensus_timestamp == record.consensusTimestamp
        );
        const decoded = atob(element.message);

        return NextResponse.json(
            {
                data: {
                    'Topic ID (Private)': body.topicId,
                    'Consensus Timestamp': record.consensusTimestamp.toDate(),
                    'Sequence Number': element.sequence_number,
                    Message: JSON.parse(decoded),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Error - ${error.message}` }, { status: 500 });
    }
}
