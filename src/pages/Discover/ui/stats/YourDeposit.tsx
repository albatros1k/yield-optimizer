import { memo } from 'react';

import { H1, Main } from '../../../../shared/ui/Typography';

import { selectIsVaultBoosted } from '../../../../features/data/selectors/boosts';

import {
  selectIsBalanceHidden,
  selectIsWalletKnown,
  selectWalletAddress,
} from '../../../../features/data/selectors/wallet';

import { formatBigUsd } from '../../../../helpers/format';

import { useAppSelector } from '../../../../store';

import { ContentLoading } from '../../../../components/ContentLoading';

const BoostedVaultDepositedLarge = memo<{ vaultId: VaultEntity['id'] }>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const depositUsd = formatBigUsd(
    useAppSelector(state => selectUserVaultDepositInUsd(state, vaultId))
  );
  const blurred = useAppSelector(selectIsBalanceHidden);
  const walletAddress = useAppSelector(selectWalletAddress);
  const isLoaded = useAppSelector(state =>
    state.ui.dataLoader.global.prices.alreadyLoadedOnce && selectIsWalletKnown(state)
      ? state.ui.dataLoader.byAddress[walletAddress]?.byChainId[vault.chainId]?.balance
          .alreadyLoadedOnce
      : true
  );

  return <>{isLoaded ? <>{blurred ? '...' : depositUsd}</> : <ContentLoading />}</>;
});

const NonBoostedVaultDeposited = memo<{ vaultId: VaultEntity['id'] }>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  const depositUsd = useAppSelector(state =>
    formatBigUsd(selectUserVaultDepositInUsd(state, vaultId))
  );
  const blurred = useAppSelector(selectIsBalanceHidden);
  const walletAddress = useAppSelector(selectWalletAddress);
  const isLoaded = useAppSelector(state =>
    state.ui.dataLoader.global.prices.alreadyLoadedOnce && selectIsWalletKnown(state)
      ? state.ui.dataLoader.byAddress[walletAddress]?.byChainId[vault.chainId]?.balance
          .alreadyLoadedOnce
      : true
  );

  return <>{isLoaded ? <>{blurred ? '...' : depositUsd}</> : <ContentLoading />}</>;
});

interface YourDepositProps {
  vaultId: string;
  typography?: typeof H1;
  margin?: string;
}

export const YourDeposit = memo<YourDepositProps>(({ vaultId, typography, margin }) => {
  const isBoosted = useAppSelector(state => selectIsVaultBoosted(state, vaultId));
  const userStaked = useAppSelector(state => selectHasUserBalanceInActiveBoost(state, vaultId));
  const Typography = typography || Main;

  return (
    <Typography m={margin}>
      {isBoosted && userStaked ? (
        <BoostedVaultDepositedLarge vaultId={vaultId} />
      ) : (
        <NonBoostedVaultDeposited vaultId={vaultId} />
      )}
    </Typography>
  );
});
