import { Wallet } from 'ethers';
import { hexlify } from 'ethers';
import {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    PrivateKey,
    PrngTransaction,
    Status,
} from '@hashgraph/sdk';

import contractIds from '@/data/contract-ids';

import { owner } from '@/utils/owner';

import { readContract } from 'wagmi/actions';
import wagmiConfig from '@/config/wagmi';
import ShopABI from '@/contracts/ShopABI.json';
import addresses from '@/data/addresses';

const client = Client.forTestnet();
export const privateKey = PrivateKey.fromStringECDSA(owner.privateKey);
client.setOperator('0.0.5159889', privateKey);

export default class Contracts {
    static async processOrder(orderId: string): Promise<string> {
        const transaction = new ContractExecuteTransaction()
            .setGas(300_000)
            .setContractId(contractIds.warehouse)
            .setFunction('processOrder', new ContractFunctionParameters().addString(orderId));

        const response = await transaction.execute(client);
        const record = await response.getRecord(client);

        if (record.receipt.status != Status.Success) throw new Error('Tx error');

        return hexlify(record.transactionHash);
    }

    static async generateRandomRobotId(): Promise<[string, number]> {
        const transaction = await new PrngTransaction().setRange(20).execute(client);

        const transactionRecord = await transaction.getRecord(client);

        if (transactionRecord.receipt.status != Status.Success) return ['empty', 0];

        return [hexlify(transactionRecord.transactionHash), transactionRecord.prngNumber ?? 0];
    }

    static async pickOrder(orderId: string): Promise<string> {
        return await this.manageOrder('pickOrder', contractIds.picker, orderId);
    }

    static async packOrder(orderId: string): Promise<string> {
        return await this.manageOrder('packOrder', contractIds.packer, orderId);
    }

    static async deliverOrder(orderId: string): Promise<string> {
        const orderData: any = await readContract(wagmiConfig, {
            abi: ShopABI,
            address: addresses.shop,
            functionName: 'orders',
            args: [orderId],
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/hedera/token`, {
            method: 'POST',
            body: JSON.stringify({ productId: orderData[3], address: orderData[2] }),
        });
        if (response.status != 200) throw new Error('Mint Error');

        return await this.manageOrder('deliverOrder', contractIds.deliverer, orderId);
    }

    private static async manageOrder(
        func: string,
        contractId: string,
        orderId: string
    ): Promise<string> {
        const wallet = Wallet.createRandom();
        const verifierKey = PrivateKey.fromStringECDSA(wallet.privateKey);

        let transaction = new ContractExecuteTransaction()
            .setGas(300_000)
            .setContractId(contractId)
            .setFunction(
                func,
                new ContractFunctionParameters().addString(orderId).addAddress(wallet.address)
            );

        transaction = transaction.freezeWith(client);

        const ownerSignature = privateKey.signTransaction(transaction);
        const verifierSignature = verifierKey.signTransaction(transaction);

        const signedTransaction = transaction
            .addSignature(privateKey.publicKey, ownerSignature)
            .addSignature(verifierKey.publicKey, verifierSignature);

        const response = await signedTransaction.execute(client);
        const record = await response.getRecord(client);

        if (record.receipt.status != Status.Success) throw new Error('Tx error');

        return hexlify(record.transactionHash);
    }
}
