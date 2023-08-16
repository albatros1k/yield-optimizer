import { memo } from 'react';

import { useAppSelector } from '../../../../../store';
import { selectTransactVaultId } from '../../../../../features/data/selectors/transact';
import { selectVaultById } from '../../../../../features/data/selectors/vaults';
import { selectTokenByAddress } from '../../../../../features/data/selectors/tokens';
import { selectUserVaultDepositInDepositTokenExcludingBoosts } from '../../../../../features/data/selectors/balance';

import { TokenAmountFromEntity } from '../../../../../shared/ui/TokenAmount';
import { SubTitle } from '../../../../../shared/ui/Typography';

export const DepositedInVault = memo(() => {
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const token = useAppSelector(state =>
    vault ? selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress) : null
  );
  const balance = useAppSelector(state =>
    vault && token ? selectUserVaultDepositInDepositTokenExcludingBoosts(state, vaultId) : null
  );

  if (!vault || !token || !balance) {
    return <SubTitle>0</SubTitle>;
  }

  return <TokenAmountFromEntity amount={balance} token={token} minShortPlaces={4} />;
});
