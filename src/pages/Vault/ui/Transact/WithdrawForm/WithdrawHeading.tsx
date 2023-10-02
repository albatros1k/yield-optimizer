import { memo, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { useTheme } from 'styled-components';

import { Row } from '../../../../../shared/ui/Containers';
import { SubTitle } from '../../../../../shared/ui/Typography';

import { selectVaultById } from '../../../../../features/data/selectors/vaults';
import { selectTokenByAddress } from '../../../../../features/data/selectors/tokens';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';
import { selectTransactVaultId } from '../../../../../features/data/selectors/transact';
import { selectUserVaultDepositInDepositTokenExcludingBoosts } from '../../../../../features/data/selectors/balance';

import { BIG_ZERO } from '../../../../../helpers/big-number';

import { useAppDispatch, useAppSelector } from '../../../../../store';

import { DepositedInVault } from './DepositedInVault';
import { MaxTitle } from '../DepositForm/styled';

export const WithdrawHeading = memo(() => {
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const userBalance = useAppSelector(state =>
    selectUserVaultDepositInDepositTokenExcludingBoosts(state, vaultId)
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
        <DepositedInVault />
        <MaxTitle m="0 0 0 15px" onClick={handleMax}>
          Set max
        </MaxTitle>
      </Row>
    </Row>
  );
});
