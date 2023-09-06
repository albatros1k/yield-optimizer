/* eslint-disable import/named */
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/fr';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';

import { ITheme } from '../../../shared/styles/theme';

import { definePlus } from '../../../helpers/merlinHelpers';
import { protocolType } from '../../Market/types/period';
import { IHistoricalData, chartKpiKey } from '../../../features/data/entities/market';

interface IChartArea {
  bottom: number;
  top: number;
}

export const createGradient = (ctx: CanvasRenderingContext2D, area: IChartArea, color: string) => {
  const colorStart = color + '00';
  const colorMid = color + '24';
  const colorEnd = color + '48';

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
};

export const createChartOptions = (
  theme: ITheme,
  isPercentageValue: boolean = false,
  displayTicks: boolean = false,
  isNoValueSymbol: boolean = false
): ChartOptions<'line' | 'bar'> => {
  return {
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
        titleFont: {
          family: 'Outfit,Commissioner',
          size: 14,
        },
        bodyFont: {
          family: 'Outfit,Commissioner',
          size: 12,
        },
        titleColor: theme.colors.textColor,
        bodyColor: theme.colors.textColor,
        borderColor: theme.colors.alterHelp,
        borderWidth: 1,
        bodySpacing: 2,
        titleMarginBottom: 3,
        cornerRadius: 4,
        backgroundColor: theme.colors.bgColor,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 4,
        usePointStyle: true,
        padding: 12,
        callbacks: {
          label: ({ dataIndex, dataset: { data, label } }) => {
            const currentVal = +(data[dataIndex] || 0);
            return `${label}: ${`${currentVal < 0 ? '-' : ''}${definePlus(
              Math.abs(currentVal),
              !isNoValueSymbol,
              2,
              isPercentageValue ? 'percent' : 'usd'
            )}`}`;
          },
          labelColor: ({ dataset: { borderColor }, dataIndex }) => {
            const currentColor =
              typeof borderColor === 'string'
                ? borderColor
                : Array.isArray(borderColor)
                ? borderColor[dataIndex]
                : theme.colors.subAccentMain;
            return { backgroundColor: currentColor, borderColor: currentColor };
          },
        },
      },
    },
    scales: {
      y: {
        position: 'right',
        stacked: false,
        grid: {
          display: displayTicks,
          color: theme.colors.alterHelp,
          drawTicks: displayTicks,
        },
        ticks: {
          display: displayTicks,
          color: theme.colors.alterText,
          font: {
            family: 'Outfit,Commissioner',
            size: 14,
          },
          callback: val => `${+val < 0 ? '-' : ''}${definePlus(Math.abs(+val), true)}`,
          padding: 20,
        },
        beginAtZero: true,
      },
      x: {
        stacked: false,
        grid: {
          display: displayTicks,
          color: theme.colors.alterHelp,
          drawTicks: displayTicks,
        },
        ticks: {
          display: displayTicks,
          color: theme.colors.alterText,
          align: 'inner',
          padding: 30,
          maxTicksLimit: 7,
          maxRotation: 0,
          font: {
            family: 'Outfit,Commissioner',
            size: 14,
          },
        },
      },
    },
  };
};

export const createLineChartData = (
  protocolsToShow: protocolType[],
  data: IHistoricalData[],
  kpiKey: chartKpiKey,
  start: string,
  days: number
): ChartData<'line'> => {
  const chartData: ChartData<'line'> = {
    datasets: [],
    labels: [],
  };

  const timestampArr: number[] = [];

  //create time line (time labels)
  for (let i = 0; i < days; i++) {
    const timestamp = +start + 86400 * (i + 1);
    timestampArr.push(timestamp);
    chartData.labels?.push(moment(timestamp * 1000).format('DD MMM, ddd'));
  }

  // iterate all protocols and check selected
  protocolsToShow.forEach(({ protocol, network, is_active, color }, protocolIndex) => {
    if (is_active && data[protocolIndex]) {
      //create new Dataset
      const ds: ChartDataset<'line'> = {
        label: `${protocol} (${network})`,
        data: [],
        borderColor: color,
        backgroundColor: ({ chart: { ctx: canvasRenderingContext2D, chartArea } }) =>
          chartArea
            ? createGradient(canvasRenderingContext2D, chartArea, color || '#5DC3F9')
            : '#5DC3F9',
        yAxisID: 'y',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 2,
        borderWidth: 1,
        fill: true,
      };
      //iterate time line for selected protocol and find correct date item, push it in dataSet
      timestampArr.forEach(currentDate => {
        const currentProtocolItemByDate = data[protocolIndex].data.find(
          el => el.timestamp === currentDate
        );
        const prevValue = ds.data[ds.data.length - 1];
        ds.data.push(
          currentProtocolItemByDate ? +currentProtocolItemByDate[kpiKey] : prevValue || 0
        );
      });

      chartData.datasets.push(ds);
    }
  });

  return chartData;
};
