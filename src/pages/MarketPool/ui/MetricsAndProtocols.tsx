import { memo, Fragment, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { IPairDetailsResponse } from '../../../features/data/entities/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';

import { SubTitle } from '../../../shared/ui/Typography';

import { GeneralMetrics } from './GeneralMetrics';
import { ProtocolsInfo } from './ProtocolsInfo';

import { MetricsAndProtocolsSkeleton } from './skeleton';
import { TVL_PARAM } from './MarketPool';

export const MetricsAndProtocols = memo(() => {
  const theme = useTheme();
  const { pair } = useParams();
  const [
    {
      loading,
      errorMessage,
      pairDetails: { avgMetrics, data },
    },
    setState,
  ] = useState<{ loading: boolean; errorMessage: string; pairDetails: IPairDetailsResponse }>({
    loading: true,
    errorMessage: '',
    pairDetails: {
      avgMetrics: { apy: 0, apyBase: 0, apyFarm: 0, apyMean30: 0 },
      data: [],
    },
  });
  const [searchParams] = useSearchParams();
  const tvlFilter = Number(searchParams.get(TVL_PARAM)) > 0 ? searchParams.get(TVL_PARAM) : null;

  const pairName = (pair || '').replaceAll('-', ' / ');

  const getData = (_pair: string, _tvlFilter: string | null, signal: AbortSignal) => {
    setState(prev => ({ ...prev, loading: true }));
    MerlinApi.getPairDetails(_pair, _tvlFilter, signal).then(res => {
      if (typeof res === 'object') {
        setState(prev => ({ ...prev, loading: false, errorMessage: '', pairDetails: res }));
      } else {
        if (res !== 'canceled') setState(prev => ({ ...prev, loading: false, errorMessage: res }));
      }
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    getData(pair as string, tvlFilter, controller.signal);

    return (): void => controller.abort();
  }, [pair, tvlFilter]);

  if (loading) return <MetricsAndProtocolsSkeleton />;

  if (errorMessage)
    return (
      <SubTitle m="0 0 40px" color={theme.colors.red}>
        {errorMessage}
      </SubTitle>
    );

  return (
    <Fragment>
      <GeneralMetrics {...{ pairName, avgMetrics, tokenIds: data[0]?.tokenIds || [] }} />
      {data.length ? <ProtocolsInfo {...{ pair, data }} /> : null}
    </Fragment>
  );
});
