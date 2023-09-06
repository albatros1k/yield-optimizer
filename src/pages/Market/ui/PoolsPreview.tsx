import { FC, Fragment, memo, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';

import { OrderEnum } from '../../../shared/types';
import { Button } from '../../../shared/ui/Buttons';
import { InfoTooltip } from '../../../shared/ui/Tooltip';
import { SortLabel } from '../../../shared/ui/SortLabel';
import { H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Row } from '../../../shared/ui/Containers';

import { kpiKey } from '../../../features/data/entities/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';
import { selectSupportedLoading } from '../../../features/data/selectors/market';

import { queryString } from '../lib/consts';
import { PoolsPreviewState } from '../types/poolPreview';
import { numberWithCommas } from '../../../helpers/merlinHelpers';

import { PoolsPreviewSkellet } from './Skeleton';
import { PoolsPreviewRow } from './PoolsPreviewRow';
import { Table } from './styled';
import { useAppSelector } from '../../../store';

export const PoolsPreview = memo(() => {
  const loaded = useAppSelector(selectSupportedLoading);
  const [
    {
      data,
      loading,
      errorMessage,
      query,
      query: { sort, sortKey },
      totalElements,
    },
    setState,
  ] = useState<PoolsPreviewState>({
    loading: true,
    errorMessage: '',
    data: [],
    totalElements: 0,
    query: {
      page: 1,
      size: 10,
      sort: 'DESC',
      sortKey: 'tvl',
    },
  });

  const { colors } = useTheme();

  const navigate = useNavigate();

  const is_asc: boolean = query.sort === OrderEnum.DESC;

  const onSort = (val: kpiKey) => (): void => {
    const nextSort = sortKey === val ? (sort === 'ASC' ? 'DESC' : 'ASC') : sort;
    setState(prev => ({ ...prev, query: { ...query, sort: nextSort, sortKey: val } }));
  };

  const renderPools = (): JSX.Element[] =>
    data.map(pool => (
      <PoolsPreviewRow
        key={`${pool.tokenIds?.join('-')}-${pool.name}`}
        {...{ pool, sourcePage: 'MAIN_PAGE' }}
      />
    ));

  const onNavigateToPools = (): void =>
    navigate({
      pathname: `/market/pools`,
      search: `?${queryString}`,
    });

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }));
    MerlinApi.getPools(query).then(result => {
      if (typeof result === 'object') {
        const { data, totalElements } = result;
        setState(prev => ({ ...prev, data, totalElements, loading: false }));
      } else {
        setState(prev => ({ ...prev, loading: false, errorMessage: result }));
      }
    });
  }, [query]);

  return (
    <Fragment>
      <H3 m="40px 0 32px">
        All {totalElements ? numberWithCommas(totalElements) : null} Liquidity Pools
      </H3>
      {errorMessage ? (
        <SubTitle color={colors.red}>{errorMessage}</SubTitle>
      ) : loading || !loaded ? (
        <PoolsPreviewSkellet />
      ) : (
        <Card w="100%">
          <Table>
            <TableHead {...{ sortKey, is_asc, onSort }} />
            <tbody>{renderPools()}</tbody>
          </Table>
          <Button
            m="30px auto"
            onClick={onNavigateToPools}
            w="200px"
            h="36px"
            bg="transparent"
            borderColor={colors.alterHelp}
          >
            Show more
          </Button>
        </Card>
      )}
      <Block h="40px" />
    </Fragment>
  );
});

interface TableHeadProps {
  sortKey: string;
  is_asc: boolean;
  onSort: (val: kpiKey) => () => void;
}

//To use on several pages
export const TableHead: FC<TableHeadProps> = ({ sortKey, is_asc, onSort }) => {
  const { colors } = useTheme();

  return (
    <thead>
      <tr>
        <th>
          <SubTitle color={colors.alterText}>Pool</SubTitle>
        </th>
        <th>
          <Row justify="flex-start" flexWrap="wrap" align="center">
            <SubTitle dotted={true} maxW="calc(100% - 20px)" color={colors.alterText}>
              Protocols
            </SubTitle>
            <InfoTooltip
              text="Protocol considered in the analysis of a specific pool"
              id="Protocols"
            />
          </Row>
        </th>
        <th>
          <SortLabel
            title="APY"
            is_active={sortKey === 'apy'}
            is_asc={is_asc}
            cb={onSort('apy')}
            info="Base APY + Reward APY. For non-autocompounding pools, reinvesting is not accounted which means APY = APR. We pick the top between supported protocols for a specific pair."
          />
        </th>
        <th>
          <SortLabel
            title="Base APY"
            is_active={sortKey === 'apyBase'}
            is_asc={is_asc}
            cb={onSort('apyBase')}
            info="Annualised percentage yield from trading fees (incentives are excluded). We are considering 24h fees and scaling to a year. We pick the top between supported protocols for a specific pair."
          />
        </th>
        <th>
          <SortLabel
            title="Reward APY"
            is_active={sortKey === 'apyFarm'}
            is_asc={is_asc}
            cb={onSort('apyFarm')}
            info="Annualised percentage yield from incentives ( trading fees are excluded). We pick the top between supported protocols for a specific pair."
          />
        </th>
        <th>
          <SortLabel
            title="APY (30d)"
            is_active={sortKey === 'apyMean30'}
            is_asc={is_asc}
            cb={onSort('apyMean30')}
            info="APY average considering the last 30 days. We pick the top between supported protocols for a specific pair."
          />
        </th>
        <th>
          <SortLabel
            title="Daily Fees"
            is_active={sortKey === 'rewards'}
            is_asc={is_asc}
            cb={onSort('rewards')}
            info="Trading fees + incentives (in USD) generated by the specific pair considering all supported protocols together in one day."
          />
        </th>
        <th colSpan={2}>
          <SortLabel
            title="TVL"
            is_active={sortKey === 'tvl'}
            is_asc={is_asc}
            cb={onSort('tvl')}
            info="Total reserves (in USD) of a specific pair considering all supported protocols together in one day."
          />
        </th>
      </tr>
    </thead>
  );
};
