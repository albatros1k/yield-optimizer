import { memo, Fragment } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Block } from '../../../shared/ui/Containers';
import { BackBlock } from '../../../shared/ui/BackBlock';

import { PoolInfo } from './PoolInfo';
import { PoolAnalytics } from './PoolAnalitics';

const MarketPoolProtocol = memo(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pair, poolId } = useParams();

  const poolName = (pair || '').replaceAll('-', ' / ');

  const onBack = (): void => navigate(`/market/pool/${pair}`, { state });

  if (!pair || !poolId) return <Navigate to={`/market`} />;

  return (
    <Fragment>
      <Block h="32px" />
      <BackBlock backText={`${poolName} Pool Analytics`} onBack={onBack} />
      <PoolInfo />
      <Block h="40px" />
      <PoolAnalytics />
      <Block h="40px" />
    </Fragment>
  );
});

export default MarketPoolProtocol;
