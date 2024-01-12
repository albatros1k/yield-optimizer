import { createSlice } from '@reduxjs/toolkit';

import { fetchGalaxyPoints, getMissionLevel } from '../../actions/points';
import { UserRanking } from '../../entities/ranking';

export type PointsState = Omit<UserRanking, 'address'> & {
  loading: boolean;
  address: Omit<UserRanking['address'], 'username' | 'avatar' | 'aptosAddress' | 'discordUserName'>;
  missionLevel: number;
};

const initialPointsState: PointsState = {
  loading: false,
  id: '',
  points: 0,
  rank: 0,
  missionLevel: 0,
  address: {
    id: '',
    twitterUserName: '',
    address: '',
    solanaAddress: '',
    seiAddress: '',
  },
};

export const pointsSlice = createSlice({
  name: 'points',
  initialState: initialPointsState,
  reducers: {
    resetPoints: () => initialPointsState,
  },
  extraReducers: builder => {
    builder.addCase(fetchGalaxyPoints.fulfilled, (sliceState, action) => {
      return (sliceState = { ...sliceState, ...action.payload });
    });
    builder.addCase(getMissionLevel.pending, sliceState => {
      sliceState.loading = true;
    });
    builder.addCase(getMissionLevel.rejected, sliceState => {
      sliceState.loading = false;
    });
    builder.addCase(getMissionLevel.fulfilled, (sliceState, action) => {
      sliceState.loading = false;
      sliceState.missionLevel = action.payload;
    });
  },
});

export const pointsSliceActions = pointsSlice.actions;
