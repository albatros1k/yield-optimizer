import { Fragment, memo, useMemo } from 'react';

import { icons } from '../../../shared/Icons';
import { H2 } from '../../../shared/ui/Typography';
import { Grid, Row } from '../../../shared/ui/Containers';

import { selectVaultsByTvl } from '../../../features/data/selectors/tvl';
import { useAppSelector } from '../../../store';

import { Vault } from './Vault';

const { question } = icons;

export const BestVaults = memo(() => {
  const vaultsByTvl = useAppSelector(selectVaultsByTvl);

  const bestVaults = useMemo<JSX.Element[]>(
    () =>
      Object.entries(vaultsByTvl)
        .sort((a, b) => Number(b[1].tvl) - Number(a[1].tvl))
        .slice(0, 3)
        .map(([vaultId], index) => {
          const color = [
            'linear-gradient(191deg, #222446 0%, #272845 100%)',
            'linear-gradient(191deg, #463322 0%, #452727 100%)',
            'linear-gradient(191deg, #39393F 0%, #38383C 100%);',
          ][index];
          return <Vault key={vaultId} vaultId={vaultId} color={color} />;
        }),
    [vaultsByTvl]
  );

  return (
    <Fragment>
      <Row align="center" m="0 0 32px">
        <H2 m="0 12px 0 0">Best Vaults This Week</H2>
        {question}
      </Row>
      <Grid
        w="100%"
        rowGap="0"
        colGap="2%"
        rowTemplate="none"
        colTemplate={`repeat(${bestVaults.length < 2 ? 2 : bestVaults.length},1fr)`}
      >
        {bestVaults}
      </Grid>
    </Fragment>
  );
});
