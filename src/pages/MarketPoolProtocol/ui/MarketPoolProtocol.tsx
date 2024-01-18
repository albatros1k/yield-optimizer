import { memo, Fragment, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Block, Row } from '../../../shared/ui/Containers';
import { BackBlock } from '../../../shared/ui/BackBlock';
import { Spacer } from '../../../shared/ui/Spacer';

import { Twitter } from '../../../new-features/Share/Twitter';

import { PoolInfo } from './PoolInfo';
import { PoolAnalytics } from './PoolAnalitics';
import { IPoolProtocolPreview } from '../../../features/data/entities/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';
import { definePlus } from '../../../helpers/merlinHelpers';
import { SkeletonContent } from '../../../shared/ui/Skeleton';

export interface PoolData {
  loading: boolean;
  errorMessage: string;
  data: IPoolProtocolPreview | null;
}

const MarketPoolProtocol = memo(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pair, poolId } = useParams();

  const [pool, setPool] = useState<PoolData>({
    loading: true,
    errorMessage: '',
    data: null,
  });

  const poolName = (pair || '').replaceAll('-', ' / ');

  const onBack = (): void => navigate(state ? `/market` : `/market/pool/${pair}`);

  useEffect(() => {
    MerlinApi.getPairProtocolDetails(pair as string, poolId as string).then(data => {
      if (typeof data === 'object') setPool({ loading: false, errorMessage: '', data });
      else setPool({ loading: false, errorMessage: data, data: null });
    });
  }, [pair, poolId]);

  if (!pair || !poolId) return <Navigate to={`/market`} />;

  return (
    <Fragment>
      <Block h="32px" />
      <Row w="100%" justify="space-between" align="center">
        <BackBlock
          backText={`${poolName} Pool Analytics`}
          onBack={onBack}
          childrenComponent={
            pool.loading ? (
              <SkeletonContent h="30px" w="180px" />
            ) : (
              <Twitter
                size={16}
                title={`Check out this ${pair} pool on #${pool.data.protocol.toUpperCase()}
24 hr APY ${definePlus(pool.data.apy, false, 1, 'percent')}
30days APY ${definePlus(pool.data.apyMean30, false, 1, 'percent')}
`}
              />
            )
          }
        />
      </Row>
      <Spacer />
      <PoolInfo {...pool} />
      <Block h="40px" />
      <PoolAnalytics />
      <Block h="40px" />
    </Fragment>
  );
});

export default MarketPoolProtocol;
