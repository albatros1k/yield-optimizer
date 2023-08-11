import { Fragment, memo, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

import { VaultEntity } from '../../../features/data/entities/vault';
import { TokenEntity } from '../../../features/data/entities/token';
import { ChartStat } from '../../../features/data/reducers/historical-types';
import { fetchHistoricalStat } from '../../../features/data/actions/historical';
import { useChartData } from '../../../features/vault/components/HistoricGraph/Graph/useChartData';
import {
  selectHistoricalAvailableBuckets,
  selectHistoricalBucketIsLoaded,
  selectHistoricalBucketStatus,
} from '../../../features/data/selectors/historical';
import {
  getAvailableRanges,
  getDefaultTimeRange,
  timeRangeToBucket,
} from '../../../features/vault/components/HistoricGraph/utils';

import { useAppDispatch, useAppSelector } from '../../../store';

import { createGradient, timestampToFormattedDate } from '../lib/helpers';
import { Block } from '../../../shared/ui/Containers';
import { formatPercent, formatUsd } from '../../../helpers/format';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface ChartProps {
  vaultId: VaultEntity['id'];
  oracleId: TokenEntity['oracleId'];
  stat: ChartStat;
}

export const Chart = memo<ChartProps>(({ vaultId, oracleId, stat }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const availableBuckets = useAppSelector(state =>
    selectHistoricalAvailableBuckets(state, stat, vaultId, oracleId)
  );

  const availableRanges = useMemo(() => getAvailableRanges(availableBuckets), [availableBuckets]);

  const bucket = useMemo(
    () => timeRangeToBucket[getDefaultTimeRange(availableRanges)],
    [availableRanges]
  );

  const bucketStatus = useAppSelector(state =>
    selectHistoricalBucketStatus(state, stat, vaultId, oracleId, bucket)
  );
  const bucketLoaded = useAppSelector(state =>
    selectHistoricalBucketIsLoaded(state, stat, vaultId, oracleId, bucket)
  );

  const { min, max, data } = useChartData(stat, vaultId, oracleId, bucket);

  const yTickFormatter = useMemo(() => {
    return stat === 'apy'
      ? (value: number) => formatPercent(value)
      : (value: number) => formatUsd(value);
  }, [stat]);

  useEffect(() => {
    if (bucketStatus === 'idle') {
      dispatch(fetchHistoricalStat(stat, vaultId, oracleId, bucket));
    }
  }, [dispatch, vaultId, oracleId, stat, bucket, bucketStatus]);

  const chartData = useMemo(() => {
    return {
      labels: data.map(({ t }) => timestampToFormattedDate(t)),
      datasets: [
        {
          data: data.map(({ v }) => v),
          borderColor: data.map(_ => colors.subAccentSecondary),
          backgroundColor(context) {
            const {
              chart: { ctx, chartArea },
            } = context;
            return chartArea
              ? createGradient(ctx, chartArea, colors.subAccentSecondary)
              : colors.subAccentSecondary;
          },
          yAxisID: 'y',
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 2,
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  }, [colors, data]);

  return (
    <Fragment>
      {bucketLoaded ? (
        <Block w="100%" h="284px">
          <Line
            data={chartData}
            options={{
              responsive: true,
              interaction: {
                mode: 'index' as const,
                intersect: false,
              },
              maintainAspectRatio: false,
              resizeDelay: 1000,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: ({ dataIndex, dataset: { data } }) => {
                      const currentVal = Number(data[dataIndex]);
                      return yTickFormatter(currentVal);
                    },
                  },
                },
              },
              scales: {
                y: {
                  max: max,
                  min: min,
                  stacked: false,
                  grid: {
                    display: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                  beginAtZero: false,
                },
                x: {
                  stacked: true,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
          />
        </Block>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
});
