import { JsonRpcProvider, SigningKey, Signature } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers';

import { hederaTestnet } from 'viem/chains';

export const provider = new JsonRpcProvider(process.env.PROVIDER, hederaTestnet.id);
export const owner = new SigningKey(process.env.OWNER_PK as string);

export function signMessage(message: string): Signature {
    const hashedMesage = keccak256(toUtf8Bytes(message));
    return owner.sign(hashedMesage);
}
