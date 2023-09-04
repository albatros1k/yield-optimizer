import { memo, Fragment, useEffect } from 'react';

import { PoolsPreview } from './PoolsPreview';
import { useAppDispatch, useAppSelector } from '../../../store';

import { getSupportedNetworksAndProtocols } from '../../../features/data/actions/protocols-networks';
import { selectSupportedLoading } from '../../../features/data/selectors/market';

const Market = memo(() => {
  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectSupportedLoading);

  useEffect(() => {
    if (!loaded) dispatch(getSupportedNetworksAndProtocols());
  }, [dispatch, loaded]);

  if (!loaded) return <>Loading...</>;
  return (
    <Fragment>
      <PoolsPreview />
    </Fragment>
  );
});

export default Market;
