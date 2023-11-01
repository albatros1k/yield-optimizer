import { BeefyState } from '../../../redux-types';

export const selectGalaxyPoints = (state: BeefyState) => state.user.points;
