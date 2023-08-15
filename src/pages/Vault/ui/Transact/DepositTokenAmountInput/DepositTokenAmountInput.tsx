import { memo, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactInputAmount,
  selectTransactSelectedTokens,
} from '../../../../../features/data/selectors/transact';
import { selectUserBalanceOfToken } from '../../../../../features/data/selectors/balance';
import { AmountInputProps } from '../../../../../features/vault/components/Actions/Transact/AmountInput';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';

import { AmountInput } from '../AmountInput';

interface DepositTokenAmountInputProps {}

export const DepositTokenAmountInput = memo<DepositTokenAmountInputProps>(() => {
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectTransactSelectedTokens);
  const depositToken = selectedTokens[0];
  const userBalance = useAppSelector(state =>
    selectUserBalanceOfToken(state, depositToken.chainId, depositToken.address)
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
