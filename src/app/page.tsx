'use client';

import Image from 'next/image';
import { RainbowButton } from '@/components/ui/rainbow-button';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

import './connection.css';

export default function Connection() {
    const router = useRouter();

    const { open } = useAppKit();
    const { isConnected } = useAppKitAccount();

    useEffect(() => {
        if (isConnected) router.push('/home/store');
    }, [isConnected]);

    return (
        <main className='connection'>
            <div className='logos'>
                <Image src={'/images/svg/logo.svg'} alt='logo' width={73} height={60} />
                <Image src={'/images/svg/partners/hedera.svg'} alt='logo' width={60} height={60} />
            </div>
            <h5>Hedera for Robotics</h5>
            <h1>The Ecommerce Warehouse Run By Robots. </h1>
            <div id='base'>
                <Image src={'/images/svg/partners/hedera.svg'} alt='trait' width={26} height={26} />
                <h2>Deployed on Hedera Testnet</h2>
            </div>
            <div className='traits'>
                <h3>This showcase is powered by</h3>
                <div>
                    <Image
                        src={'/images/svg/partners/hedera.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>Smart Contract Service</h3>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/hedera.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>Consensus Service</h3>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/hedera.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>File Service</h3>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/hedera.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>Token Service</h3>
                </div>
                <div>
                    <Image src={'/images/simulator.png'} alt='trait' width={26} height={26} />
                    <h3>Webost Simulator</h3>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/worldcoin.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>Worldcoin</h3>
                </div>
                <div>
                    <Image
                        src={'/images/svg/partners/hashscan.svg'}
                        alt='trait'
                        width={26}
                        height={26}
                    />
                    <h3>Hash Scan</h3>
                </div>
            </div>
            <RainbowButton className='rnb-button' onClick={() => open()}>
                <Image
                    src={'/images/svg/partners/walletconnect.svg'}
                    alt='wallet'
                    width={36}
                    height={36}
                />
                <h3>Connect with WalletConnect</h3>
            </RainbowButton>
        </main>
    );
}
