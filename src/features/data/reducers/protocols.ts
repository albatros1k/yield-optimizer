import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ISupportedProtocolsResponse } from '../apis/merlin/types/protocols';
import { getSupportedProtocols } from '../actions/protocols';

export type ProtocolState = {
  loading: boolean;
  supportedProtocols: ISupportedProtocolsResponse;
  search: string;
  error: string | null | unknown;
};

export const initialState: ProtocolState = {
  loading: false,
  search: '',
  supportedProtocols: {
    pnl: {},
    defi: {},
  },
  error: null,
};

export const protocolSlice = createSlice({
  name: 'protocols',
  initialState: initialState,
  reducers: {
    onSearchProtocol(sliceState, action: PayloadAction<string>) {
      sliceState.search = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getSupportedProtocols.fulfilled,
      (state, { payload }: PayloadAction<ISupportedProtocolsResponse>) => {
        state.supportedProtocols = payload;
        state.loading = false;
      }
    );
    builder.addCase(getSupportedProtocols.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getSupportedProtocols.rejected,
      (state, { payload }: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const protocolActions = protocolSlice.actions;
