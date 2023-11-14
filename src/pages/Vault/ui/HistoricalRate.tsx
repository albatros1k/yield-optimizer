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
import { H1, H3, SubTitle } from '../../../shared/ui/Typography';
import { BlurredOverlay } from './styled';

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
      <Card p="25px" h="100%" overflowHidden pos="relative">
        <BlurredOverlay>
          <H1 m="0 0 16px">Coming Soon</H1>
          <SubTitle ta="center" maxW="270px">
            The historical data on the changes in annual percentage yield (APY), total value locked
            (TVL), and price will be available soon.
          </SubTitle>
        </BlurredOverlay>
        <Row w="100%" justify="space-between" align="center" m="0 0 28px">
          <H3 color={colors.alterText}>Historical Rate</H3>
        </Row>
        <Image w="100%" h="85%" src={mockChart} />
      </Card>
    );
  }

  return <HistoricalGraph vaultId={vaultId} />;
});
