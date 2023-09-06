export interface ITrendingPool {
  tokenIds: string[];
  name: string;
  protocol: string;
  network: string;
  apy: number;
  apyFarm: number;
  apyBase: number;
  tvl: number;
  poolId: string;
  rewards: number;
}

export interface IPoolPreview {
  apy: number;
  apyBase: number;
  apyFarm: number;
  apyMean30: number;
  impLoss7: number | null;
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
}

export interface IPoolsListResponse {
  data: IPoolPreview[];
  first: boolean;
  last: boolean;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IPoolProtocolPreview {
  poolId: string;
  tokenIds: string[];
  protocol: string;
  protocolDisplay: string;
  network: string;
  apy: number;
  apyBase: number;
  apyFarm: number;
  apyMean30: number;
  rewards: number;
  rewardsIncrease24H: number;
  tvl: number;
  tvlIncrease24H: number;
}

export interface IAvgMetrics {
  apy: number;
  apyBase: number;
  apyFarm: number;
  apyMean30: number;
}

export interface IPairDetailsResponse {
  data: IPoolProtocolPreview[];
  avgMetrics: IAvgMetrics;
}

export interface IDailyPerformance {
  timestamp: number;
  positionValue: number;
  poolPrice: number;
}

export interface IHistoricalDataItem {
  apy: string;
  apyBase: string;
  apyFarm: string;
  apyMean30: string;
  rewards: string;
  timestamp: number;
  tvl: string;
  volume: string;
  poolPrice: number;
  tokenIds: string[];
}
export interface IHistoricalData {
  data: IHistoricalDataItem[];
  network: string;
  protocol: string;
  protocolDisplay: string;
  poolId: string;
}

//important!!! keys from - IPoolPreview
export type kpiKey = 'rewards' | 'tvl' | 'apy' | 'apyBase' | 'apyFarm' | 'apyMean30';

export type chartKpiKey = Exclude<keyof IHistoricalDataItem, 'timestamp'>;

export type trendType = 'ETH Pools' | 'Stable Pools' | 'All';

export interface ISupportedProtocol {
  protocol: string;
  protocolSlug: string;
}

export interface ISupportedNetwork {
  network: string;
  networkSlug: string;
}

export type TrendingPoolAttribute = 'ethpools' | 'stablepools' | '';
