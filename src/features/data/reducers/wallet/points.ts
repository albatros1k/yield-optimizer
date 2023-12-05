import { createSlice } from '@reduxjs/toolkit';

import { fetchGalaxyPoints, getNftData } from '../../actions/points';
import { UserRanking } from '../../entities/ranking';

type Attribute = {
  trait_type: string;
  value: string | number;
};

type Metadata = {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  background_color: string;
  external_link: string;
  owner: string;
  attributes: null | Attribute[];
};

export type PointsState = Omit<UserRanking, 'address'> & {
  loading: boolean;
  address: Omit<UserRanking['address'], 'username' | 'avatar' | 'aptosAddress' | 'discordUserName'>;
  nft: Metadata | null;
};

const initialPointsState: PointsState = {
  loading: false,
  id: '',
  points: 0,
  rank: 0,
  nft: null,
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
    builder.addCase(getNftData.pending, sliceState => {
      sliceState.loading = true;
    });
    builder.addCase(getNftData.rejected, sliceState => {
      sliceState.loading = false;
    });
    builder.addCase(getNftData.fulfilled, (sliceState, action) => {
      sliceState.loading = false;
      sliceState.nft = action.payload;
    });
  },
});

export const pointsSliceActions = pointsSlice.actions;
