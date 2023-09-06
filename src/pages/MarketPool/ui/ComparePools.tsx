/* eslint-disable import/no-unresolved */
import { Fragment, useState, useEffect, memo } from 'react';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Grid, Row } from '../../../shared/ui/Containers';

import { Periods, periodsType, protocolType } from '../../Market/types/period';
import { defaultPeriod } from '../../Market/lib/consts';
import { useHistoricalData } from '../lib/hooks';

import { PeriodButton } from './styled';
import { LineChart } from './LineChart';
import { ProtocolSelector } from './ProtocolSelector';
import { ComparePoolsSkeleton } from './skeleton';

export const ComparePools = memo(() => {
  const [period, setPeriod] = useState<periodsType>(defaultPeriod);
  const [protocolsToShow, setProtocolsToShow] = useState<protocolType[]>([]);
  const { pair } = useParams();
  const start = moment
    .utc()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .subtract(Periods[period], 'days')
    .format('X');

  const end = moment.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('X');
  const { loading, errorMessage, data } = useHistoricalData(pair as string, '', start, end);
  const {
    colors: { red },
    chartColors: {
      chartPink,
      chartAddBlue,
      chartOrange,
      chartGreen,
      chartPurple,
      chartRed,
      chartAddGreen,
      chartAddOrange,
      chartDarkBlue,
      chartDarkYellow,
      chartYellow,
    },
  } = useTheme();
  const colors = [
    chartPink,
    chartAddBlue,
    chartOrange,
    chartGreen,
    chartPurple,
    chartRed,
    chartAddGreen,
    chartAddOrange,
    chartDarkBlue,
    chartDarkYellow,
    chartYellow,
  ];

  const poolName = (pair || '').replaceAll('-', ' / ');

  const onChangePeriod = (nextPeriod: periodsType) => (): void => setPeriod(nextPeriod);

  const onSelectProtocol = (poolId: string) => (): void =>
    setProtocolsToShow(prev => {
      const _prev = [...prev];
      const index = _prev.findIndex(el => el.poolId === poolId);
      if (index !== -1) {
        _prev[index].is_active = !_prev[index].is_active;
      }

      return _prev;
    });

  const renderProtocols = (): JSX.Element[] =>
    protocolsToShow.map(
      ({ protocol, protocolDisplay, poolId, network, is_active, color }, index: number) => (
        <Block key={protocol + index + poolId} w="calc(25% - 15px)" m="0 0 20px">
          <ProtocolSelector
            {...{
              protocol,
              protocolDisplay,
              network,
              is_active,
              color,
              onClick: onSelectProtocol(poolId),
            }}
          />
        </Block>
      )
    );

  useEffect(() => {
    setProtocolsToShow(
      data.map(({ protocol, protocolDisplay, poolId, network }, index) => ({
        protocol,
        protocolDisplay,
        poolId,
        network,
        color:
          colors[index] ||
          '#000000'.replace(/0/g, function () {
            return (~~(Math.random() * 16)).toString(16);
          }),
        is_active: true,
      }))
    ); // eslint-disable-next-line
  }, [data]);

  const ableToCompare: boolean = protocolsToShow.length > 1;

  if (loading) return <ComparePoolsSkeleton />;

  return (
    <Fragment>
      {ableToCompare ? <H3 m="40px 0 24px">Compare Pools</H3> : <Block h="40px" />}
      {errorMessage ? (
        <SubTitle color={red}>{errorMessage}</SubTitle>
      ) : (
        <Fragment>
          <Card m="0 0 40px" p="25px 30px 35px" w="100%">
            {ableToCompare ? (
              <Column w="100%" m="0 0 12px">
                <SubTitle m="0 0 22px">Select protocols to compare</SubTitle>
                <Row w="100%" flexWrap="wrap" justify="space-between">
                  {renderProtocols()}
                  <Block w="calc(25% - 15px)" />
                  <Block w="calc(25% - 15px)" />
                  <Block w="calc(25% - 15px)" />
                </Row>
              </Column>
            ) : null}
            <Column w="100%">
              <SubTitle m="0 0 22px">Selected Period</SubTitle>
              <Grid
                w="100%"
                colGap="20px"
                rowGap="20px"
                colTemplate="repeat(4, 116px)"
                rowTemplate="auto"
              >
                <PeriodButton is_active={period === 'WEEK'} onClick={onChangePeriod('WEEK')}>
                  Week
                </PeriodButton>
                <PeriodButton is_active={period === 'MONTH'} onClick={onChangePeriod('MONTH')}>
                  Month
                </PeriodButton>
                <PeriodButton is_active={period === 'ALL'} onClick={onChangePeriod('ALL')}>
                  All
                </PeriodButton>
              </Grid>
            </Column>
          </Card>
          <Block w="100%" m="0 0 20px">
            <LineChart
              {...{
                protocolsToShow,
                data,
                start,
                days: Periods[period],
                title: 'Pools APY',
                subTitle: 'HistoricPool APY',
                kpiKey: 'apy',
                withSwitcher: true,
                isPercentageValue: true,
              }}
            />
          </Block>
          <Row flexWrap="wrap" align="stretch">
            <Block w="calc(50% - 10px)" m="0 0 20px">
              <LineChart
                {...{
                  protocolsToShow,
                  data,
                  start,
                  days: Periods[period],
                  title: 'Base APY',
                  subTitle: poolName,
                  kpiKey: 'apyBase',
                  isPercentageValue: true,
                }}
              />
            </Block>
            <Block w="calc(50% - 10px)" m="0 0 20px">
              <LineChart
                {...{
                  protocolsToShow,
                  data,
                  start,
                  days: Periods[period],
                  title: 'Reward APY',
                  subTitle: poolName,
                  kpiKey: 'apyFarm',
                  isPercentageValue: true,
                }}
              />
            </Block>
            <Block w="calc(50% - 10px)">
              <LineChart
                {...{
                  protocolsToShow,
                  data,
                  start,
                  days: Periods[period],
                  title: 'Daily Fees',
                  subTitle: poolName,
                  kpiKey: 'rewards',
                  isPercentageValue: false,
                }}
              />
            </Block>
            <Block w="calc(50% - 10px)">
              <LineChart
                {...{
                  protocolsToShow,
                  data,
                  start,
                  days: Periods[period],
                  title: 'TVL',
                  subTitle: poolName,
                  kpiKey: 'tvl',
                  isPercentageValue: false,
                }}
              />
            </Block>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
});
