import { Fragment } from 'react';

import { useAppSelector } from '../../../store';
import { selectFilteredVaults } from '../../../features/data/selectors/filtered-vaults';
import { VirtualVaultsList } from './VirtualVaultsList';
import { NoResult } from './NoResult';

export const VaultList = () => {
  const vaultIds = useAppSelector(selectFilteredVaults);

  return (
    <Fragment>
      {vaultIds.length === 0 ? <NoResult /> : null}
      <VirtualVaultsList vaultIds={vaultIds} />
    </Fragment>
  );
};
