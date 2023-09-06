/* eslint-disable import/named */
import { FC, useState, Fragment, useMemo } from 'react';
import { useTheme } from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { icons } from '../../../shared/Icons';
import { SquareButton } from '../../../shared/ui/Buttons';
import { Main, SubTitle } from '../../../shared/ui/Typography';
import { Card, Circle, Column, Grid, Row } from '../../../shared/ui/Containers';

import { protocolType } from '../../Market/types/period';
import { IHistoricalData, chartKpiKey as kpiKeyType } from '../../../features/data/entities/market';
import { createChartOptions, createLineChartData } from '../lib/helpers';

import { ChartBlock, PeriodButton } from './styled';
import { ExpandedChartModal } from './ExpandModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface PoolChartProps {
  title: string;
  subTitle: string;
  protocolsToShow: protocolType[];
  data: IHistoricalData[];
  kpiKey: kpiKeyType;
  start: string;
  days: number;
  isPercentageValue?: boolean;
  isSingleProtocol?: boolean;
  isMobile?: boolean;
  withSwitcher?: boolean;
  isNoValueSymbol?: boolean;
}

export const LineChart: FC<PoolChartProps> = ({
  title,
  subTitle,
  protocolsToShow,
  data,
  kpiKey,
  start,
  days,
  isSingleProtocol = false,
  withSwitcher,
  isPercentageValue,
  isNoValueSymbol,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentKpi, setCurrentKpi] = useState<kpiKeyType>(kpiKey);

  const onChangeCurrentKpi = (nextVal: kpiKeyType) => (): void => setCurrentKpi(nextVal);

  const onChangeExpanded = (): void => setExpanded(!expanded);

  const chartData: ChartData<'line'> = useMemo(
    () => createLineChartData(protocolsToShow, data, currentKpi, start, days),
    [data, protocolsToShow, currentKpi, days, start]
  );

  const renderLabels = (): JSX.Element[] =>
    protocolsToShow.map(({ protocol, network, color, is_active }) =>
      is_active ? (
        <Row m="0 10px 10px" key={protocol + network + color} maxW="100%" align="center">
          <Circle w="12px" h="12px" bg={color} m="0 7px 0 0" />
          <SubTitle maxW="calc(100% - 19px)" dotted>
            {protocol} ({network})
          </SubTitle>
        </Row>
      ) : (
        <span key={protocol + network + color} />
      )
    );

  return (
    <Fragment>
      <Card p="25px 30px 20px">
        <Row m="0 0 18px" justify="space-between">
          <Column>
            <Main m="0 0 10px">{title}</Main>
            <SubTitle>
              {subTitle} {isSingleProtocol ? '' : `, by Protocols`}
            </SubTitle>
          </Column>
          {withSwitcher ? (
            <Grid
              colGap="10px"
              rowGap="10px"
              colTemplate="repeat(2, 116px)"
              rowTemplate="auto"
              m="0 40px 0 auto"
            >
              <PeriodButton
                h={32}
                is_active={currentKpi === 'apy'}
                onClick={onChangeCurrentKpi('apy')}
              >
                Current
              </PeriodButton>
              <PeriodButton
                h={32}
                is_active={currentKpi === 'apyMean30'}
                onClick={onChangeCurrentKpi('apyMean30')}
              >
                30D Avg.
              </PeriodButton>
            </Grid>
          ) : null}
          <SquareButton w="32px" h="32px" onClick={onChangeExpanded} icon={icons.maximize} />
        </Row>
        <ChartBlock h="250px" pos="relative" w="100%">
          <Line
            options={createChartOptions(theme, isPercentageValue, false, isNoValueSymbol)}
            data={chartData}
          />
        </ChartBlock>
        {isSingleProtocol ? null : (
          <Row m="20px 0 0" align="center" justify="center" w="100%" flexWrap="wrap">
            {renderLabels()}
          </Row>
        )}
      </Card>
      {expanded ? (
        <ExpandedChartModal {...{ title, subTitle, onClose: onChangeExpanded }}>
          <Line
            options={createChartOptions(theme, isPercentageValue, true, isNoValueSymbol)}
            data={chartData}
          />
        </ExpandedChartModal>
      ) : null}
    </Fragment>
  );
};
