import { provider } from './owner';

import addresses from '@/data/addresses';

const getVerifier = async (hash: string): Promise<string> => {
    const tx = await provider.getTransactionReceipt(hash);

    if (!tx || !tx.logs.length) return addresses.owner;

    return `0x${tx.logs[2].topics[1].slice(26)}`;
};

export async function wrapReceipt(order: Order): Promise<string> {
    const response = await fetch('/api/hedera/token/amount', {
        method: 'POST',
        body: JSON.stringify({ productId: order.productId }),
    });
    const stock = await response.json();

    const receiptData = {
        orderId: order.orderId,
        dispatcher: addresses.owner,
        detailLog: {
            warehouseProcessing: order.hashes[0],
            warehouseProcessed: order.hashes[1],
            productPicking: order.hashes[2],
            productPicked: order.hashes[3],
            productPacking: order.hashes[4],
            productPacked: order.hashes[5],
            orderDelivering: order.hashes[6],
            orderDelivered: order.hashes[7],
        },
        approval: {
            pickingTask: await getVerifier(order.hashes[3].slice(0, 66)),
            packingTask: await getVerifier(order.hashes[5].slice(0, 66)),
            deliveryTask: await getVerifier(order.hashes[7].slice(0, 66)),
        },
        onChainStock: Number(stock.supply),
        timestamp: Date.now(),
    };

    return JSON.stringify(receiptData);
}
