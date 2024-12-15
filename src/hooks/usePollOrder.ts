import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppKitAccount } from '@reown/appkit/react';
import useOrders from './useOrders';

import Firebase from '@/services/Database';

import { wrapReceipt } from '@/utils/file-service';

const usePollOrder = (customer: string | undefined, orderId: string) => {
    const router = useRouter();
    const { address } = useAppKitAccount();

    const firebase = useRef(new Firebase());

    const { updateOrderInList } = useOrders();
    const [order, setOrder] = useState<Order | undefined>();
    const [simulationStatus, setSimulationStatus] = useState<SimulatorStatus>('processing');

    const [poll, setPoll] = useState(false);

    const handlePollOrder = useCallback(
        async (poll: boolean) => {
            if (!customer) return;

            const order = await firebase.current.getOrder(customer, orderId);
            if (!order) router.push('/home/store');

            setOrder(order);

            if (order.status != 'completed' && order.status != 'delivered')
                setTimeout(() => setPoll(!poll), 1_000);
        },
        [customer]
    );

    useEffect(() => {
        handlePollOrder(poll);
    }, [customer, poll]);

    const handleOrderCompletion = useCallback(async () => {
        if (!order || !address || order.status != 'processing') return;

        if (order.hashes.length == 8 && order.hashes[7] != 'empty') {
            const copy = { ...order };

            const receipt = await wrapReceipt(order);
            const response = await fetch('/api/hedera/file-service', {
                method: 'PUT',
                body: JSON.stringify({
                    content: receipt,
                }),
            });
            copy.receipt = (await response.json()).receipt;

            copy.status = 'completed';

            await firebase.current.completeOrder(address, copy.orderId, copy);

            updateOrderInList(copy.orderId, copy);
            setOrder(copy);
        }
    }, [order, address]);

    useEffect(() => {
        handleOrderCompletion();
    }, [order?.hashes[7]]);

    useEffect(() => {
        if (!order) return;
        const length = order.hashes.length;

        if (order.status == 'completed' || order.status == 'delivered')
            setSimulationStatus('completed');
        else
            setSimulationStatus(
                length == 4
                    ? 'picking'
                    : length == 6
                    ? 'packing'
                    : length == 8
                    ? 'delivery'
                    : 'processing'
            );
    }, [order]);

    return { order, simulationStatus };
};

export default usePollOrder;
