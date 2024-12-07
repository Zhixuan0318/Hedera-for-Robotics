import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { hederaTestnet } from 'viem/chains';

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.27',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: 'hederaTestnet',
    networks: {
        hederaTestnet: {
            chainId: hederaTestnet.id,
            url: 'https://testnet.hashio.io/api',
            accounts: [''],
        },
    },
};

export default config;
