

import { BeefyFinance } from "blockchain-addressbook/build/types/beefyfinance";

export const TRUSTED_EOA = '0x2D64Bda435b82d0EF9691521F3d29885B4a2f7Ae';

const arbitrumAddresses: BeefyFinance & { 
    vaultRegistry: string,
    gasPrice: string
} = {
    devMultisig: TRUSTED_EOA,
    treasuryMultisig: TRUSTED_EOA,
    strategyOwner: '0x2cfC6c75f408135b5D4a6f933dB4b8DbB303aB27',
    vaultOwner: '0xF97E49d45c9880224684E8066A7e06F6D9799c0B',
    keeper: TRUSTED_EOA,
    treasurer: TRUSTED_EOA,
    launchpoolOwner: TRUSTED_EOA,
    rewardPool: '0x8F7C5825610EA38cEAF85dD0380965914E6E0B3b',
    treasury: '0x0366111caeE28C68d42eCe6E25627759C54155E2',
    beefyFeeRecipient: '0x1f2928d7Fc1674675fD8C0413F9Bc3e99162eAa9',
    multicall: '0x13ad51a6664973ebd0749a7c84939d973f247921',
    bifiMaxiStrategy: undefined,
    voter: TRUSTED_EOA,
    beefyFeeConfig: '0xbd163081A3a6d4Fd3BE9B10334F54482b474Fad2',
    vaultFactory: '0xd9309ee4F5217610DCB518687979e36e6362D273',
    vaultRegistry: '0x8a9ce4773CB346426C4BF0b74d8a9657eF69AD90',
    gasPrice: '0x87b2ba49d033372B335B5bAd57fC387577622C58'
}

const token = {
    name: 'VALK',
    symbol: 'VALK',
    decimals: 18,
    website: 'https://valk/',
    description: 'Lorem Ipsum',
    logoURI: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/images/single-assets/BIFI.png',
}

export const valkAddressBook = {
    arbitrum: {
      platforms: { 
          valk: arbitrumAddresses 
      },
      tokens: {
          VALK: {
              ...token,
              address: '0xa04107AB2143dd47f5373c117f43E8581648f317',
              chainId: 42161
          },
      },
  }
}