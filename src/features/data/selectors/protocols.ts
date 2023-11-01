import { createSelector } from '@reduxjs/toolkit';

import { BeefyState } from '../../../redux-types';

export function selectProtocols(state: BeefyState) {
  return state.ui.protocols;
}

export const selectSearchedProtocols = createSelector(
  (state: BeefyState) => state.ui.protocols.search,
  (state: BeefyState) => state.ui.protocols.supportedProtocols.defi,
  (search, protocols) =>
    Object.entries(protocols)
      .sort((a, b) => b[1].length - a[1].length)
      .filter(([, protocols]) =>
        protocols.some(
          ({ protocolName }) =>
            search.length === 0 || protocolName.toLowerCase().includes(search.toLowerCase())
        )
      )
);
