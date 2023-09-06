import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { MerlinApi } from '../apis/merlin/merlin-api';
import { ITrendingPool, TrendingPoolAttribute, trendType } from '../entities/market';

const errorMessage: string = 'Failed to load trending pools';

interface Params {
  tvl: string | undefined;
}

export const getTrendingPools = createAsyncThunk(
  'market/getTrendingPools',
  async ({ tvl }: Params, thunkAPI) => {
    try {
      const trendingAttributes: TrendingPoolAttribute[] = ['ethpools', 'stablepools', ''];

      const response = await Promise.all(
        trendingAttributes.map(attr => MerlinApi.getTrendingPools(attr, tvl))
      ).then(result => {
        const [ethPools, stablePools, allPools] = result;

        const getTopSeven = <T extends ITrendingPool>(arr: T[]): T[] =>
          arr.sort((a, b) => b.apy - a.apy).slice(0, 7);

        const data: { [key in trendType]: ITrendingPool[] } = {
          'ETH Pools': getTopSeven(ethPools as ITrendingPool[]),
          'Stable Pools': getTopSeven(stablePools as ITrendingPool[]),
          All: getTopSeven(allPools as ITrendingPool[]),
        };

        return data;
      });

      return response;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message || errorMessage);
    }
  }
);
