import { memo, Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';

import { getSupportedNetworksAndProtocols } from '../../../features/data/actions/protocols-networks';
import { selectSupportedLoading } from '../../../features/data/selectors/market';

import { PoolsPreview } from './PoolsPreview';
import { TrendingPools } from './TrendingPools';

const Market = memo(() => {
  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectSupportedLoading);

  useEffect(() => {
    if (!loaded) dispatch(getSupportedNetworksAndProtocols());
  }, [dispatch, loaded]);

  return (
    <Fragment>
      <TrendingPools />
      <PoolsPreview />
    </Fragment>
  );
});

export default Market;
