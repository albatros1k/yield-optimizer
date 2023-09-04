import axios, { AxiosError } from 'axios';

import { IOverviewResponse } from './types/overview';
import { IPoolInfoResponse } from './types/poolInfo';
import { IPortfolio } from './types/portfolio';
import { ITokenBalance } from './types/tokenBalance';
import { CurrentRate } from './types/rate';
import { MarketPairPayload, PairsResponse } from './types/pair';
import { ITokenData } from './types/tokenData';
import { ITrendingPool, TrendingPoolAttribute } from '../../entities/market';

export const merlinInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://v-wallet-graph.cf',
});

export class MerlinApi {
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
      `/api/merlin/userDeFiPositions/${address}`
    );
    return result.data;
  }

  static async getTokenBalances(address: string) {
    const result = await merlinInstance.get<Record<string, ITokenBalance[]>>(
      `/api/merlin/getTokenBalancesAll/${address}`
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
}
