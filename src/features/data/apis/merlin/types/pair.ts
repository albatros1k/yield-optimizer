export interface Pair {
  apy: number;
  apyBase: number;
  apyFarm: number;
  impLoss7: number;
  name: string;
  networks: string[];
  protocols: string[];
  rewards: number;
  rewardsBase: number;
  rewardsFarm: number;
  rewardsIncrease24H: number;
  roi7: number;
  tokenIds: string[];
  tvl: number;
  tvlIncrease24H: number;
  volume: number;
  volumeIncrease24H: number;
  yield7: number;
}

export interface PairsResponse {
  data: Pair[];
  first: boolean;
  last: boolean;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface MarketPair {
  apy: number;
  apyBase: number;
  apyFarm: number;
  apyMean30: number;
  impLoss7: number;
  network: string;
  poolId: string;
  protocol: string;
  protocolDisplay: string;
  rewards: number;
  rewardsBase: number;
  rewardsFarm: number;
  rewardsIncrease24H: number;
  roi7: number;
  tokenIds: string[];
  tvl: number;
  tvlIncrease24H: number;
  volume: number;
  volumeIncrease24H: number;
  yield7: number;
}

export interface AvgMetrics {
  apy: number;
  apyBase: number;
  apyFarm: number;
  apyMean30: number;
}

export interface MarketPairPayload {
  avgMetrics: AvgMetrics;
  data: MarketPair[];
}
