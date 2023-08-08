import { Fragment, memo, useMemo } from 'react';

import { icons } from '../../../shared/Icons';
import { H2 } from '../../../shared/ui/Typography';
import { Row } from '../../../shared/ui/Containers';

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
        .map(([vaultId]) => <Vault key={vaultId} vaultId={vaultId} />),
    [vaultsByTvl]
  );

  return (
    <Fragment>
      <Row align="center" m="0 0 32px">
        <H2 m="0 12px 0 0">Best Vaults This Week</H2>
        {question}
      </Row>
      <Row w="100%" justify="space-between">
        {bestVaults}
      </Row>
    </Fragment>
  );
});
