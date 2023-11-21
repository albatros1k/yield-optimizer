import type { VaultEntity } from '../../entities/vault';
import type { TokenEntity } from '../../entities/token';
import { UserRanking } from '../../entities/ranking';

export type ApiTimeBucket = '1h_1d' | '1h_1w' | '1d_1M' | '1d_1Y';

export type ApiStat = 'prices' | 'apys' | 'tvls';

export type ApiRange = {
  min: number;
  max: number;
};

export type ApiRanges = {
  [key in ApiStat]: ApiRange;
};

export type ApiPoint = {
  t: number;
  v: number;
};

export type ApiChartData = ApiPoint[];

export interface IBeefyDataApi {
  getAvailableRanges(
    vaultId: VaultEntity['id'],
    oracleId: TokenEntity['oracleId']
  ): Promise<ApiRanges>;

  getTvlChartData(vaultId: VaultEntity['id'], bucket: ApiTimeBucket): Promise<ApiChartData>;

  getApyChartData(vaultId: VaultEntity['id'], bucket: ApiTimeBucket): Promise<ApiChartData>;

  getPriceChartData(
    oracleId: TokenEntity['oracleId'],
    bucket: ApiTimeBucket
  ): Promise<ApiChartData>;
}

export interface GalaxyRankingResponse {
  list: UserRanking[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  totalCount: number;
}

export interface GalaxyPointsResponse {
  id: string;
  points: number;
  rank: number;
  address: {
    id: string;
    twitterUserName: string;
    address: string;
    solanaAddress: string;
    seiAddress: string;
  };
}
