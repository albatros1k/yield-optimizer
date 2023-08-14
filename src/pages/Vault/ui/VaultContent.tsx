import { Fragment, PropsWithChildren, memo } from 'react';

import { VaultEntity, isGovVault } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';
import { selectIsVaultPreStakedOrBoosted } from '../../../features/data/selectors/boosts';

import { useAppSelector } from '../../../store';
import { Grid } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';

import { About } from './About';
import { HistoricalRate } from './HistoricalRate';
import { ProtocolAndAssets } from './ProtocolAndAssets';
import { Risks } from './Risks';

type VaultContentProps = PropsWithChildren<{
  vaultId: VaultEntity['id'];
}>;

export const VaultContent = memo<VaultContentProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const isBoostedOrPreStake = useAppSelector(state =>
    selectIsVaultPreStakedOrBoosted(state, vaultId)
  );

  console.log(vault, walletAddress, isBoostedOrPreStake);

  return (
    <Fragment>
      <H3 m="0 0 24px">Vault Details</H3>
      <Grid w="100%" colTemplate="repeat(2,1fr)" rowTemplate="393px" colGap="20px" rowGap="20px">
        {!isGovVault(vault) ? <About vaultId={vaultId} /> : null}
        {!isGovVault(vault) ? <HistoricalRate vaultId={vaultId} /> : null}
        <ProtocolAndAssets vaultId={vaultId} />
        <Risks />
      </Grid>
    </Fragment>
  );
});
