import { NextRequest, NextResponse } from 'next/server';

import { Client, PrivateKey, TokenInfoQuery } from '@hashgraph/sdk';
import contractIds from '@/data/contract-ids';

const client = Client.forTestnet();
const privateKey = PrivateKey.fromStringECDSA(process.env.OWNER_PK as string);
const accountId = '0.0.5159889';
client.setOperator(accountId, privateKey);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (body.productId == undefined) throw new Error('No product id');

        const query = new TokenInfoQuery().setTokenId(
            body.productId == 0
                ? contractIds.tokenIdGreen
                : body.productId == 1
                ? contractIds.tokenIdPurple
                : contractIds.tokenIdBlue
        );
        const tokenInfo = await query.execute(client);
        return NextResponse.json({ supply: Number(tokenInfo.totalSupply) }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
