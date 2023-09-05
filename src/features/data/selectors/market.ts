import { createSelector } from 'reselect';
import { BeefyState } from '../../../redux-types';

export const selectProtocolNameMap = (state: BeefyState) => {
  return state.market.supportedProtocols.nameMap;
};

export const selectTendingPools = (state: BeefyState) => state.market.trendingPools;

export const selectSupportedLoading = createSelector(
  (state: BeefyState) => state.market,
  ({ supportedNetworks, supportedProtocols }) => {
    return supportedNetworks.loaded && supportedProtocols.loaded;
  }
);
