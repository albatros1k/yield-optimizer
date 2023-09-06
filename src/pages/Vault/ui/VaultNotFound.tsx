import { PropsWithChildren, memo } from 'react';
import { Navigate } from 'react-router';

import { useAppSelector } from '../../../store';
import { selectVaultIdIgnoreCase } from '../../../features/data/selectors/vaults';
import { VaultUrlParams } from './Vault';
import { H2 } from '../../../shared/ui/Typography';

const PageNotFound = () => {
  return <H2>Not Fount</H2>;
};

type VaultNotFoundProps = PropsWithChildren<VaultUrlParams>;

export const VaultNotFound = memo<VaultNotFoundProps>(({ id }) => {
  const maybeVaultId = useAppSelector(state => selectVaultIdIgnoreCase(state, id));

  if (maybeVaultId !== undefined) {
    return <Navigate to={`/vault/${maybeVaultId}`} />;
  }

  return <PageNotFound />;
});
