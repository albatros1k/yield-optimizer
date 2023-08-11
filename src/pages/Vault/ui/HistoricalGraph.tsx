import { memo, useState } from 'react';
import { useTheme } from 'styled-components';

import { VaultEntity } from '../../../features/data/entities/vault';
import { selectVaultById } from '../../../features/data/selectors/vaults';
import { ChartStat } from '../../../features/data/reducers/historical-types';
import { selectTokenByAddress } from '../../../features/data/selectors/tokens';
import { selectHistoricalAvailableCharts } from '../../../features/data/selectors/historical';
import { getDefaultStat } from '../../../features/vault/components/HistoricGraph/utils';

import { H3 } from '../../../shared/ui/Typography';
import { Card, Row } from '../../../shared/ui/Containers';

import { useAppSelector } from '../../../store';

import { ChartSwitcher } from './ChartSwitcher';
import { Chart } from './Chart';

interface HistoricalGraphProps {
  vaultId: VaultEntity['id'];
}

export const HistoricalGraph = memo<HistoricalGraphProps>(({ vaultId }) => {
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const { oracleId } = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const availableStats = useAppSelector(state =>
    selectHistoricalAvailableCharts(state, vaultId, oracleId)
  );
  const [stat, setStat] = useState<ChartStat>(() => getDefaultStat(availableStats));

  const { colors } = useTheme();

  return (
    <Card p="25px" h="100%">
      <Row w="100%" justify="space-between" align="center" m="0 0 28px">
        <H3 color={colors.alterText}>Historical Rate</H3>
        <Row w="calc(50% - 10px)">
          <ChartSwitcher stat={stat} availableStats={availableStats} onChange={setStat} />
        </Row>
      </Row>
      <Chart vaultId={vaultId} oracleId={oracleId} stat={stat} />
    </Card>
  );
});
