import { BeefyState } from '../../../redux-types';

export const selectGalaxyPoints = (state: BeefyState) => state.user.points;

export const selectGalaxyNft = (state: BeefyState) => state.user.points.nft;
