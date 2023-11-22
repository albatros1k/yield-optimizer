import { Fragment, memo, useMemo } from 'react';

import { Grid } from '../../../shared/ui/Containers';

// import { selectVaultsByTvl } from '../../../features/data/selectors/tvl';
import { useAppSelector } from '../../../store';

import { Vault } from './Vault';
import { selectFilteredVaults } from '../../../features/data/selectors/filtered-vaults';

//TODO there was a logic to show top 3 by TVL

export const BestVaults = memo(() => {
  // const vaultsByTvl = useAppSelector(selectVaultsByTvl);

  const vaultIds = useAppSelector(selectFilteredVaults);

  // const bestVaults = useMemo<JSX.Element[]>(
  //   () =>
  //     Object.entries(vaultsByTvl)
  //       .sort((a, b) => Number(b[1].tvl) - Number(a[1].tvl))
  //       .slice(0, 3)
  //       .map(([vaultId], index) => {
  //         const color = [
  //           'linear-gradient(191deg, #222446 0%, #272845 100%)',
  //           'linear-gradient(191deg, #463322 0%, #452727 100%)',
  //           'linear-gradient(191deg, #39393F 0%, #38383C 100%);',
  //         ][index];
  //         return <Vault key={vaultId} vaultId={vaultId} color={color} />;
  //       }),
  //   [vaultsByTvl]
  // );

  const bestVaults = useMemo(
    () => vaultIds.map(vaultId => <Vault key={vaultId} vaultId={vaultId} />),
    [vaultIds]
  );

  return (
    <Fragment>
      <Grid w="100%" rowGap="20px" colGap="2%" rowTemplate="none" colTemplate={`repeat(${2},1fr)`}>
        {bestVaults}
      </Grid>
    </Fragment>
  );
});
