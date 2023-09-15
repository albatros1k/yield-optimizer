import {
  ChangeEvent,
  FC,
  Fragment,
  KeyboardEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'styled-components';
import ReactPaginate from 'react-paginate';

import { OrderEnum } from '../../../shared/types';

import { InfoTooltip } from '../../../shared/ui/Tooltip';
import { SortLabel } from '../../../shared/ui/SortLabel';
import { H3, SubTitle } from '../../../shared/ui/Typography';
import { Block, Card, Grid, Row } from '../../../shared/ui/Containers';

import { kpiKey } from '../../../features/data/entities/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';
import { selectMarket, selectSupportedLoading } from '../../../features/data/selectors/market';

import { allValuesKey } from '../lib/consts';
import { PoolsPreviewState } from '../types/poolPreview';
import { numberWithCommas } from '../../../helpers/merlinHelpers';

import { PoolsSkeleton } from './Skeleton';
import { PoolsPreviewRow } from './PoolsPreviewRow';
import { PaginatorRow, Table } from './styled';
import { useAppSelector } from '../../../store';
import { clearEmptyKeys } from '../lib/helpers';
import { TextField } from '../../../shared/ui/TextField';
import { ChainsProtocolsSelector } from '../../../shared/ui/DropDown';
import { SkeletonContent } from '../../../shared/ui/Skeleton';
import { NoInfo } from '../../../shared/ui/NoInfo';
import { ISelectedItem } from '../types';

export const PoolsPreview = memo(() => {
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const {
    supportedNetworks: { loaded: networksLoaded, nameMap: networksNamesMap },
    supportedProtocols: { loaded: protocolsLoaded, nameMap: protocolsNamesMap },
  } = useAppSelector(selectMarket);
  const loaded = useAppSelector(selectSupportedLoading);
  const [
    {
      data,
      loading,
      errorMessage,
      query,
      query: { sort, sortKey, networks, protocols, page },
      totalElements,
      totalPages,
    },
    setState,
  ] = useState<PoolsPreviewState>({
    loading: true,
    errorMessage: '',
    data: [],
    totalElements: 0,
    totalPages: 0,
    query: {
      page: 1,
      size: 10,
      sort: 'DESC',
      sortKey: 'tvl',
      keyword: '',
      networks: '',
      protocols: '',
    },
  });

  const [inputValue, setInputValue] = useState<string>('');

  const { colors } = useTheme();

  const networksMap = useMemo(() => {
    if (networksLoaded) {
      const res: { [key: string]: string } = {
        [allValuesKey]: 'All Chains',
        ...networksNamesMap,
      };
      return res;
    }
    return {};
  }, [networksNamesMap, networksLoaded]);

  const protocolsMap = useMemo(() => {
    if (protocolsLoaded) {
      const res: { [key: string]: string } = {
        [allValuesKey]: 'All Protocols',
        ...protocolsNamesMap,
      };
      return res;
    }
    return {};
  }, [protocolsNamesMap, protocolsLoaded]);

  const is_asc: boolean = query.sort === OrderEnum.DESC;

  const onSort = (val: kpiKey) => (): void => {
    const nextSort = sortKey === val ? (sort === 'ASC' ? 'DESC' : 'ASC') : sort;
    setState(prev => ({ ...prev, query: { ...query, sort: nextSort, sortKey: val, page: 1 } }));
  };

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const onSearchByKeywords = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setState(prev => ({
        ...prev,
        query: { ...query, keyword: inputValue.replace('/', '-').trim(), page: 1 },
      }));
    }
  };

  const onNetworksChange = (nextVal: string[]) => {
    setState(prev => ({ ...prev, query: { ...query, networks: nextVal.join(','), page: 1 } }));
  };

  const onProtocolsChange = (nextVal: string[]) => {
    setState(prev => ({ ...prev, query: { ...query, protocols: nextVal.join(','), page: 1 } }));
  };

  const renderPools = (): JSX.Element[] =>
    data.map(pool => (
      <PoolsPreviewRow key={`${pool.tokenIds?.join('-')}-${pool.name}`} {...{ pool }} />
    ));

  const onPageChange = ({ selected }: ISelectedItem) => {
    setState(prev => ({ ...prev, query: { ...query, page: selected + 1 } }));

    if (contentBlockRef && contentBlockRef.current) {
      try {
        contentBlockRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }));
    MerlinApi.getPools(clearEmptyKeys(query)).then(result => {
      if (typeof result === 'object') {
        const { data, totalElements, totalPages } = result;
        setState(prev => ({
          ...prev,
          data,
          totalElements,
          totalPages,
          loading: false,
          errorMessage: '',
        }));
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
      <Grid
        w="100%"
        h="50px"
        m="0 0 20px"
        colGap="20px"
        rowGap="auto"
        colTemplate="1fr repeat(2, 210px)"
        rowTemplate="auto"
        ref={contentBlockRef}
      >
        <TextField
          disabled={loading}
          iconSize={14}
          pattern=".*"
          w="100%"
          placeholder="Search By Asset"
          value={inputValue}
          onChange={onInputValueChange}
          onKeyDown={onSearchByKeywords}
          inputHeight={50}
        />
        {networksLoaded ? (
          <ChainsProtocolsSelector
            disabled={loading}
            label="Chains"
            valuesMap={networksMap}
            value={networks ? networks.split(',') : []}
            onChange={onNetworksChange}
            isProtocols={false}
            allValuesSpecificKey="All Chains"
          />
        ) : (
          <Card h="50px" p="15px 20px">
            <SkeletonContent h="100%" />
          </Card>
        )}
        {protocolsLoaded ? (
          <ChainsProtocolsSelector
            disabled={loading}
            label="Protocols"
            valuesMap={protocolsMap}
            value={protocols ? protocols.split(',') : []}
            onChange={onProtocolsChange}
            isProtocols={true}
            allValuesSpecificKey="All Protocols"
          />
        ) : (
          <Card h="50px" p="15px 20px">
            <SkeletonContent h="100%" />
          </Card>
        )}
      </Grid>
      {errorMessage ? (
        <SubTitle color={colors.red}>{errorMessage}</SubTitle>
      ) : loading || !loaded ? (
        <PoolsSkeleton />
      ) : data.length ? (
        <Card w="100%">
          <Table>
            <TableHead {...{ sortKey, is_asc, onSort }} />
            <tbody>{renderPools()}</tbody>
          </Table>
          {totalPages > 1 ? (
            <PaginatorRow m="25px auto 40px" justify="center" w="100%" p="0 30px">
              <ReactPaginate
                {...{
                  breakLabel: '...',
                  nextLabel: '>',
                  forcePage: +page - 1,
                  onPageChange,
                  pageRangeDisplayed: 1,
                  pageCount: totalPages,
                  previousLabel: '<',
                  className: 'paginator',
                }}
              />
            </PaginatorRow>
          ) : null}
        </Card>
      ) : (
        <NoInfo
          heading="No Pools Found"
          description="There are no pools by selected filters. Please try other filters or clear them."
        />
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
