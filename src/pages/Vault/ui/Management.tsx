import { Fragment, memo } from 'react';

import { H3 } from '../../../shared/ui/Typography';
import { Grid } from '../../../shared/ui/Containers';

import { VaultEntity } from '../../../features/data/entities/vault';

import { Transact } from './Transact';

interface ManagementProps {
  vaultId: VaultEntity['id'];
}

export const Management = memo<ManagementProps>(({ vaultId }) => {
  return (
    <Fragment>
      <H3 m="0 0 24px">Manage Position</H3>
      <Grid w="100%" colTemplate="repeat(2, 1fr)" rowTemplate="none" colGap="20px" rowGap="0">
        <Transact vaultId={vaultId} />
        <div />
      </Grid>
    </Fragment>
  );
});
