export type Mechanic = {
  name: string;
  protocolId: string;
  isDark: boolean;
};

export interface Mechanics {
  entry: Mechanic[];
  exit: Mechanic[];
}

export const MECHANICS: Record<string, Mechanics> = {
  'aave-bal-aura': {
    entry: [
      { name: 'Deposit USDC to AAVE v3', protocolId: 'aave3', isDark: false },
      {
        name: 'Borrow 80% of BAL and 20% of ETH pool amount, so HR on loan is 1.25',
        protocolId: 'balancer',
        isDark: true,
      },
      {
        name: 'Deposit ETH & BAL into B-80BAL-20WETH pool ',
        protocolId: 'balancer',
        isDark: true,
      },
      {
        name: 'Deposit B-80BAL-20WETH LP tokens into auraBAL-80-20 stablepool ',
        protocolId: 'balancer',
        isDark: true,
      },
      { name: 'Stake auraBAL-B-80BAL-20WETH LPs at Aura', protocolId: 'aura', isDark: false },
    ],
    exit: [
      { name: 'Unstake auraBAL-B-80BAL-20WETH LPs from Aura', protocolId: 'aura', isDark: false },
      {
        name: 'Withdraw B-80BAL-20WETH LP tokens from auraBAL-80BAL-20ETH stablepool ',
        protocolId: 'balancer',
        isDark: true,
      },
      {
        name: 'Withdraw ETH & BAL from B-80BAL-20WETH volatile pool',
        protocolId: 'balancer',
        isDark: true,
      },
      {
        name: 'Repay 80% of BAL and 20% of ETH pool amount, you may need to buy up ETH or BAL or rebalance amounts so you repay in full',
        protocolId: 'balancer',
        isDark: true,
      },
      { name: 'Withdraw USDC from AAVE v3', protocolId: 'aave3', isDark: false },
    ],
  },
  'sdai-leverage': {
    entry: [
      { name: 'Deposit DAI to MAKER DSR', protocolId: 'makerdao', isDark: false },
      { name: 'Deposit sDAI into Aave v3', protocolId: 'aave3', isDark: false },
      { name: 'Borrow USDC against sDAI at 76% LTV', protocolId: 'aave3', isDark: false },
      { name: 'Swap USDC to DAI via the MAKER PSM', protocolId: 'makerdao', isDark: false },
      { name: 'Deposit again resulting DAI to MAKER DSR', protocolId: 'makerdao', isDark: false },
      { name: 'Loop Step 1 to 6, 4 times', protocolId: 'makerdao', isDark: false },
      {
        name: 'Final LTV after last sDAI deposit should be ~68%',
        protocolId: 'makerdao',
        isDark: false,
      },
    ],
    exit: [
      { name: 'Take a USDC flashloan from Aave', protocolId: 'aave3', isDark: false },
      { name: 'Repay part of the debt', protocolId: 'aave3', isDark: false },
      { name: 'Withdraw part of the sDAI deposited on Aave', protocolId: 'aave3', isDark: false },
      {
        name: 'Redeem sDAI to receive DAI and transfer part of it to the user',
        protocolId: 'makerdao',
        isDark: false,
      },
      { name: 'Swap part of the DAI for USDC', protocolId: 'makerdao', isDark: false },
      {
        name: 'Repay the flashloan with the USDC previously obtained',
        protocolId: 'aave3',
        isDark: false,
      },
    ],
  },
  'sdai-gnosis': {
    entry: [
      {
        name: 'Bridge DAI from Ethereum to Gnosis via Gnosis bridge',
        protocolId: 'gnosis',
        isDark: false,
      },
      { name: 'Wrap xDAI to wxDAI', protocolId: 'gnosis', isDark: false },
      {
        name: 'Deposit wxDAI to the sDAI contract on Gnosis',
        protocolId: 'makerdao',
        isDark: false,
      },
    ],
    exit: [
      {
        name: 'Withdraw wxDAI from sDAI contract on Gnosis',
        protocolId: 'makerdao',
        isDark: false,
      },
      { name: 'Unwrap to xDAI', protocolId: 'gnosis', isDark: false },
      {
        name: 'Bridge from Gnosis to Ethereum and claim DAI',
        protocolId: 'gnosis',
        isDark: false,
      },
    ],
  },
};
