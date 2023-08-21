import { createSelector } from '@reduxjs/toolkit';

import { BeefyState } from '../../../redux-types';
import { IPlatform, MerlinState } from '../reducers/merlin';
import { parseProtocolName } from '../../../helpers/merlinHelpers';

export const selectMerlinInfo = (state: BeefyState): MerlinState => {
  return state.merlin;
};

export const getAllPlatforms = createSelector(
  (state: BeefyState) => state.merlin,
  ({ poolInfo, portfolio, overviews, activePositionYieldAndPnl }) => {
    const merlinPlatforms = poolInfo.reduce((platforms: Record<string, any>, platform) => {
      const {
        protocol,
        suppliedUSDTotal,
        borrowedUSDTotal,
        logo,
        protocolId,
        chain: platformChain,
      } = platform;

      const parsedProtocol: string = parseProtocolName(protocol);

      const historicalPNL = overviews.reduce<number>(
        (total, { userTokenProtocolOverviews, chain }) => {
          userTokenProtocolOverviews.forEach(({ protocolId: id, pnlUSD }) => {
            if (protocolId === id && platformChain === chain) total += Number(pnlUSD);
          });
          return total;
        },
        0
      );

      const activePNL = activePositionYieldAndPnl.reduce<number>(
        (total, { pnlUsd, protocolId: id }) => {
          if (id === protocolId) total += Number(pnlUsd);
          return total;
        },
        0
      );

      const protocolPNL: number = historicalPNL + activePNL;

      if (protocolId in platforms) {
        platforms[protocolId] = {
          ...platforms[protocolId],
          totalNet: platforms[protocolId].totalNet + suppliedUSDTotal - borrowedUSDTotal,
        };
      } else {
        platforms[protocolId] = {
          ...platform,
          protocolName: parsedProtocol,
          protocolPNL,
          withPnl: true,
          totalNet: suppliedUSDTotal - borrowedUSDTotal,
          logo_url:
            logo ||
            `https://valk-merlin.s3.amazonaws.com/protocol-icons/${
              protocolId || parsedProtocol.toLowerCase()
            }.png`,
        };
      }

      return platforms;
    }, {});

    const deBankPlatforms = portfolio.map(platform => ({
      ...platform,
      protocolName: platform.name,
      withPnl: false,
      totalNet: platform.portfolio_item_list.reduce(
        (total, { stats: { net_usd_value } }) => (total += net_usd_value),
        0
      ),
    }));

    const platforms: IPlatform[] = [...Object.values(merlinPlatforms), ...deBankPlatforms];

    return platforms;
  }
);
