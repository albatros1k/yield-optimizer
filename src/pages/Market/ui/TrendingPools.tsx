import { memo, Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from 'styled-components';

import { awsLink } from '../../../shared/lib/aws';
import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { Line, VerticalLine } from '../../../shared/ui/Spacer';
import { DropDown } from '../../../shared/ui/DropDown';
import { H3, Main, SubTitle, Tag } from '../../../shared/ui/Typography';
import { CircleImage, MultipleTokenIcons } from '../../../shared/ui/Images';
import { Block, Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { trendType } from '../../../features/data/entities/market';
import { getTrendingPools } from '../../../features/data/actions/market';
import { selectProtocolNameMap, selectTendingPools } from '../../../features/data/selectors/market';

import { useAppDispatch, useAppSelector } from '../../../store';

import { useColor } from '../../../helpers/hooks';
import { definePlus, onImageError } from '../../../helpers/merlinHelpers';

import { TypeButton } from './styled';
import { TrendingSkeleton } from './Skeleton';

export const tvlFilterMap: Record<string, string> = {
  '0': 'All Pools',
  '100000': '> 100K',
  '1000000': '> 1M',
  '10000000': '> 10M',
} as const;

export const TrendingPools = memo(() => {
  const [bestType, setBestType] = useState<trendType>('All');
  const [tvlFilter, setTvlFilter] = useState<keyof typeof tvlFilterMap>('1000000');

  const { isLoaded, errorMessage, data, loading } = useAppSelector(selectTendingPools);
  const protocolsMap = useAppSelector(selectProtocolNameMap);
  const dispatch = useAppDispatch();

  const { colors } = useTheme();
  const defineColor = useColor();
  const navigate = useNavigate();

  const pools = data[bestType];

  const onChangeBestType =
    (nextType: trendType): (() => void) =>
    (): void =>
      setBestType(nextType);

  const onNavigateToPool = (poolName: string, poolId: string) => (): void =>
    navigate(`/market/pool/${poolName}/${poolId}`);

  useEffect(() => {
    dispatch(getTrendingPools({ tvl: tvlFilter }));
  }, [dispatch, tvlFilter]);

  const renderTrending = (): JSX.Element[] => {
    return pools.slice(2, 7).map(p => {
      const { poolId, name, protocol, network, tokenIds, apy, tvl, rewards } = p;
      return (
        <Card key={poolId} h="269px" w="calc(20% - 16px)" p="18px 20px 0">
          <MultipleTokenIcons addresses={tokenIds} size={24} />
          <Main m="14px 0 6px" w="100%" dotted={true}>
            {name.replaceAll('-', '/')}
          </Main>
          <Row m="0 0 18px" justify="flex-start" align="center" w="100%">
            <CircleImage
              src={`${awsLink}/protocol-icons/${protocolsMap[protocol]}.png`}
              alt={protocol}
              onError={onImageError}
              w="12px"
              h="12px"
              m="0 5px 0 0"
            />
            <SubTitle dotted={true} w="calc(100% - 17px)">
              {protocol} ({network})
            </SubTitle>
          </Row>
          <Line />
          <Row h="37px" align="center" w="100%" justify="space-between">
            <SubTitle dotted={true}>APY</SubTitle>
            <SubTitle dotted={true} color={defineColor(apy)}>
              {definePlus(apy, true, 2, 'percent')}
            </SubTitle>
          </Row>
          <Line />
          <Row h="37px" align="center" w="100%" justify="space-between">
            <SubTitle dotted={true}>TVL</SubTitle>
            <SubTitle>{definePlus(tvl, false)}</SubTitle>
          </Row>
          <Line />
          <Row h="37px" align="center" w="100%" justify="space-between">
            <SubTitle dotted={true}>Daily Fees</SubTitle>
            <SubTitle>{definePlus(rewards, false)}</SubTitle>
          </Row>
          <Line />
          <Row
            h="37px"
            w="100%"
            align="center"
            pointer={true}
            onClick={onNavigateToPool(name, poolId)}
          >
            <SubTitle
              color={colors.subAccentMain}
              pointer={true}
              dotted={true}
              w="calc(100% - 20px)"
            >
              Pool Details
            </SubTitle>
            <SvgContainer tf="rotate(-90deg)" stroke={colors.subAccentMain}>
              {icons.arrow}
            </SvgContainer>
          </Row>
        </Card>
      );
    });
  };

  const renderBestPools = () => {
    return pools.slice(0, 2).map((p, index) => {
      const { poolId, name, protocol, network, tokenIds, apy, apyBase, apyFarm, tvl, rewards } = p;

      return (
        <Card key={poolId} h="266px" w="calc(50% - 10px)">
          <Row h="100%" w="100%">
            <Column w="220px" h="100%" p="18px 20px 0" justify="flex-start">
              <Row m="0 0 12px" w="100%" align="center">
                <MultipleTokenIcons addresses={tokenIds} size={32} />
                {!index ? (
                  <Button w="40px" h="20px">
                    <Tag>Best</Tag>
                  </Button>
                ) : null}
              </Row>
              <Main m="0 0 8px" w="100%" dotted={true}>
                {name.replaceAll('-', '/')}
              </Main>
              <Row justify="flex-start" align="center" w="100%">
                <CircleImage
                  src={`${awsLink}/protocol-icons/${protocolsMap[protocol]}.png`}
                  alt={protocol}
                  onError={onImageError}
                  w="12px"
                  h="12px"
                  m="0 5px 0 0"
                />
                <SubTitle dotted={true} w="calc(100% - 17px)">
                  {protocol} ({network})
                </SubTitle>
              </Row>
              <Row
                m="auto 0 0"
                h="52px"
                w="100%"
                align="center"
                pointer={true}
                onClick={onNavigateToPool(name, poolId)}
              >
                <SubTitle
                  color={colors.subAccentMain}
                  pointer={true}
                  dotted={true}
                  w="calc(100% - 20px)"
                >
                  Pool Details
                </SubTitle>
                <SvgContainer tf="rotate(-90deg)" stroke={colors.subAccentMain}>
                  {icons.arrow}
                </SvgContainer>
              </Row>
            </Column>
            <VerticalLine />
            <Column w="calc(100% - 210px)" h="100%" p="0 20px" justify="flex-start">
              <Row h="52px" align="center" w="100%" justify="space-between">
                <SubTitle dotted={true}>APY</SubTitle>
                <SubTitle dotted={true} color={defineColor(apy)}>
                  {definePlus(apy, false, 2, 'percent')}
                </SubTitle>
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%" justify="space-between">
                <SubTitle dotted={true}>Base APY</SubTitle>
                <SubTitle color={defineColor(apyBase)}>
                  {definePlus(apyBase, false, 2, 'percent')}
                </SubTitle>
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%" justify="space-between">
                <SubTitle dotted={true}>Reward APY</SubTitle>
                <SubTitle color={defineColor(apyFarm)}>
                  {definePlus(apyFarm, false, 2, 'percent')}
                </SubTitle>
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%" justify="space-between">
                <SubTitle dotted={true}>Daily Fees</SubTitle>
                <SubTitle>{definePlus(rewards, false)}</SubTitle>
              </Row>
              <Line />
              <Row h="52px" align="center" w="100%" justify="space-between">
                <SubTitle dotted={true}>TVL</SubTitle>
                <SubTitle>{definePlus(tvl, false)}</SubTitle>
              </Row>
            </Column>
          </Row>
        </Card>
      );
    });
  };

  return (
    <Fragment>
      <Block h="32px" />
      <Row m="0 0 32px" justify="space-between" w="100%">
        <H3>Best Liquidity Pool Performers</H3>
        <Block w="325px">
          <DropDown
            valuesMap={tvlFilterMap}
            value={tvlFilter}
            onChange={setTvlFilter}
            label="TVL Filter"
            labelPrefix="TVL : "
            fullWidth={true}
            h={42}
          />
        </Block>
      </Row>
      {errorMessage ? (
        <SubTitle color={colors.red}>{errorMessage}</SubTitle>
      ) : !isLoaded || loading ? (
        <TrendingSkeleton />
      ) : (
        <Fragment>
          <Row flexWrap="wrap" w="100%" m="0 0 20px" justify="space-between">
            {data.All.length ? (
              <TypeButton
                pointer={true}
                isActive={bestType === 'All'}
                onClick={onChangeBestType('All')}
                h="50px"
                w="calc(20% - 16px)"
                p="0 20px"
              >
                <Row align="center" w="100%" h="100%">
                  <Main dotted={true}>All pools</Main>
                </Row>
              </TypeButton>
            ) : null}
            {data['Stable Pools'].length ? (
              <TypeButton
                pointer={true}
                isActive={bestType === 'Stable Pools'}
                onClick={onChangeBestType('Stable Pools')}
                h="50px"
                w="calc(20% - 16px)"
                p="0 20px"
              >
                <Row align="center" w="100%" h="100%">
                  <Main dotted={true}>Stablecoin Pools</Main>
                </Row>
              </TypeButton>
            ) : null}
            {data['ETH Pools'].length ? (
              <TypeButton
                pointer={true}
                isActive={bestType === 'ETH Pools'}
                onClick={onChangeBestType('ETH Pools')}
                h="50px"
                w="calc(20% - 16px)"
                p="0 20px"
              >
                <Row align="center" w="100%" h="100%">
                  <Main dotted={true}>Ethereum pair</Main>
                </Row>
              </TypeButton>
            ) : null}
            <Block w="calc(20% - 16px)" />
            <Block w="calc(20% - 16px)" />
            <Block w="calc(20% - 16px)" />
            <Block w="calc(20% - 16px)" />
          </Row>
          {pools.length ? (
            <Row flexWrap="wrap" w="100%" h="266px" m="0 0 20px" justify="space-between">
              {renderBestPools()}
              <Block w="calc(50% - 10px)" />
            </Row>
          ) : null}
          {pools.length > 2 ? (
            <Row flexWrap="wrap" w="100%" h="269px" justify="space-between">
              {renderTrending()}
              <Block w="calc(20% - 16px)" />
              <Block w="calc(20% - 16px)" />
              <Block w="calc(20% - 16px)" />
              <Block w="calc(20% - 16px)" />
            </Row>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
});
