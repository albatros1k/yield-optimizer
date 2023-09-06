import { createSlice } from '@reduxjs/toolkit';

import { ISupportedProtocol } from '../entities/market';
import { getSupportedNetworksAndProtocols } from '../actions/protocols-networks';

export interface SupportedProtocolsState {
  loaded: boolean;
  data: ISupportedProtocol[];
  nameMap: Record<string, string>;
  slugMap: Record<string, string>;
  error: null | unknown | string;
}

const initialState: SupportedProtocolsState = {
  loaded: false,
  data: [],
  nameMap: {},
  slugMap: {},
  error: null,
};

export const supportedProtocolsSlice = createSlice({
  name: 'supportedProtocolsReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSupportedNetworksAndProtocols.fulfilled, (state, { payload }) => {
      const [, protocols] = payload;
      const nameMap: Record<string, string> = {};
      const slugMap: Record<string, string> = {};
      protocols.forEach(({ protocol, protocolSlug }) => {
        nameMap[protocol] = protocolSlug;
        slugMap[protocolSlug] = protocol;
      });

      state.loaded = true;
      state.data = protocols;
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
