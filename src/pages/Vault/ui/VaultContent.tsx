import { Fragment, PropsWithChildren, memo } from 'react';

import { VaultEntity, isGovVault } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';

import { useAppSelector } from '../../../store';
import { Grid } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';
import { BackBlock } from '../../../shared/ui/BackBlock';
import { Spacer } from '../../../shared/ui/Spacer';

import { About } from './About';
import { HistoricalRate } from './HistoricalRate';
import { ProtocolAndAssets } from './ProtocolAndAssets';
import { Risks } from './Risks';
import { Management } from './Management';
import { Other } from './Other';

type VaultContentProps = PropsWithChildren<{
  vaultId: VaultEntity['id'];
}>;

export const VaultContent = memo<VaultContentProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  return (
    <Fragment>
      <BackBlock backText="Back to Vaults" />
      <H3 m="42px 0 24px">Vault Details</H3>
      <Grid
        w="100%"
        colTemplate="repeat(2,1fr)"
        rowTemplate="393px"
        colGap="20px"
        rowGap="20px"
        m="0 0 42px"
      >
        {!isGovVault(vault) ? <About vaultId={vaultId} /> : null}
        {!isGovVault(vault) ? <HistoricalRate vaultId={vaultId} /> : null}
        <ProtocolAndAssets vaultId={vaultId} />
        <Risks />
      </Grid>
      <Management vaultId={vaultId} />
      <Spacer />
      <Other />
    </Fragment>
  );
});
