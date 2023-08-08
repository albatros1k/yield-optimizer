import { BeefyState } from '../../../redux-types';
import { selectIsVaultGov } from '../../../features/data/selectors/vaults';
import {
  selectVaultApyAvailable,
  selectVaultShouldShowInterest,
} from '../../../features/data/selectors/data-loader';
import {
  selectDidAPIReturnValuesForVault,
  selectVaultTotalApy,
} from '../../../features/data/selectors/apy';
import {
  selectIsVaultBoosted,
  selectIsVaultPrestakedBoost,
} from '../../../features/data/selectors/boosts';

export const selectVaultInfo = (state: BeefyState, vaultId: string) => ({
  isGovVault: selectIsVaultGov(state, vaultId),
  isLoaded: selectVaultApyAvailable(state, vaultId),
  haveValues: selectDidAPIReturnValuesForVault(state, vaultId),
  values: selectVaultTotalApy(state, vaultId),
  isBoosted: selectIsVaultBoosted(state, vaultId),
  isPrestake: selectIsVaultPrestakedBoost(state, vaultId),
  shouldShowInterest: selectVaultShouldShowInterest(state, vaultId),
});
