import { FC, memo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { IPoolProtocolPreview, kpiKey } from '../../../features/data/entities/market';
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
import { OrderEnum } from '../../../shared/types';
import { SortLabel } from '../../../shared/ui/SortLabel';

interface ProtocolsInfoProps {
  data: IPoolProtocolPreview[];
}

export const ProtocolsInfo: FC<ProtocolsInfoProps> = memo(({ data }) => {
  const { state } = useLocation();
  const { pair } = useParams();

  const defineColor = useColor();
  const navigate = useNavigate();
  const protocolsMap = useAppSelector(selectProtocolNameMap);
  const [sortKey, setSortKey] = useState<kpiKey>('apy');
  const [orderDirection, setOrderDirection] = useState<`${OrderEnum}`>(OrderEnum.DESC);

  const is_asc: boolean = orderDirection === OrderEnum.DESC;

  const onSort = (nextKpiKey: kpiKey) => (): void => {
    setOrderDirection(
      nextKpiKey === sortKey
        ? orderDirection === OrderEnum.ASC
          ? OrderEnum.DESC
          : OrderEnum.ASC
        : orderDirection
    );
    setSortKey(nextKpiKey);
  };

  const onNavigateToPool = (pair: string, poolId: string) => (): void =>
    navigate(`/market/pool/${pair}/${poolId}`, { state });

  const renderProtocols = (): JSX.Element[] => {
    return [...data]
      .sort((a, b) =>
        orderDirection === OrderEnum.DESC ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
      )
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
              <Row justify="flex-start" flexWrap="wrap">
                <SubTitle dotted={true} maxW="calc(100% - 20px)">
                  Protocol
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
                info="Base APY + Reward APY. For non-autocompounding pools, reinvesting is not accounted which means APY = APR."
              />
            </th>
            <th>
              <SortLabel
                title="Base APY"
                is_active={sortKey === 'apyBase'}
                is_asc={is_asc}
                cb={onSort('apyBase')}
                info="Annualised percentage yield from trading fees (incentives are excluded). We are considering 24h fees and scaling to a year."
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
                info="Total reserves (in USD) of a specific pair and protocol in one day."
              />
            </th>
          </tr>
        </thead>
        <tbody>{renderProtocols()}</tbody>
      </Table>
    </Card>
  );
});
