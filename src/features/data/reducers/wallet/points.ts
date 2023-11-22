import { createSlice } from '@reduxjs/toolkit';
import { fetchGalaxyPoints } from '../../actions/points';
import { UserRanking } from '../../entities/ranking';

export type PointsState = Omit<UserRanking, 'address'> & {
  address: Omit<UserRanking['address'], 'username' | 'avatar' | 'aptosAddress' | 'discordUserName'>;
};

const initialPointsState: PointsState = {
  id: '',
  points: 0,
  rank: 0,
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
      return (sliceState = action.payload);
    });
  },
});

export const pointsSliceActions = pointsSlice.actions;
