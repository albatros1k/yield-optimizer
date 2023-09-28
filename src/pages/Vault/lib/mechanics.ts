export interface Step {
  name: string;
  protocolId: string;
  isDark: boolean;
}

export const entrySteps: Step[] = [
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
];

export const exitSteps = [
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
];
