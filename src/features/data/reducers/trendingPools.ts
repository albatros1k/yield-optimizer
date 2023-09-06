import { createSlice } from '@reduxjs/toolkit';

import { ITrendingPool, trendType } from '../entities/market';
import { getTrendingPools } from '../actions/market';

export interface TrendingPoolState {
  isLoaded: boolean;
  loading: boolean;
  errorMessage: string;
  data: {
    [key in trendType]: ITrendingPool[];
  };
}

const initialState: TrendingPoolState = {
  isLoaded: false,
  loading: false,
  errorMessage: '',
  data: {
    'ETH Pools': [],
    'Stable Pools': [],
    All: [],
  },
};

export const trendingPoolSlice = createSlice({
  name: 'trendingPoolReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTrendingPools.fulfilled, (state, { payload }) => {
      state.isLoaded = true;
      state.loading = false;
      state.errorMessage = '';
      state.data = payload;
    });
    builder.addCase(getTrendingPools.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTrendingPools.rejected, state => {
      state.isLoaded = false;
      state.loading = false;
      state.errorMessage = 'Error trying to get trending pools';
    });
  },
});
