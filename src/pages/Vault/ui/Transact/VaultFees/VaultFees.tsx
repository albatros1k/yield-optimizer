import { memo } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../../../shared/Icons';
import { SubTitle } from '../../../../../shared/ui/Typography';
import { Card, Grid, Row, SvgContainer } from '../../../../../shared/ui/Containers';

import { selectTransactVaultId } from '../../../../../features/data/selectors/transact';
import {
  selectAreFeesLoaded,
  selectFeesByVaultId,
} from '../../../../../features/data/selectors/fees';
import { selectVaultDepositFee } from '../../../../../features/data/selectors/vaults';
import { formatPercent } from '../../../../../helpers/format';

import { useAppSelector } from '../../../../../store';

export const VaultFees = memo(() => {
  const vaultId = useAppSelector(selectTransactVaultId);
  const fees = useAppSelector(state => selectFeesByVaultId(state, vaultId));
  const areFeesLoaded = useAppSelector(selectAreFeesLoaded);
  const deposit = useAppSelector(state => selectVaultDepositFee(state, vaultId));
  const { colors } = useTheme();

  return (
    <Card p="18px 24px" bg={colors.alterBg}>
      <Grid colTemplate="1fr" rowTemplate="none" colGap="0" rowGap="16px">
        <Row w="100%" justify="space-between" align="center">
          <Row align="center">
            <SubTitle m="0 3px 0 0" color={colors.alterText}>
              Deposit Fee
            </SubTitle>
            <SvgContainer size={12}>{icons.question}</SvgContainer>
          </Row>
          <SubTitle>
            {areFeesLoaded
              ? fees
                ? fees.deposit !== undefined
                  ? formatPercent(fees.deposit, 2, '0%')
                  : deposit
                : '?'
              : '-'}
          </SubTitle>
        </Row>

        <Row w="100%" justify="space-between" align="center">
          <Row align="center">
            <SubTitle m="0 3px 0 0" color={colors.alterText}>
              Withdrawal fee
            </SubTitle>
            <SvgContainer size={12}>{icons.question}</SvgContainer>
          </Row>
          <SubTitle>
            {areFeesLoaded ? (fees ? formatPercent(fees.withdraw, 2, '0%') : '?') : '-'}
          </SubTitle>
        </Row>
      </Grid>
    </Card>
  );
});
