import { memo, Fragment } from 'react';
import { useTheme } from 'styled-components';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Block, Row, SvgContainer } from '../../../shared/ui/Containers';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';

import { MetricsAndProtocols } from './MetricsAndProtocols';
import { ComparePools } from './ComparePools';
import { DropDown } from '../../../shared/ui/DropDown';
import { tvlFilterMap } from '../../Market/ui/TrendingPools';

export const TVL_PARAM = 'tvl';

const MarketPool = memo(() => {
  const navigate = useNavigate();
  const { pair } = useParams();
  const poolName = (pair || '').replaceAll('-', ' / ');
  const { colors } = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const tvlFilter = searchParams.get(TVL_PARAM) || '1000000';

  const onChangeParams = (tvl: string) => {
    setSearchParams({ [TVL_PARAM]: tvl });
  };

  const onBack = (): void => {
    navigate(`/market`);
  };

  if (!pair) return <Navigate to={`/market`} />;

  return (
    <Fragment>
      <Block h="32px" />
      <Row m="0 0 40px" align="center" justify="space-between" w="100%">
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
        <Block w="325px">
          <DropDown
            valuesMap={tvlFilterMap}
            value={tvlFilter}
            onChange={onChangeParams}
            label="TVL Filter"
            labelPrefix="TVL : "
            fullWidth={true}
            h={42}
          />
        </Block>
      </Row>
      <MetricsAndProtocols />
      <ComparePools />
      <Block h="40px" />
    </Fragment>
  );
});

export default MarketPool;
