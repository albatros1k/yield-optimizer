import { createSlice } from '@reduxjs/toolkit';

import { ISupportedNetwork } from '../entities/market';

export interface SupportedNetworksState {
  loaded: boolean;
  data: ISupportedNetwork[];
  nameMap: Record<string, string>;
  slugMap: Record<string, string>;
}

const initialState: SupportedNetworksState = {
  loaded: false,
  data: [],
  nameMap: {},
  slugMap: {},
};

export const supportedNetworksSlice = createSlice({
  name: 'supportedNetworksReducer',
  initialState,
  reducers: {
    setSupportedNetworks: (state, { payload }) => {
      const nameMap: Record<string, string> = {};
      const slugMap: Record<string, string> = {};
      payload.forEach(({ network, networkSlug }) => {
        nameMap[network] = networkSlug;
        slugMap[networkSlug] = network;
      });
      state = { loaded: true, data: payload, nameMap, slugMap };
    },
  },
});

export const { setSupportedNetworks } = supportedNetworksSlice.actions;
