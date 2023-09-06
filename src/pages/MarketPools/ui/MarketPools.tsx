import {
  memo,
  Fragment,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { kpiKey } from '../../../features/data/entities/market';
import { selectMarket } from '../../../features/data/selectors/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';

import { ISelectedItem, IState } from '../types';
import { useAppSelector } from '../../../store';
import { numberWithCommas } from '../../../helpers/merlinHelpers';

import { Table } from '../../Market/ui/styled';
import { TableHead } from '../../Market/ui/PoolsPreview';
import { PoolsPreviewRow } from '../../Market/ui/PoolsPreviewRow';
import { allValuesKey, initialSearchParams, kpiParams, size } from '../../Market/lib/consts';

import { OrderEnum } from '../../../shared/types';
import { BackBlock } from '../../../shared/ui/BackBlock';
import { Block, Card, Grid } from '../../../shared/ui/Containers';

import { Skeleton } from './Skelleton';
import { PaginatorRow } from './styled';
import { PageError } from '../../../shared/ui/PageError';
import { SkeletonContent } from '../../../shared/ui/Skeleton';
import { NoInfo } from '../../../shared/ui/NoInfo';
import { TextField } from '../../../shared/ui/TextField';
import { ChainsProtocolsSelector } from '../../../shared/ui/DropDown';

const MarketPools = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, sortKey, sort, protocols, networks, keyword } = Object.fromEntries(
    searchParams.entries()
  );

  const [{ data, loading, errorMessage, totalElements, totalPages }, setState] = useState<IState>({
    loading: true,
    errorMessage: '',
    data: [],
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  });

  const {
    supportedNetworks: { loaded: networksLoaded, nameMap: networksNamesMap },
    supportedProtocols: { loaded: protocolsLoaded, nameMap: protocolsNamesMap },
  } = useAppSelector(selectMarket);
  const [inputValue, setInputValue] = useState<string>(decodeURIComponent(keyword || ''));
  const navigate = useNavigate();
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const is_asc: boolean = sort === 'DESC';
  const additionalRows = size - data.length;

  const onBack = (): void => navigate(`/market`);

  const onPageChange = ({ selected }: ISelectedItem) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams.entries()),
      page: String(selected + 1),
    }));
  };

  const onKeyWordsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const checkKey = (key: string, value: string) => (prevParams: URLSearchParams) => {
    const _prev = Object.fromEntries(prevParams.entries());
    if (value) _prev[key] = value;
    else delete _prev[key];
    return { ..._prev, page: '1' };
  };

  const onSearchByKeywords = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setSearchParams(checkKey('keyword', encodeURIComponent(inputValue.replace('/', '-').trim())));
    }
  };

  const onProtocolChange = (nextVal: string[]) => {
    setSearchParams(
      checkKey('protocols', !nextVal.length ? '' : encodeURIComponent(nextVal.join(',')))
    );
  };

  const onNetworksChange = (nextVal: string[]) => {
    setSearchParams(
      checkKey('networks', !nextVal.length ? '' : encodeURIComponent(nextVal.join(',')))
    );
  };

  const onResetFilters = (): void => {
    setSearchParams(initialSearchParams);
    setInputValue('');
  };

  const onResetError = () => {
    setState(prev => ({ ...prev, errorMessage: '', loading: true }));
    onResetFilters();
  };

  const onSort = (val: kpiKey) => (): void => {
    setSearchParams(prevParams => {
      const { sortKey, sort } = Object.fromEntries(prevParams.entries());
      const nextSort = sortKey === val ? (sort === 'ASC' ? 'DESC' : 'ASC') : sort;
      return {
        ...Object.fromEntries(prevParams.entries()),
        sort: nextSort,
        sortKey: val,
        page: '1',
      };
    });
  };

  const renderPools = (): JSX.Element[] =>
    data.map(pool => (
      <PoolsPreviewRow
        key={`${pool.tokenIds?.join('-')}-${pool.name}`}
        {...{ pool, sourcePage: 'POOLS' }}
      />
    ));

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

  // watch search params
  useEffect(() => {
    const { sort, sortKey, page, keyword, networks, protocols } = Object.fromEntries(
      searchParams.entries()
    );
    //check if params not exist or not valid
    if (
      !sort ||
      !sortKey ||
      !page ||
      !kpiParams.includes(sortKey as kpiKey) ||
      isNaN(+page) ||
      !(sort in OrderEnum)
    ) {
      setSearchParams(initialSearchParams);
    } else {
      setState(prev => ({ ...prev, totalElements: 0, totalPages: 0, loading: true }));
      MerlinApi.getPools({
        size,
        sort,
        sortKey,
        page,
        keyword: keyword ? decodeURIComponent(keyword) : null,
        networks: networks ? decodeURIComponent(networks) : null,
        protocols: protocols ? decodeURIComponent(protocols) : null,
      }).then(result => {
        if (typeof result === 'object') {
          const { data, totalPages, totalElements, last, first } = result;
          setState(prev => ({
            ...prev,
            data,
            totalPages,
            totalElements,
            last,
            first,
            loading: false,
          }));
        } else {
          setState(prev => ({ ...prev, loading: false, errorMessage: result }));
        }
      });
    }
    //scroll to top
    if (contentBlockRef && contentBlockRef.current) {
      try {
        contentBlockRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchParams, setSearchParams]);

  return (
    <Block ref={contentBlockRef} w="100%">
      {errorMessage ? (
        <PageError {...{ errorMessage, onResetError }} />
      ) : (
        <Fragment>
          <BackBlock
            backText={`  ${totalElements ? numberWithCommas(totalElements) : ''} Liquidity Pools`}
            onBack={onBack}
          />
          <Block h="32px" />

          <Grid
            w="100%"
            h="50px"
            m="0 0 20px"
            colGap="20px"
            rowGap="auto"
            colTemplate="1fr repeat(2, 210px)"
            rowTemplate="auto"
          >
            <TextField
              disabled={loading}
              iconSize={14}
              pattern="/*+/g"
              w="100%"
              placeholder="Search By Asset"
              value={inputValue}
              onChange={onKeyWordsChange}
              onKeyDown={onSearchByKeywords}
              inputHeight={50}
            />
            {networksLoaded ? (
              <ChainsProtocolsSelector
                disabled={loading}
                label="Chains"
                valuesMap={networksMap}
                value={networks ? decodeURIComponent(networks).split(',') : []}
                onChange={onNetworksChange}
                isProtocols={false}
                allValuesSpecificKey={'All Chains'}
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
                value={protocols ? decodeURIComponent(protocols).split(',') : []}
                onChange={onProtocolChange}
                isProtocols={true}
                allValuesSpecificKey={'All Protocols'}
              />
            ) : (
              <Card h="50px" p="15px 20px">
                <SkeletonContent h="100%" />
              </Card>
            )}
          </Grid>
          {loading ? (
            <Skeleton />
          ) : (
            <Fragment key="content">
              {data.length ? (
                <Fragment>
                  <Card>
                    <Table>
                      <TableHead {...{ sortKey, is_asc, onSort }} />
                      <tbody>
                        {renderPools()}
                        {additionalRows
                          ? Array.from(Array(additionalRows).keys()).map(() => (
                              <tr className="unvisible" key={Math.random()}></tr>
                            ))
                          : null}
                      </tbody>
                    </Table>
                  </Card>
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
                </Fragment>
              ) : (
                <NoInfo
                  heading="No Pools Found"
                  description="There are no pools by selected filters. Please try other filters or clear them."
                />
              )}
            </Fragment>
          )}
          <Block h="40px" />
        </Fragment>
      )}
    </Block>
  );
});

export default MarketPools;
