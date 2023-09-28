import { memo } from 'react';

import { VaultEntity } from '../../../features/data/entities/vault';

import { Transact } from './Transact';

interface ManagementProps {
  vaultId: VaultEntity['id'];
}

export const Management = memo<ManagementProps>(({ vaultId }) => {
  return <Transact vaultId={vaultId} />;
});
