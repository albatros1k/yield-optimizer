import { memo, useEffect } from 'react';
import { useTheme } from 'styled-components';

import { fetchHistoricalRanges } from '../../../features/data/actions/historical';
import { VaultEntity } from '../../../features/data/entities/vault';
import {
  selectHistoricalHasAnyChart,
  selectHistoricalRangesStatus,
} from '../../../features/data/selectors/historical';

import mockChart from '../../../images/mockChart.png';

import { useAppDispatch, useAppSelector } from '../../../store';

import { HistoricalGraph } from './HistoricalGraph';
import { Image } from '../../../shared/ui/Images';
import { Card, Row } from '../../../shared/ui/Containers';
import { H3 } from '../../../shared/ui/Typography';

interface HistoricalRateProps {
  vaultId: VaultEntity['id'];
}

export const HistoricalRate = memo<HistoricalRateProps>(({ vaultId }) => {
  const dispatch = useAppDispatch();
  const rangesStatus = useAppSelector(state => selectHistoricalRangesStatus(state, vaultId));
  const hasAnyChart = useAppSelector(state => selectHistoricalHasAnyChart(state, vaultId));
  const { colors } = useTheme();

  useEffect(() => {
    if (rangesStatus === 'idle') {
      dispatch(fetchHistoricalRanges({ vaultId }));
    }
  }, [dispatch, rangesStatus, vaultId]);

  if (!hasAnyChart) {
    return (
      <Card p="25px" h="100%" overflowHidden>
        <Row w="100%" justify="space-between" align="center" m="0 0 28px">
          <H3 color={colors.alterText}>Historical Rate</H3>
        </Row>
        <Image w="100%" h="85%" src={mockChart} />
      </Card>
    );
  }

  return <HistoricalGraph vaultId={vaultId} />;
});
