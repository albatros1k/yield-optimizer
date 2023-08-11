import { memo, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { H3 } from '../../../shared/ui/Typography';
import { Card, Row } from '../../../shared/ui/Containers';

import { fetchHistoricalRanges } from '../../../features/data/actions/historical';
import { VaultEntity } from '../../../features/data/entities/vault';
import {
  selectHistoricalAvailableCharts,
  selectHistoricalHasAnyChart,
  selectHistoricalRangesStatus,
} from '../../../features/data/selectors/historical';
import { selectTokenByAddress } from '../../../features/data/selectors/tokens';
import { selectVaultById } from '../../../features/data/selectors/vaults';
import { getDefaultStat } from '../../../features/vault/components/HistoricGraph/utils';
import { ChartStat } from '../../../features/data/reducers/historical-types';

import { useAppDispatch, useAppSelector } from '../../../store';

import { ChartSwitcher } from './ChartSwitcher';
import { Chart } from './Chart';

interface HistoricalRateProps {
  vaultId: VaultEntity['id'];
}

export const HistoricalRate = memo<HistoricalRateProps>(({ vaultId }) => {
  const rangesStatus = useAppSelector(state => selectHistoricalRangesStatus(state, vaultId));
  const hasAnyChart = useAppSelector(state => selectHistoricalHasAnyChart(state, vaultId));
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { oracleId } = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const availableStats = useAppSelector(state =>
    selectHistoricalAvailableCharts(state, vaultId, oracleId)
  );
  const [stat, setStat] = useState<ChartStat>(() => getDefaultStat(availableStats));
  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  useEffect(() => {
    if (rangesStatus === 'idle') {
      dispatch(fetchHistoricalRanges({ vaultId }));
    }
  }, [dispatch, rangesStatus, vaultId]);

  if (!hasAnyChart) {
    return null;
  }

  return (
    <Card p="25px">
      <Row w="100%" justify="space-between" align="center">
        <H3 color={colors.alterText}>Historical Rate</H3>
        <Row w="calc(50% - 10px)">
          <ChartSwitcher stat={stat} availableStats={availableStats} onChange={setStat} />
        </Row>
      </Row>
      <Chart vaultId={vaultId} oracleId={oracleId} stat={stat} />
    </Card>
  );
});
