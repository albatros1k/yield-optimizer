import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MerlinApi } from '../apis/merlin/merlin-api';

const errorMessage: string = 'Failed to load Supported Protocols';

export const getSupportedProtocols = createAsyncThunk('protocols/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await MerlinApi.getSupportedProtocols();
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.message || errorMessage);
  }
});
