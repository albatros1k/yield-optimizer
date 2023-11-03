import { createSlice } from '@reduxjs/toolkit';
import { fetchGalaxyPoints } from '../../actions/points';

export type PointsState = {
  id: string;
  points: number;
  rank: number;
  address: {
    id: string;
    twitterUserName: string;
    address: string;
    solanaAddress: string;
    seiAddress: string;
  };
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
