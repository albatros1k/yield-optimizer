import { memo, useEffect } from 'react';

import { fetchHistoricalRanges } from '../../../features/data/actions/historical';
import { VaultEntity } from '../../../features/data/entities/vault';
import {
  selectHistoricalHasAnyChart,
  selectHistoricalRangesStatus,
} from '../../../features/data/selectors/historical';

import { useAppDispatch, useAppSelector } from '../../../store';

import { HistoricalGraph } from './HistoricalGraph';

interface HistoricalRateProps {
  vaultId: VaultEntity['id'];
}

export const HistoricalRate = memo<HistoricalRateProps>(({ vaultId }) => {
  const dispatch = useAppDispatch();
  const rangesStatus = useAppSelector(state => selectHistoricalRangesStatus(state, vaultId));
  const hasAnyChart = useAppSelector(state => selectHistoricalHasAnyChart(state, vaultId));

  useEffect(() => {
    if (rangesStatus === 'idle') {
      dispatch(fetchHistoricalRanges({ vaultId }));
    }
  }, [dispatch, rangesStatus, vaultId]);

  if (!hasAnyChart) {
    return null;
  }

  return <HistoricalGraph vaultId={vaultId} />;
});
