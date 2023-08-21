export type amountType = number | null;

export type nameType = string | null;

interface IFee {
  fee: amountType;
  feeUSD: amountType;
}

interface IPositionBalance {
  balance: number;
}

interface IYield extends IPositionBalance {
  balanceUSD: number;
  tokenSymbol: string | null;
  tokenDecimals: number;
}

export interface IBalance extends IYield {
  tokenAddress: string;
  tokenLogo: nameType;
  tokenName: string;
}

interface IPosition {
  fees: IFee[];
  isActive: boolean | null;
  pnlUSD: amountType;
  position: IPositionBalance;
  positionYield: IYield | null;
  yieldUSD: amountType;
  yields: IYield[];
}

export interface IDeFiEvent {
  balances: IBalance[];
  eventType: string;
  id: string;
  position: IPosition;
  protocol: string;
  timestamp: number;
  chain: string | null;
}
export interface IUserTokenProtocolOverview {
  deFiEvents: IDeFiEvent[];
  holdingsLockedInProtocol: amountType;
  protocolId: string | null;
  pnlUSD: number;
  protocol: string;
  txCount: number;
  txFeeUSD: number;
  yieldUSD: number;
}

export interface ITokenOverview {
  id: string;
  tokenAddress: string;
  currentPrice: amountType;
  priceChange24h: amountType;
  txCount: number;
  underlyingTokens: string[];
  userTokenProtocolOverviews: IUserTokenProtocolOverview[];
  user: null | string;
  bundleWallet: string | null;
  chain: string | null;
}

export interface IOverviewResponse {
  userTokenOverviews: ITokenOverview[];
}
