import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export type AgreementState = {
  vaultTermsAccepted: boolean;
};

const initialAgreementState: AgreementState = {
  vaultTermsAccepted: localStorage.getItem('termsAccepted') === 'true',
};

export const agreementSlice = createSlice({
  name: 'agreement',
  initialState: initialAgreementState,
  reducers: {
    setVaultTermsAccepted(sliceState, action: PayloadAction<boolean>) {
      sliceState.vaultTermsAccepted = action.payload;
    },
  },
});

export const agreementSliceActions = agreementSlice.actions;
