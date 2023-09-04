import { createSlice } from '@reduxjs/toolkit';

import { ISupportedNetwork } from '../entities/market';
import { getSupportedNetworksAndProtocols } from '../actions/protocols-networks';

export interface SupportedNetworksState {
  loaded: boolean;
  data: ISupportedNetwork[];
  nameMap: Record<string, string>;
  slugMap: Record<string, string>;
  error: null | string | unknown;
}

const initialState: SupportedNetworksState = {
  loaded: false,
  data: [],
  nameMap: {},
  slugMap: {},
  error: null,
};

export const supportedNetworksSlice = createSlice({
  name: 'supportedNetworksReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSupportedNetworksAndProtocols.fulfilled, (state, { payload }) => {
      const [networks] = payload;

      const nameMap: Record<string, string> = {};
      const slugMap: Record<string, string> = {};
      networks.forEach(({ network, networkSlug }) => {
        nameMap[network] = networkSlug;
        slugMap[networkSlug] = network;
      });

      state.loaded = true;
      state.data = networks;
      state.nameMap = nameMap;
      state.slugMap = slugMap;
      state.error = null;
    });
    builder.addCase(getSupportedNetworksAndProtocols.pending, state => {
      state.loaded = false;
    });
    builder.addCase(getSupportedNetworksAndProtocols.rejected, (state, { payload }) => {
      state.loaded = false;
      state.error = payload;
    });
  },
});
