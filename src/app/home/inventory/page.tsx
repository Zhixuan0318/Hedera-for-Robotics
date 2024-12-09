'use client';

import Image from 'next/image';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useProducts from '@/hooks/useProducts';
import { useAccount } from 'wagmi';

import Database from '@/services/Database';

import './inventory.css';

export default function Inventory() {
    const { products } = useProducts();

    const [onChain, setOnChain] = useState<number[]>([]);
    const [onHold, setOnHold] = useState<number[]>([]);

    const database = useRef(new Database());

    const { address } = useAccount();
    const addresses = useRef([
        '0x6F01939f87C681b4FC0a36127Ae0Bd7B4b5B9F40',
        '0xD9ba52fC3366Dded194c3c77c9c9955E8FE6059a',
    ]);

    const handleUpdate = useCallback(async () => {
        const stocks = [];
        for (let i = 0; i < products.length; i++) {
            const response = await fetch('/api/hedera/token/amount', {
                method: 'POST',
                body: JSON.stringify({ productId: i }),
            });
            const stock = await response.json();
            stocks.push(Number(stock.supply));
        }

        const response = await database.current.getAllOffChainStocks();
        const hold = response.map((item) => item.onHold);

        setOnChain(stocks);
        setOnHold(hold);
    }, [onChain, onHold]);

    const [upd, setUpd] = useState(false);
    useEffect(() => {
        handleUpdate();
        setTimeout(() => setUpd(!upd), 3000);
    }, [upd]);

    return (
        <section className='inventory'>
            {address ? (
                addresses.current.includes(address.toString()) ? (
                    products.map((product, index) => (
                        <div className='item' key={index}>
                            <div>
                                <Image src={product.image} alt='product' width={54} height={53} />
                                <h4>{product.name}</h4>
                            </div>
                            <h5>On-Chain Stock Level</h5>
                            <h2>{onChain.length ? onChain[product.id] : 0}</h2>
                            <h5>Off-Chain Stock Level</h5>
                            <h2>{product.stock}</h2>
                            <h5>Current On-Hold</h5>
                            <h2>{onHold.length ? onHold[index] : 0}</h2>
                        </div>
                    ))
                ) : (
                    <div className='denied'>
                        <Image src='/images/sad-smile.png' alt='denied' width={200} height={200} />
                        <h5>
                            Sorry! You have no access to the inventory replenishment section. This
                            option is only available for the owner of this web application for
                            demonstration purpose. Do contact us to help you out!
                        </h5>
                    </div>
                )
            ) : (
                <></>
            )}
        </section>
    );
}
