import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { MerlinApi } from '../apis/merlin/merlin-api';

const errorMessage: string = 'Failed to load Supported Protocols and Networks';

export const getSupportedNetworksAndProtocols = createAsyncThunk(
  'supported/getSupportedNetworksAndProtocols',
  async (_, thunkAPI) => {
    try {
      const result = await Promise.all([
        MerlinApi.getSupportedChains(),
        MerlinApi.getSupportedPoolProtocols(),
      ]);
      return result;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message || errorMessage);
    }
  }
);
