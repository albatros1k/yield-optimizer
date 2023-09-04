import { createSlice } from '@reduxjs/toolkit';

import { ISupportedProtocol } from '../entities/market';

export interface SupportedProtocolsState {
  loaded: boolean;
  data: ISupportedProtocol[];
  nameMap: Record<string, string>;
  slugMap: Record<string, string>;
}

const initialState: SupportedProtocolsState = {
  loaded: false,
  data: [],
  nameMap: {},
  slugMap: {},
};

export const supportedProtocolsSlice = createSlice({
  name: 'supportedProtocolsReducer',
  initialState,
  reducers: {
    setSupportedProtocols: (state, { payload }) => {
      const nameMap: Record<string, string> = {};
      const slugMap: Record<string, string> = {};
      payload.forEach(({ protocol, protocolSlug }) => {
        nameMap[protocol] = protocolSlug;
        slugMap[protocolSlug] = protocol;
      });
      state = { loaded: true, data: payload, nameMap, slugMap };
    },
  },
});

export const { setSupportedProtocols } = supportedProtocolsSlice.actions;
