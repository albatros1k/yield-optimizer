import { memo, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactInputAmount,
  selectTransactVaultId,
} from '../../../../../features/data/selectors/transact';
import { selectVaultById } from '../../../../../features/data/selectors/vaults';
import { selectTokenByAddress } from '../../../../../features/data/selectors/tokens';
import { selectUserVaultDepositInDepositTokenExcludingBoosts } from '../../../../../features/data/selectors/balance';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';

import { AmountInput, AmountInputProps } from '../AmountInput/AmountInput';

export const WithdrawTokenAmountInput = memo(() => {
  const dispatch = useAppDispatch();
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const userBalance = useAppSelector(state =>
    selectUserVaultDepositInDepositTokenExcludingBoosts(state, vaultId)
  );

  const value = useAppSelector(selectTransactInputAmount);
  const handleChange = useCallback<AmountInputProps['onChange']>(
    (value, isMax) => {
      dispatch(
        transactActions.setInputAmount({
          amount: value.decimalPlaces(depositToken.decimals, BigNumber.ROUND_FLOOR),
          max: isMax,
        })
      );
    },
    [dispatch, depositToken]
  );

  return (
    <AmountInput
      value={value}
      maxValue={userBalance}
      maxDecimals={depositToken.decimals}
      onChange={handleChange}
    />
  );
});
