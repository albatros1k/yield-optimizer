import { BeefyState } from '../../../redux-types';

export const selectVaultTerms = (state: BeefyState) => state.user.agreement.vaultTermsAccepted;
