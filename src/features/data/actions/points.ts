import { createAsyncThunk } from '@reduxjs/toolkit';

import { getBeefyApi } from '../apis/instances';
import { BeefyState } from '../../../redux-types';

export const fetchGalaxyPoints = createAsyncThunk(
  'points/fetchGalaxyPoints',
  async (_, thunkAPI) => {
    const api = getBeefyApi();
    const walletAddress = (thunkAPI.getState() as BeefyState).user.wallet.address;
    return await api.getGalaxyPoints(walletAddress);
  }
);
