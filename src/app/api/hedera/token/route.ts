import { NextRequest, NextResponse } from 'next/server';

import {
    AccountId,
    Client,
    Hbar,
    PrivateKey,
    Status,
    TokenCreateTransaction,
    TokenMintTransaction,
    TokenSupplyType,
    TokenType,
    TransferTransaction,
} from '@hashgraph/sdk';

import contractIds from '@/data/contract-ids';
import addresses from '@/data/addresses';

const client = Client.forTestnet();
const privateKey = PrivateKey.fromStringECDSA(process.env.OWNER_PK as string);
const accountId = '0.0.5159889';
client.setOperator(accountId, privateKey);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (body.productId == undefined) throw new Error('No product id');
        if (!body.address) throw new Error('No address');

        const serialNo = await mint(body.productId);
        if (body.address != addresses.owner) await transfer(body.productId, serialNo, body.address);

        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// One time func
export async function PUT() {
    try {
        const transaction = new TokenCreateTransaction()
            .setTokenName('Hedera Products')
            .setTokenSymbol('PRDCTS')
            .setTokenType(TokenType.NonFungibleUnique)
            .setTreasuryAccountId(accountId)
            .setSupplyKey(privateKey.publicKey)
            .setAdminKey(privateKey.publicKey)
            .setMetadataKey(privateKey.publicKey)
            .setDecimals(0)
            .setInitialSupply(0)
            .setMaxSupply(1000)
            .setSupplyType(TokenSupplyType.Finite)
            .setMaxTransactionFee(new Hbar(30))
            .freezeWith(client);

        const signTx = await (await transaction.sign(privateKey)).sign(privateKey);

        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);

        if (!receipt.tokenId) throw new Error('No token Id');

        return NextResponse.json({ tokenId: receipt.tokenId.toString() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const mint = async (productId: number): Promise<number> => {
    const CIDs = [
        Buffer.from(
            'https://rose-principal-turtle-588.mypinata.cloud/ipfs/QmSGmf1pUFwD1m9q2pwZrLKw1ToAqCjuh8RfMNQ7b3K35t'
        ),
        Buffer.from(
            'https://rose-principal-turtle-588.mypinata.cloud/ipfs/QmadtwcWu9XJrRvu6MbcRkixeKucjzXhF24X6h8L242dyj'
        ),
        Buffer.from(
            'https://rose-principal-turtle-588.mypinata.cloud/ipfs/QmbubD3uz2B7agdxZmfEM3RJNpDUgZvhjgM9CyADdBqi5K'
        ),
    ];

    const transaction = new TokenMintTransaction()
        .setTokenId(
            productId == 0
                ? contractIds.tokenIdGreen
                : productId == 1
                ? contractIds.tokenIdPurple
                : contractIds.tokenIdBlue
        )
        .setMetadata([productId == 0 ? CIDs[0] : productId == 1 ? CIDs[1] : CIDs[2]])
        .setMaxTransactionFee(new Hbar(2))
        .freezeWith(client);

    const signTx = await transaction.sign(privateKey);

    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    if (receipt.status != Status.Success) throw new Error('Mint error');

    return receipt.totalSupply.low;
};

const transfer = async (productId: number, serialNo: number, address: string) => {
    const tokenId =
        productId == 0
            ? contractIds.tokenIdGreen
            : productId == 1
            ? contractIds.tokenIdPurple
            : contractIds.tokenIdBlue;

    const tokenTransferTx = await new TransferTransaction()
        .addNftTransfer(tokenId, serialNo, accountId, AccountId.fromEvmAddress(0, 0, address))
        .freezeWith(client)
        .sign(privateKey);

    const tokenTransferSubmit = await tokenTransferTx.execute(client);
    const receipt = await tokenTransferSubmit.getReceipt(client);

    if (receipt.status != Status.Success) throw new Error('Transfer error');
};
