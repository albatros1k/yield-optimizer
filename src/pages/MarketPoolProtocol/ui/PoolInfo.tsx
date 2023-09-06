import { memo, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';

import { IPoolProtocolPreview } from '../../../features/data/entities/market';
import { selectMarket } from '../../../features/data/selectors/market';
import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';

import { useAppSelector } from '../../../store';
import { useColor } from '../../../helpers/hooks';
import { definePlus, onImageError, parseProtocol } from '../../../helpers/merlinHelpers';

import { awsLink } from '../../../shared/lib/aws';
import { Line } from '../../../shared/ui/Spacer';
import { H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Card, Column, Row } from '../../../shared/ui/Containers';
import { CircleImage, MultipleTokenIcons } from '../../../shared/ui/Images';

import { PoolInfoSkeleton } from './skeleton';

export const PoolInfo = memo(() => {
  const { pair, poolId } = useParams();
  const { colors } = useTheme();
  const defineColor = useColor();
  const [{ loading, errorMessage, data }, setState] = useState<{
    loading: boolean;
    errorMessage: string;
    data: IPoolProtocolPreview | null;
  }>({
    loading: true,
    errorMessage: '',
    data: null,
  });

  const {
    supportedNetworks: { nameMap: networksMap },
    supportedProtocols: { nameMap: protocolsMap },
  } = useAppSelector(selectMarket);
  const poolName = (pair || '').replaceAll('-', ' / ');

  useEffect(() => {
    MerlinApi.getPairProtocolDetails(pair as string, poolId as string).then(data => {
      if (typeof data === 'object') setState({ loading: false, errorMessage: '', data });
      else setState({ loading: false, errorMessage: data, data: null });
    });
  }, [pair, poolId]);

  if (errorMessage) return <SubTitle color={colors.red}>{errorMessage}</SubTitle>;

  if (loading) return <PoolInfoSkeleton />;

  if (data) {
    const {
      tokenIds,
      protocol,
      protocolDisplay,
      network,
      apy,
      apyMean30,
      apyBase,
      apyFarm,
      rewards,
      tvl,
    } = data;

    return (
      <Card w="100%">
        <Row p="25px 30px 30px">
          <Column w="calc(30% - 10px)">
            <SubTitle dotted={true} m="0 0 23px">
              Pool
            </SubTitle>
            <Row align="center" justify="flex-start">
              <MultipleTokenIcons addresses={tokenIds} size={24} />
              <H3 m="0 0 0 20px">{poolName}</H3>
            </Row>
          </Column>
          <Column w="calc(30% - 10px)">
            <SubTitle dotted={true} m="0 0 23px">
              Protocol
            </SubTitle>
            <Row align="center" justify="flex-start">
              <CircleImage
                src={`${awsLink}/protocol-icons/${protocolsMap[protocol]}.png`}
                alt={protocol}
                onError={onImageError}
                w="24px"
                h="24px"
              />
              <H3 m="0 0 0 8px">{parseProtocol(protocolDisplay)}</H3>
            </Row>
          </Column>
          <Column w="calc(40% - 10px)">
            <SubTitle dotted={true} m="0 0 23px">
              Chain
            </SubTitle>
            <Row align="center" justify="flex-start">
              <CircleImage
                w="24px"
                h="24px"
                src={`${awsLink}/chain-icons/${networksMap[network]}.png`}
                onError={onImageError}
                alt={network}
              />
              <H3 m="0 0 0 8px">{network}</H3>
            </Row>
          </Column>
        </Row>
        <Line />
        <Row p="25px 30px 30px" w="100%">
          <Row w="calc(30% - 10px)" justify="flex-start">
            <Column m="0 28px 0 0">
              <SubTitle dotted={true} m="0 0 16px">
                APY
              </SubTitle>
              <Main color={defineColor(apy)}>{definePlus(apy, false, 1, 'percent')}</Main>
            </Column>
            <Column>
              <SubTitle dotted={true} m="0 0 16px">
                APY (30d)
              </SubTitle>
              <Main color={defineColor(apyMean30)}>
                {definePlus(apyMean30, false, 1, 'percent')}%
              </Main>
            </Column>
          </Row>
          <Column w="calc(30% - 10px)">
            <SubTitle dotted={true} m="0 0 16px">
              Base APY
            </SubTitle>
            <Main color={defineColor(apyBase)}>{definePlus(apyBase, false, 1, 'percent')}</Main>
          </Column>
          <Row w="calc(40% - 10px)" justify="flex-start">
            <Column m="0 28px 0 0">
              <SubTitle dotted={true} m="0 0 16px">
                Reward APY
              </SubTitle>
              <Main color={defineColor(apyFarm)}>{definePlus(apyFarm, false, 1, 'percent')}</Main>
            </Column>
            <Column m="0 28px 0 0">
              <SubTitle dotted={true} m="0 0 16px">
                Daily Fess
              </SubTitle>
              <Main color={rewards ? colors.textColor : colors.alterText}>
                {definePlus(rewards, true)}
              </Main>
            </Column>
            <Column>
              <SubTitle dotted={true} m="0 0 16px">
                TVL
              </SubTitle>
              <Main color={tvl ? colors.textColor : colors.alterText}>{definePlus(tvl, true)}</Main>
            </Column>
          </Row>
        </Row>
      </Card>
    );
  }

  return null;
});
