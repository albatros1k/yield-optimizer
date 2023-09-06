import { memo, Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { IPairDetailsResponse } from '../../../features/data/entities/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';

import { SubTitle } from '../../../shared/ui/Typography';

import { GeneralMetrics } from './GeneralMetrics';
import { ProtocolsInfo } from './ProtocolsInfo';

import { MetricsAndProtocolsSkeleton } from './skeleton';

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
  const pairName = (pair || '').replaceAll('-', ' / ');

  useEffect(() => {
    MerlinApi.getPairDetails(pair as string).then(pairDetails => {
      if (typeof pairDetails === 'object') {
        setState(prev => ({ ...prev, loading: false, pairDetails }));
      } else setState(prev => ({ ...prev, loading: false, errorMessage: pairDetails }));
    });
  }, [pair]);

  if (errorMessage)
    return (
      <SubTitle m="0 0 40px" color={theme.colors.red}>
        {errorMessage}
      </SubTitle>
    );

  if (loading) return <MetricsAndProtocolsSkeleton />;

  return (
    <Fragment>
      <GeneralMetrics {...{ pairName, avgMetrics, tokenIds: data[0]?.tokenIds || [] }} />
      {data.length ? <ProtocolsInfo {...{ pair, data }} /> : null}
    </Fragment>
  );
});
