import { Fragment } from 'react';

import { useAppSelector } from '../../../store';
import { selectFilteredVaults } from '../../../features/data/selectors/filtered-vaults';
import { VirtualVaultsList } from './VirtualVaultsList';

export const VaultList = () => {
  const vaultIds = useAppSelector(selectFilteredVaults);

  return (
    <Fragment>
      {vaultIds.length === 0 ? <>No results</> : null}
      <VirtualVaultsList vaultIds={vaultIds} />
    </Fragment>
  );
};
