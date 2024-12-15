'use client';

import Image from 'next/image';
import CodePopUp from '@/components/CodePopUp';
import { Suspense, useState } from 'react';
import Evidence from '@/components/attestation/Evidence';
import { CopyButton } from '@lobehub/ui';

import { useAccount } from 'wagmi';
import useOrders from '@/hooks/useOrders';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useEffect } from 'react';

import Firebase from '@/services/Database';

import contractIds from '@/data/contract-ids';

import './attestation.css';

function Attestation() {
    const searchParams = useSearchParams();
    const { address } = useAccount();

    const firebase = useRef(new Firebase());

    const { getOrder, orders, updateOrderInList } = useOrders();
    const orderId = searchParams.get('id') as string;
    const [order, setOrder] = useState<Order>();

    const [code, setCode] = useState<string>();

    const statusToDisplay = useMemo(
        () => (order ? (order.status == 'completed' ? 'processing' : 'delivered') : 'processing'),
        [order?.status]
    );

    useEffect(() => {
        if (orders.length) setOrder(getOrder(orderId));
    }, [orders]);

    useEffect(() => {
        if (order && address && order.status != 'delivered') {
            if (order.attestation?.logistics?.id && order.attestation.receiver?.id) {
                order.status = 'delivered';
                updateOrderInList(order.orderId, { ...order, status: 'delivered' });
            }
            firebase.current.updateOrder(address, order);
        }
    }, [address, order]);

    return (
        <main className='attestation'>
            {code && <CodePopUp code={code} setCode={setCode} result width='80dvw' noText />}
            <h1>Package Signing (Attestation)</h1>
            <div className='order-data'>
                <div className='order-id'>
                    <h4>Order</h4>
                    <h2>#{orderId}</h2>
                </div>
                {order?.receipt && (
                    <div className='receipt'>
                        <h4>Lifecycle Report</h4>
                        <div
                            onClick={async () => {
                                const response = await fetch('/api/hedera/file-service', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        fileId: order.receipt,
                                    }),
                                });
                                const receipt = (await response.json()).data;
                                setCode(JSON.stringify(JSON.parse(receipt), null, 4));
                            }}
                        >
                            <Image
                                src={'/images/svg/marked-invert.svg'}
                                alt='marked'
                                height={20}
                                width={20}
                            />
                            <h3>Recorder on Hedera File Service</h3>
                        </div>
                    </div>
                )}
                <div className='topic'>
                    <h4>3PL Private Topic ID</h4>
                    <div>
                        <h5>{contractIds['3plTopic']}</h5>
                        <CopyButton content={contractIds['3plTopic']} />
                    </div>
                </div>
                <div className='topic'>
                    <h4>Recipient Private Topic ID</h4>
                    <div>
                        <h5>{contractIds.recipientTopic}</h5>
                        <CopyButton content={contractIds.recipientTopic} />
                    </div>
                </div>
                <div className='status'>
                    <h5 id={statusToDisplay}>
                        {order
                            ? statusToDisplay.charAt(0).toUpperCase() + statusToDisplay.slice(1)
                            : 'Loading'}
                    </h5>
                </div>
            </div>
            <section className='evidence'>
                <Evidence side='logistics' order={order} updateOrderInList={updateOrderInList} />
                <Evidence side='receiver' order={order} updateOrderInList={updateOrderInList} />
            </section>
        </main>
    );
}

export default function AttestationSuspended() {
    return (
        <Suspense>
            <Attestation />
        </Suspense>
    );
}
