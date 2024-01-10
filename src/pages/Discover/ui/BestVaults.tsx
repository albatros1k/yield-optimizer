import { Fragment, memo, useMemo } from 'react';

import { Grid } from '../../../shared/ui/Containers';

import { useAppSelector } from '../../../store';

import { Vault } from './Vault';
import { selectAllVaults } from '../../../features/data/selectors/vaults';

//TODO there was a logic to show top 3 by TVL

export const BestVaults = memo(() => {
  const allVaults = useAppSelector(selectAllVaults);

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

  // const bestVaults = useMemo(
  //   () => vaultIds.map(vaultId => <Vault key={vaultId} vaultId={vaultId} />),
  //   [vaultIds]
  // );

  const bestVaults = useMemo(() => {
    const uniqueNamesSet = new Set();
    return allVaults
      .filter(vault => {
        if (vault && !uniqueNamesSet.has(vault.name)) {
          uniqueNamesSet.add(vault.name);
          return true;
        }
        return false;
      })
      .map(vault => <Vault key={vault.id} vaultId={vault.id} />);
  }, [allVaults]);

  return (
    <Fragment>
      <Grid w="100%" rowGap="20px" colGap="2%" rowTemplate="none" colTemplate={`repeat(${2},1fr)`}>
        {bestVaults}
      </Grid>
    </Fragment>
  );
});
