import { createSlice } from '@reduxjs/toolkit';

import { ITokenBalance } from '../apis/merlin/types/tokenBalance';
import { CurrentRate } from '../apis/merlin/types/rate';
import { ITokenOverview } from '../apis/merlin/types/overview';
import { IActivePosition, IEntryPrice, IPoolInfo } from '../apis/merlin/types/poolInfo';
import { IPortfolio } from '../apis/merlin/types/portfolio';

import { getDataReducer } from '../actions/merlin';

export interface IAddressMap {
  symbol: string;
  tokenName: string;
  tokenDecimals: number;
}

interface ITotals {
  totalNetWorth: number;
  unrealizedPnl: number;
  realizedPnl: number;
  totalDebt: number;
  totalPnl: number;
  totalRewards: number;
  walletNetWorth: number;
  netNav: number;
}

// Keys that are different from ActionPayload
type TechnicalKeys = 'isInitialLoaded' | 'isLoading' | 'error';
type ModifiedKeys = 'overviews';

export type IUserBalance = ITokenBalance & CurrentRate;

export interface MerlinState {
  isInitialLoaded: boolean;
  isLoading: boolean;
  userBalances: IUserBalance[];
  overviews: ITokenOverview[];
  poolInfo: IPoolInfo[];
  averageEntryPrice: IEntryPrice[];
  lpAverageEntryPrice: IEntryPrice[];
  protocolAverageEntryPrice: Record<string, { entryPrice: number; initialAmount: number }>;
  portfolio: IPortfolio[];
  pricesList: Record<string, CurrentRate>;
  addressMap: Record<string, IAddressMap>;
  protocolIdMap: Record<string, string>;
  activePositionYieldAndPnl: IActivePosition[];
  error: string | null | unknown;
  totals: ITotals;
}

export type DataPayload = Omit<MerlinState, TechnicalKeys | ModifiedKeys> & {
  userTokenOverviews: ITokenOverview[];
  averageEntryPrice: IEntryPrice[];
  lpAverageEntryPrice: IEntryPrice[];
  protocolAverageEntryPrice: Record<string, { entryPrice: number; initialAmount: number }>;
};

export interface IPlatform extends IPoolInfo, IPortfolio {
  totalNet: number;
  withPnl: boolean;
  protocolName: string;
  protocolPNL: number;
}

const initialState: MerlinState = {
  isInitialLoaded: false,
  isLoading: false,
  userBalances: [],
  overviews: [],
  poolInfo: [],
  portfolio: [],
  activePositionYieldAndPnl: [],
  averageEntryPrice: [],
  lpAverageEntryPrice: [],
  protocolAverageEntryPrice: {},
  pricesList: {},
  addressMap: {},
  protocolIdMap: {},
  error: null,
  totals: {
    totalNetWorth: 0,
    totalDebt: 0,
    totalPnl: 0,
    totalRewards: 0,
    realizedPnl: 0,
    unrealizedPnl: 0,
    walletNetWorth: 0,
    netNav: 0,
  },
};

export const merlinSlice = createSlice({
  name: 'merlinReducer',
  initialState,
  reducers: {
    resetDataReducer: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getDataReducer.fulfilled, (state, { payload }) => {
      const {
        userTokenOverviews,
        poolInfo,
        portfolio,
        activePositionYieldAndPnl,
        pricesList,
        userBalances,
        totals,
        addressMap,
        averageEntryPrice,
        lpAverageEntryPrice,
        protocolAverageEntryPrice,
        protocolIdMap,
      } = payload;
      state.userBalances = userBalances;
      state.overviews = userTokenOverviews;
      state.poolInfo = poolInfo;
      state.portfolio = portfolio;
      state.activePositionYieldAndPnl = activePositionYieldAndPnl;
      state.pricesList = pricesList;
      state.addressMap = addressMap;
      state.protocolIdMap = protocolIdMap;
      state.totals = totals;
      state.averageEntryPrice = averageEntryPrice;
      state.lpAverageEntryPrice = lpAverageEntryPrice;
      state.protocolAverageEntryPrice = protocolAverageEntryPrice;
      state.isLoading = false;
      state.isInitialLoaded = true;
    });
    builder.addCase(getDataReducer.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDataReducer.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { actions: merlinActions, reducer: merlinReducer } = merlinSlice;
