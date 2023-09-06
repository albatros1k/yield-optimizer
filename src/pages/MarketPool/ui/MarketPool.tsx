import { memo, Fragment } from 'react';
import { useTheme } from 'styled-components';

import {
  Navigate,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { Block, Row, SvgContainer } from '../../../shared/ui/Containers';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';

import { initialSearchParams } from '../../Market/lib/consts';
import { MetricsAndProtocols } from './MetricsAndProtocols';
import { ComparePools } from './ComparePools';

const MarketPool = memo(() => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pair } = useParams();
  const poolName = (pair || '').replaceAll('-', ' / ');
  const { colors } = useTheme();

  const onBack = (): void => {
    if (state?.sourcePage === 'POOLS') {
      navigate({
        pathname: `/market/pools`,
        search: `?${createSearchParams(initialSearchParams)}`,
      });
    } else {
      navigate(`/market`);
    }
  };

  if (!pair) return <Navigate to={`/market`} />;

  return (
    <Fragment>
      <Block h="32px" />
      <Row m="0 0 40px" align="center" justify="flex-start">
        <Row w="100%" align="center">
          <Button
            borderColor={colors.alterText}
            bg="transparent"
            h="28px"
            p="0 17px"
            color={colors.alterText}
            m="0 20px 0 0"
            onClick={onBack}
          >
            <SvgContainer size={10} m="0 6px 0 0">
              {icons.backarrow}
            </SvgContainer>
            {poolName} Pool Analytics
          </Button>
        </Row>
      </Row>
      <MetricsAndProtocols />
      <ComparePools />
      <Block h="40px" />
    </Fragment>
  );
});

export default MarketPool;
