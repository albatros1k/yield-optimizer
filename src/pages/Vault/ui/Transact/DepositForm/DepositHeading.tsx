import { memo, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { useTheme } from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../../store';

import { Row } from '../../../../../shared/ui/Containers';
import { SubTitle } from '../../../../../shared/ui/Typography';

import { transactActions } from '../../../../../features/data/reducers/wallet/transact';
import { selectUserBalanceOfToken } from '../../../../../features/data/selectors/balance';
import { selectTransactSelectedTokens } from '../../../../../features/data/selectors/transact';

import { BIG_ZERO } from '../../../../../helpers/big-number';

import { SelectedInWallet } from './SelectedInWallet';

export const DepositHeading = memo(() => {
  const selectedTokens = useAppSelector(selectTransactSelectedTokens);
  const depositToken = selectedTokens[0];
  const userBalance = useAppSelector(state =>
    selectUserBalanceOfToken(state, depositToken.chainId, depositToken.address)
  );
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const handleMax = useCallback(() => {
    if (userBalance.lte(BIG_ZERO)) {
      return;
    }

    dispatch(
      transactActions.setInputAmount({
        amount: userBalance.decimalPlaces(depositToken.decimals, BigNumber.ROUND_FLOOR),
        max: true,
      })
    );
  }, [dispatch, userBalance, depositToken]);

  return (
    <Row w="100%" justify="space-between" align="center" m="0 0 6px">
      <SubTitle color={colors.alterText}>Token</SubTitle>
      <Row align="center">
        <SubTitle color={colors.alterText} m="0 3px 0 0">
          Balance:
        </SubTitle>
        <SelectedInWallet />
        <SubTitle color={colors.subAccentSecondary} pointer m="0 0 0 15px" onClick={handleMax}>
          Set max
        </SubTitle>
      </Row>
    </Row>
  );
});
