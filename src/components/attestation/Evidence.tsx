'use client';

import Image from 'next/image';
import CodePopUp from '../CodePopUp';
import { CopyButton } from '@lobehub/ui';
import Link from 'next/link';
import { ConfettiButton } from '../ui/confetti';

import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useToast } from '@/hooks/use-toast';

import contractIds from '@/data/contract-ids';

interface Props {
    order: Order | undefined;
    side: 'logistics' | 'receiver';
    updateOrderInList: (orderId: string, updated: Order) => void;
}

export default function Evidence({ order, side, updateOrderInList }: Props) {
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();

    const { address } = useAccount();

    const isReceiver = useRef(side == 'receiver');

    const [schema, setSchema] = useState<string>();
    const [result, setResult] = useState(false);

    const confettiRef = useRef<any>(null);
    useEffect(() => {
        if (order?.status != 'delivered' && order?.attestation?.[side]?.id && confettiRef.current)
            confettiRef.current.children[0].click();
    }, [order?.attestation?.[side]?.id]);

    return (
        <div className={side}>
            <h2>{isReceiver.current ? 'Package Recipient' : 'Third Party Logistic (3PL)'}</h2>
            <div className='schema'>
                <h5>Schema Format:</h5>
                <h5
                    onClick={async () => {
                        setResult(false);
                        setSchema(
                            JSON.stringify(
                                isReceiver.current
                                    ? {
                                          Message: {
                                              LifecycleReportFileID: '',
                                              PhotoEvidenceFileID: '',
                                              '3PLWalletAddress': '',
                                              '3PLNullifierHash': '',
                                          },
                                      }
                                    : {
                                          Message: {
                                              LifecycleReportFileID: '',
                                              PhotoFileID: '',
                                              RecipientWalletAddress: '',
                                              RecipientNullifierHash: '',
                                          },
                                      },
                                null,
                                1
                            )
                        );
                    }}
                >
                    Click to view
                </h5>
                {schema && <CodePopUp code={schema} setCode={setSchema} result={result} />}
            </div>
            <div className='upload-image'>
                <label htmlFor={side} className='file-upload'>
                    <h4>
                        Upload Photographic Evidence <br /> (less than 1mb)
                    </h4>
                    <input
                        id={side}
                        name={side}
                        type='file'
                        accept='image/*'
                        onChange={async (event) => {
                            const copy = { ...order };

                            if (
                                !event.target.files ||
                                !copy ||
                                copy.attestation?.[side]?.cid != undefined
                            ) {
                                event.target.files = null;
                                return;
                            }

                            if (isReceiver.current && !copy.attestation?.logistics?.id) {
                                event.target.files = null;
                                return;
                            }

                            console.log();

                            if (event.target.files[0].size / 1024 > 6) {
                                toast({
                                    title: 'Uh oh! Something went wrong.',
                                    description: 'The uploaded image size should be less than 6kB',
                                });
                                return;
                            }

                            setUploading(true);

                            const file = event.target.files[0];
                            event.target.files = null;

                            const formData = new FormData();
                            formData.append('blob', file);
                            const response = await fetch('/api/hedera/file-service/evidence', {
                                method: 'POST',
                                body: formData,
                            });

                            const json = await response.json();

                            if (response.status != 200) alert(json.error);
                            else {
                                copy.attestation = {
                                    ...copy.attestation,
                                    [side]: {
                                        id: '',
                                        cid: json.cid,
                                    },
                                };
                                updateOrderInList(copy.orderId as string, copy as Order);
                            }

                            setUploading(false);
                        }}
                    />
                    <Image
                        src={'/images/svg/upload-image.svg'}
                        alt='upload-image'
                        height={49}
                        width={49}
                    />
                </label>
                {uploading && (
                    <h4>
                        <div id='spinner'></div>Uploading to Hedera File Service
                    </h4>
                )}
                {order?.attestation?.[side] ? (
                    <div className='cid'>
                        <h4>File ID:</h4>{' '}
                        <h4
                            onClick={async () => {
                                const response = await fetch('/api/hedera/file-service/evidence', {
                                    method: 'PUT',
                                    body: JSON.stringify({
                                        fileId: order?.attestation?.[side]?.cid,
                                    }),
                                });
                                const json = await response.json();
                                const dataUrl = Buffer.from(json.data).toString('base64');

                                window.open()?.document.write(
                                    `<iframe src="data:image/png;base64,${dataUrl}" 
										frameborder = "0" style = "border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen >
										</iframe>`
                                );
                            }}
                        >
                            {order?.attestation?.[side].cid}
                        </h4>
                        <CopyButton content={order.attestation?.[side]?.cid ?? ''} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div ref={confettiRef} id={side} className='absolute confetti-container'>
                <ConfettiButton className='confetti-btn'></ConfettiButton>
            </div>
            {order?.attestation?.[side]?.id ? (
                <div className='success'>
                    <Image src={'/images/svg/marked.svg'} alt='sign' height={41} width={41} />
                    <h4
                        onClick={async () => {
                            setResult(true);

                            const response = await fetch('/api/hedera/consensus', {
                                method: 'POST',
                                body: JSON.stringify({
                                    topicId: order?.attestation?.[side]?.id,
                                    txId: order?.attestation?.[side]?.hash,
                                }),
                            });

                            setSchema(JSON.stringify((await response.json()).data, null, 4));
                        }}
                    >
                        Broadcast Successfully!
                    </h4>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_EXPLORER}/transaction/${order?.attestation?.[side]?.hash}`}
                        target='_blank'
                    >
                        View on HashScan
                    </Link>
                </div>
            ) : (
                <button
                    id={`black-button${!order?.attestation?.[side]?.cid ? '-disabled' : ''}`}
                    onClick={async () => {
                        if (!order) return;
                        const copy = { ...order };
                        if (!copy.attestation || !address) return;

                        if (isReceiver.current) {
                            if (!copy.attestation.receiver?.cid) return;

                            const response = await fetch('/api/hedera/consensus', {
                                method: 'PUT',
                                body: JSON.stringify({
                                    topicId: contractIds.recipientTopic,
                                    message: JSON.stringify({
                                        LifecycleReportFileID: copy.receipt,
                                        PhotoEvidenceFileID: (copy.attestation as any)[side].cid,
                                        '3PLWalletAddress': address,
                                        '3PLNullifierHash': copy.nullifierHash,
                                    }),
                                }),
                            });

                            const txHash = (await response.json()).transactionId;

                            copy.attestation.receiver.id = (copy.attestation.logistics as any).id;
                            copy.attestation.receiver.hash = txHash ?? '';
                        } else {
                            if (!copy.attestation.logistics?.cid) return;
                            const topicId = contractIds['3plTopic'];

                            const response = await fetch('/api/hedera/consensus', {
                                method: 'PUT',
                                body: JSON.stringify({
                                    topicId: topicId,
                                    message: JSON.stringify({
                                        LifecycleReportFileID: copy.receipt,
                                        PhotoEvidenceFileID: (copy.attestation as any)[side].cid,
                                        RecipientWalletAddress: address,
                                        RecipientNullifierHash: copy.nullifierHash,
                                    }),
                                }),
                            });

                            const txHash = (await response.json()).transactionId;

                            copy.attestation.logistics.id = topicId;
                            copy.attestation.logistics.hash = txHash ?? '';
                        }

                        updateOrderInList(copy.orderId, copy);
                    }}
                >
                    Broadcast your attestation{' '}
                    <Image
                        src={'/images/svg/partners/hedera.svg'}
                        alt='hedera'
                        height={41}
                        width={41}
                    />
                </button>
            )}

            <div className='info'>
                <Image src={'/images/svg/info.svg'} alt='info' height={32} width={32} />
                {isReceiver.current
                    ? 'You can only make an attestation after our third party logistic completed the attestation'
                    : 'Upload photo evidence as proof of delivery before proceeding'}
            </div>
        </div>
    );
}
