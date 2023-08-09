import { Fragment, memo, useMemo } from 'react';

import { useAppSelector } from '../../../../store';
import { Main } from '../../../../shared/ui/Typography';
import { formatBigUsd } from '../../../../helpers/format';
import { selectVaultTvl } from '../../../../features/data/selectors/tvl';
import { selectVaultById } from '../../../../features/data/selectors/vaults';

interface TvlProps {
  vaultId: string;
}

export const Tvl = memo<TvlProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const tvl = useAppSelector(state => selectVaultTvl(state, vaultId));
  const { byChainId, global } = useAppSelector(state => state.ui.dataLoader);

  const isLoaded = useMemo<boolean>(
    () =>
      byChainId[vault.chainId]?.contractData.alreadyLoadedOnce && global.prices.alreadyLoadedOnce,
    [byChainId, global, vault.chainId]
  );

  const value = useMemo<string>(() => (isLoaded ? formatBigUsd(tvl) : '...'), [isLoaded, tvl]);

  return (
    <Fragment>
      <Main>{value}</Main>
    </Fragment>
  );
});
