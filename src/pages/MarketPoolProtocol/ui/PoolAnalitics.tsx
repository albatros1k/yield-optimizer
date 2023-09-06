import { Fragment, useState, useEffect, memo } from 'react';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Periods, periodsType, protocolType } from '../../Market/types/period';
import { defaultPeriod } from '../../Market/lib/consts';
import { useHistoricalData } from '../../MarketPool/lib/hooks';
import { PeriodButton } from '../../MarketPool/ui/styled';
import { LineChart } from '../../MarketPool/ui/LineChart';

import { PoolAnalyticsSkeleton } from './skeleton';

import { SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Column, Grid, Row } from '../../../shared/ui/Containers';

export const PoolAnalytics = memo(() => {
  const [period, setPeriod] = useState<periodsType>(defaultPeriod);
  const [protocolsToShow, setProtocolsToShow] = useState<protocolType[]>([]);
  const { pair, poolId } = useParams();
  const start = moment
    .utc()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .subtract(Periods[period], 'days')
    .format('X');
  const end = moment.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('X');
  const { loading, data, errorMessage, pricesExist } = useHistoricalData(
    pair as string,
    poolId as string,
    start,
    end
  );
  const {
    colors: { red },
    chartColors: { chartAddBlue },
  } = useTheme();

  const poolName = (pair || '').replaceAll('-', ' / ');

  const onChangePeriod = (nextPeriod: periodsType) => (): void => setPeriod(nextPeriod);

  useEffect(() => {
    setProtocolsToShow(
      data.map(({ protocol, protocolDisplay, poolId, network }) => ({
        protocol,
        protocolDisplay,
        poolId,
        network,
        color: chartAddBlue,
        is_active: true,
      }))
    ); // eslint-disable-next-line
  }, [data]);

  if (loading) return <PoolAnalyticsSkeleton />;

  return (
    <Fragment>
      {errorMessage ? (
        <SubTitle color={red}>{errorMessage}</SubTitle>
      ) : (
        <Fragment key={poolId as string}>
          <Card m="0 0 40px" p="25px 30px 30px" w="100%">
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
          <Row flexWrap="wrap">
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
                  isPercentageValue: true,
                  isSingleProtocol: true,
                }}
              />
            </Block>
            <Block w="calc(50% - 10px)" m={pricesExist ? '0 0 20px' : '0'}>
              {pricesExist ? (
                <LineChart
                  {...{
                    protocolsToShow,
                    data,
                    start,
                    days: Periods[period],
                    title: 'Pool Historic Prices',
                    subTitle: poolName,
                    kpiKey: 'poolPrice',
                    isSingleProtocol: true,
                    isNoValueSymbol: true,
                  }}
                />
              ) : null}
            </Block>
            <Block w={pricesExist ? 'calc(50% - 10px)' : '100%'} m="0 0 20px">
              <LineChart
                {...{
                  protocolsToShow,
                  data,
                  start,
                  days: Periods[period],
                  title: 'Daily Fees',
                  subTitle: poolName,
                  kpiKey: 'rewards',
                  isSingleProtocol: true,
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
                  title: 'Volume',
                  subTitle: poolName,
                  kpiKey: 'volume',
                  isSingleProtocol: true,
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
                  isSingleProtocol: true,
                }}
              />
            </Block>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
});
