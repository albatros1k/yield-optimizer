import { FC, memo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { IPoolProtocolPreview } from '../../../features/data/entities/market';
import { selectProtocolNameMap } from '../../../features/data/selectors/market';

import { useAppSelector } from '../../../store';
import { useColor } from '../../../helpers/hooks';
import { definePlus, onImageError, parseProtocol } from '../../../helpers/merlinHelpers';

import { icons } from '../../../shared/Icons';
import { awsLink } from '../../../shared/lib/aws';
import { InfoTooltip } from '../../../shared/ui/Tooltip';
import { CircleImage } from '../../../shared/ui/Images';
import { Main, SubTitle } from '../../../shared/ui/Typography';
import { Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { TooltipCell } from '../../../widgets/TooltipCell';
import { Table } from '../../Market/ui/styled';

interface ProtocolsInfoProps {
  data: IPoolProtocolPreview[];
}

export const ProtocolsInfo: FC<ProtocolsInfoProps> = memo(({ data }) => {
  const { state } = useLocation();
  const { pair } = useParams();

  const defineColor = useColor();
  const navigate = useNavigate();
  const protocolsMap = useAppSelector(selectProtocolNameMap);

  const onNavigateToPool = (pair: string, poolId: string) => (): void =>
    navigate(`/market/pool/${pair}/${poolId}`, { state });

  const renderProtocols = (): JSX.Element[] => {
    return [...data]
      .sort((a, b) => b.apy - a.apy)
      .map(
        (
          {
            poolId,
            protocol,
            protocolDisplay,
            network,
            apy,
            apyBase,
            apyFarm,
            apyMean30,
            rewards,
            rewardsIncrease24H,
            tvl,
            tvlIncrease24H,
          },
          index: number
        ) => {
          return (
            <tr
              key={poolId + protocolDisplay + index}
              onClick={onNavigateToPool(pair as string, poolId)}
            >
              <td>
                <Row justify="flex-start" align="center">
                  <CircleImage
                    src={`${awsLink}/protocol-icons/${protocolsMap[protocol]}.png`}
                    alt={protocol}
                    onError={onImageError}
                    w="32px"
                    h="32px"
                  />
                  <Column m="0 0 0 12px" w="calc(100% - 44px)">
                    <Row w="100%" align="center" justify="flex-start" m="0 0 3px">
                      <Main dotted={true}>{parseProtocol(protocolDisplay)}</Main>
                    </Row>
                    <SubTitle>{network}</SubTitle>
                  </Column>
                </Row>
              </td>
              <td>
                <Main color={defineColor(apy)}>{definePlus(apy, false, 2, 'percent')}</Main>
              </td>
              <td>
                <Main color={defineColor(apyBase)}>{definePlus(apyBase, false, 2, 'percent')}</Main>
              </td>
              <td>
                <Main color={defineColor(apyFarm)}>{definePlus(apyFarm, false, 2, 'percent')}</Main>
              </td>
              <td>
                <Main color={defineColor(apyMean30)}>
                  {definePlus(apyMean30, false, 2, 'percent')}
                </Main>
              </td>
              <td>
                <TooltipCell
                  {...{
                    heading: parseProtocol(protocolDisplay),
                    id: 'fees',
                    index,
                    value: rewards,
                    value24HIncreased: rewardsIncrease24H,
                    valueName: 'Fees',
                  }}
                />
              </td>
              <td>
                <TooltipCell
                  {...{
                    heading: parseProtocol(protocolDisplay),
                    id: 'tvl',
                    index,
                    value: tvl,
                    value24HIncreased: tvlIncrease24H,
                    valueName: 'TVL',
                  }}
                />
              </td>
              <td>
                <SvgContainer tf="rotate(-90deg)">{icons.arrow}</SvgContainer>
              </td>
            </tr>
          );
        }
      );
  };

  return (
    <Card w="100%">
      <Table>
        <thead>
          <tr>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  Protocol
                </SubTitle>
                <InfoTooltip
                  text={'Protocol considered in the analysis of a specific pool'}
                  id="Protocols"
                />
              </Row>
            </th>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  APY
                </SubTitle>
                <InfoTooltip
                  text={
                    'Base APY + Reward APY. For non-autocompounding pools, reinvesting is not accounted which means APY = APR.'
                  }
                  id="apy"
                />
              </Row>
            </th>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  Base APY
                </SubTitle>
                <InfoTooltip
                  text={
                    'Annualised percentage yield from trading fees (incentives are excluded). We are considering 24h fees and scaling to a year.'
                  }
                  id="apyBase"
                />
              </Row>
            </th>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  Reward APY
                </SubTitle>
                <InfoTooltip
                  text={
                    'Annualised percentage yield from incentives ( trading fees are excluded). We pick the top between supported protocols for a specific pair.'
                  }
                  id="apyFarm"
                />
              </Row>
            </th>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  APY (30d)
                </SubTitle>
                <InfoTooltip
                  text={
                    'APY average considering the last 30 days. We pick the top between supported protocols for a specific pair.'
                  }
                  id="apyMean30"
                />
              </Row>
            </th>
            <th>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  Daily Fees
                </SubTitle>
                <InfoTooltip
                  text={
                    'Trading fees + incentives (in USD) generated by the specific pair considering all supported protocols together in one day.'
                  }
                  id="Volume"
                />
              </Row>
            </th>
            <th colSpan={2}>
              <Row justify="flex-start" flexWrap="wrap" align="center">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  TVL
                </SubTitle>
                <InfoTooltip
                  text={'Total reserves (in USD) of a specific pair and protocol in one day.'}
                  id="Liquidity"
                />
              </Row>
            </th>
          </tr>
        </thead>
        <tbody>{renderProtocols()}</tbody>
      </Table>
    </Card>
  );
});
