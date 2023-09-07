import { Fragment, memo, useMemo } from 'react';
import { useAppSelector } from '../../../store';

import { getAllPlatforms } from '../../../features/data/selectors/merlin';

import { H2 } from '../../../shared/ui/Typography';
import { icons } from '../../../shared/Icons';
import { Grid } from '../../../shared/ui/Containers';

import { Wallet } from './Wallet/Wallet';
import { NoPositions } from '../../../shared/ui/NoPositions';

import { DeBankProtocol } from './Protocol/Debank/DebankProtocol';
import { MerlinProtocol } from './Protocol/Merlin/MerlinProtocol';

export const Assets = memo(() => {
  const allPlatforms = useAppSelector(getAllPlatforms);

  const renderProtocols = useMemo(
    () =>
      allPlatforms
        .filter(({ totalNet, protocolPNL }) => protocolPNL || totalNet)
        .sort((a, b) => b.totalNet - a.totalNet)
        .map((protocolInfo, index) => {
          const { withPnl, protocolName, chain } = protocolInfo;
          return withPnl ? (
            <MerlinProtocol {...{ key: `${protocolName}-${chain}-${index}`, protocolInfo }} />
          ) : (
            <DeBankProtocol {...{ key: `${protocolName}-${chain}-${index}`, protocolInfo }} />
          );
        }),
    [allPlatforms]
  );

  return (
    <Fragment>
      <Grid
        w="100%"
        colGap="20px"
        rowGap="0"
        colTemplate="repeat(4, 1fr)"
        rowTemplate="none"
        m="0 0 24px"
      >
        <H2>Your Positions</H2>
      </Grid>
      <Wallet />
      {!renderProtocols.length ? (
        <NoPositions
          icon={icons.search}
          heading="No positions found"
          description="No position for this wallet was found. If you have a position, please double-check if you connected from the correct wallet."
        />
      ) : (
        renderProtocols
      )}
    </Fragment>
  );
});
