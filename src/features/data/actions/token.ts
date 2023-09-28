import { createAsyncThunk } from '@reduxjs/toolkit';

import { MerlinApi } from '../apis/merlin/merlin-api';

export const fetchToken = createAsyncThunk<string>('token/fetchToken', async () => {
  return await MerlinApi.getHeader();
});
