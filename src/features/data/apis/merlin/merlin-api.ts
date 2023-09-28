import axios, { AxiosError } from 'axios';

import { IOverviewResponse } from './types/overview';
import { IPoolInfoResponse } from './types/poolInfo';
import { IPortfolio } from './types/portfolio';
import { ITokenBalance } from './types/tokenBalance';
import { CurrentRate } from './types/rate';
import { MarketPairPayload, PairsResponse } from './types/pair';
import { ITokenData } from './types/tokenData';
import {
  IHistoricalData,
  IPairDetailsResponse,
  IPoolProtocolPreview,
  IPoolsListResponse,
  ISupportedNetwork,
  ISupportedProtocol,
  ITrendingPool,
  TrendingPoolAttribute,
} from '../../entities/market';
import { store } from '../../../../store';
import { tokenKey } from '../../reducers/wallet/token';

export const merlinInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://v-wallet-graph.cf',
});

export class MerlinApi {
  static tokenHeaderKey = 'zkp';

  static getHeaderToken = (): string => {
    const headerToken = store.getState().user.token[tokenKey];
    return headerToken;
  };

  static async getHeader() {
    const result = await merlinInstance.get<string>(`/api/merlin/${this.tokenHeaderKey}`);
    return result.headers[this.tokenHeaderKey];
  }

  static async getOverviews(address: string) {
    const result = await merlinInstance.get<IOverviewResponse>(
      `/api/merlin/getUserTokenOverviewsGraphQLData/${address}`
    );
    return result.data;
  }

  static async getPoolInfos(address: string) {
    const result = await merlinInstance.get<IPoolInfoResponse>(
      `/api/merlin/getUserActivePositions/${address}`
    );
    return result.data;
  }

  static async getPortfolio(address: string) {
    const result = await merlinInstance.get<IPortfolio[]>(
      `/api/merlin/userDeFiPositions/${address}`,
      { headers: { [this.tokenHeaderKey]: this.getHeaderToken() } }
    );
    return result.data;
  }

  static async getTokenBalances(address: string) {
    const result = await merlinInstance.get<Record<string, ITokenBalance[]>>(
      `/api/merlin/getTokenBalancesAll/${address}`,
      { headers: { [this.tokenHeaderKey]: this.getHeaderToken() } }
    );
    return result.data;
  }

  static async getTokensData(list: string[]) {
    const result = await merlinInstance.post<ITokenData[]>(`/api/merlin/tokensData`, list);
    return result.data;
  }

  static async getCurrentRatesAndChanges24h(list: string[]) {
    const result = await merlinInstance.post<Record<string, CurrentRate>>(
      `/api/merlin/getCurrentRatesAndChanges24h`,
      list
    );
    return result.data;
  }

  static async getPnlByProtocolAndAddress(protocol: string, address: string | null = null) {
    const result = await merlinInstance.get<IPoolInfoResponse>(
      `/api/merlin/trading/deFiPositions/protocol/${protocol}`,
      {
        params: {
          address,
        },
      }
    );
    return result.data;
  }

  static async getPairs(networks: string, protocols: string) {
    const result = await merlinInstance.get<PairsResponse>(
      `/api/merlin/pool-analysis-v2/pools/data/daily/list`,
      {
        params: {
          protocols,
          networks,
        },
      }
    );
    return result.data;
  }

  static async getMarketPair(chain: string, protocol: string, pair: [string, string]) {
    const pairString = pair.join('-');
    const result = await merlinInstance.get<MarketPairPayload>(
      `/api/merlin/pool-analysis-v2/pools/data/daily/list/${pairString}`
    );

    const filtered = result.data.data.find(({ protocol: prot, network }) => {
      return (
        protocol.toLowerCase() === prot.toLowerCase() &&
        network.toLowerCase() === chain.toLowerCase()
      );
    });

    return filtered;
  }

  static async getPairDetails(
    pair: string,
    tvl: string | null = null,
    signal: AbortSignal | undefined = undefined
  ) {
    const result = await merlinInstance
      .get<IPairDetailsResponse | string>(
        `api/merlin/pool-analysis-v2/pools/data/daily/list/${pair}`,
        {
          params: {
            tvl,
          },
          signal,
        }
      )
      .then(r => r.data)
      .catch((e: AxiosError) => e.message);

    return result;
  }

  static async getTrendingPools(
    attribute?: TrendingPoolAttribute,
    tvl: string | undefined = undefined
  ) {
    const result = await merlinInstance
      .get<ITrendingPool[] | string>(
        `api/merlin/pool-analysis-v2/pools/data/daily/trending/apy${
          attribute ? `/${attribute}` : ''
        }`,
        {
          params: tvl && +tvl ? { tvl } : null,
        }
      )
      .then(r => r.data)
      .catch((e: AxiosError) => e.message);

    return result;
  }

  static async getPools(search: object) {
    const result = await merlinInstance
      .get<IPoolsListResponse | string>('api/merlin/pool-analysis-v2/pools/data/daily/list', {
        params: { ...search },
      })
      .then(r => r.data)
      .catch((e: AxiosError) => e.message);

    return result;
  }

  static async getSupportedChains() {
    const result = await merlinInstance
      .get<ISupportedNetwork[]>('api/merlin/pool-analysis-v2/pools/info/networks')
      .then(r => r.data)
      .catch((e: AxiosError) => {
        console.log(e.message);
        return [] as ISupportedNetwork[];
      });

    return result;
  }

  static async getSupportedPoolProtocols() {
    const result = await merlinInstance
      .get<ISupportedProtocol[]>('api/merlin/pool-analysis-v2/pools/info/protocols')
      .then(r => r.data)
      .catch((e: AxiosError) => {
        console.log(e.message);
        return [] as ISupportedProtocol[];
      });

    return result;
  }

  static async getHistoricalData(
    pair: string,
    poolId: string,
    start: string,
    end: string,
    tvl: string | null = null,
    signal?: AbortSignal | undefined
  ) {
    const result = await merlinInstance
      .get<IHistoricalData[] | IHistoricalData | string>(
        `api/merlin/pool-analysis-v2/pools/data/historical/${pair}${poolId && `/${poolId}`}`,
        {
          params: {
            start,
            end,
            tvl,
          },
          signal,
        }
      )
      .then(r => r.data)
      .catch((e: AxiosError) => e.message);

    return result;
  }

  static async getPairProtocolDetails(pair: string, poolId: string) {
    const result = await merlinInstance
      .get<IPoolProtocolPreview | string>(
        `api/merlin/pool-analysis-v2/pools/data/daily/list/${pair}/${poolId}`
      )
      .then(r => r.data)
      .catch((e: AxiosError) => e.message);

    return result;
  }
}
