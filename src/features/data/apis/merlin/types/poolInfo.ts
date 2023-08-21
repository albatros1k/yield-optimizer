export type PositionType = 'SUPPLY' | 'BORROW';

export interface ISafetyDebt {
  borrowPower: number;
  liquidationPrice: number;
  ltv: number;
  ratio: number;
}

export interface ILPToken {
  address: string;
  symbol: string;
  value: number;
  valueUSD: number;
  decimals: number;
  entryPrice: number;
  usdRate: number;
  _claimTxs?: any[];
}

export interface ISupplyBorrowReward extends ILPToken {
  proxy: string | null;
  protocolTokenAddress: string;
  valuesByLPToken: ILPToken[];
  unlockTime: number | null;
  bundleWallet: string | null;
  poolId: string | null;
  yieldUSD: number;
  pnlUSD: number;
}

export interface IPoolInfo {
  borrowed: ISupplyBorrowReward[];
  borrowedUSDTotal: number;
  liquidationPrice: number;
  network: string;
  positions: string[];
  protocol: string;
  protocolId: string;
  ratio: number | null;
  reward: ISupplyBorrowReward[];
  supplied: ISupplyBorrowReward[];
  suppliedUSDTotal: number;
  chain: string;
  uniswapPooldata?: IUniswapData[];
  logo?: string;
  safetyDebtData: ISafetyDebt | null;
}

export interface ITokenPair {
  token0: number;
  token1: number;
  token0USD: number;
  token1USD: number;
  totalUSD: number;
}

export interface ITokenData {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
}

export interface IUniswapData {
  position: string;
  token0USDPrice: number;
  token1USDPrice: number;
  token0: ITokenData;
  token1: ITokenData;
  unclaimedFees: ITokenPair;
  claimedFees: ITokenPair;
  liquidity: ITokenPair;
  impermanentLoss: ITokenPair;
  maxPrice: number;
  minPrice: number;
  feeTier: number;
  inRange: boolean;
  chain: string | null;
}

export interface IEntryPrice {
  address: string;
  amount: number;
  currentPrice: number;
  entryPrice: number;
  symbol: string;
  protocol: string | null;
  protocolId: string | null;
  underlyingAddresses: string[];
}

export interface IActivePosition {
  deFiEventId: string;
  pnlUsd: number;
  positionId: number | string | null;
  positionYield: number | null;
  protocol: string;
  protocolId: string | null;
  underlyingAddress: string;
  yieldUSD: number;
  yields: Record<string, number> | null;
  proxy: string | null;
  type: PositionType;
  bundleWallet: string | null;
}

export interface IPoolInfoResponse {
  activePositionYieldAndPnl: IActivePosition[];
  averageEntryPrice: IEntryPrice[];
  lpAverageEntryPrice: IEntryPrice[];
  poolInfo: IPoolInfo[];
  protocolAverageEntryPrice: Record<string, { entryPrice: number; initialAmount: number }>;
}
