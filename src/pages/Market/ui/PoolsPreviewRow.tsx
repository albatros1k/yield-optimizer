import { memo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';

import { icons } from '../../../shared/Icons';
import { CircleImage } from '../../../shared/ui/Images';
import { Main, Tag } from '../../../shared/ui/Typography';
import { Block, Circle, Row, SvgContainer } from '../../../shared/ui/Containers';

import { IPoolPreview } from '../../../features/data/entities/market';
import { selectProtocolNameMap } from '../../../features/data/selectors/market';

import { useColor } from '../../../helpers/hooks';
import { definePlus, onImageError } from '../../../helpers/merlinHelpers';

import { useAppSelector } from '../../../store';
import { sourcePage } from '../types/poolPreview';
import { TooltipCell } from '../../../widgets/TooltipCell';
import { awsLink } from '../../../shared/lib/aws';

interface PoolsPreviewRowProps {
  pool: IPoolPreview;
  sourcePage: sourcePage;
}

export const PoolsPreviewRow = memo<PoolsPreviewRowProps>(
  ({
    pool: {
      name,
      tokenIds,
      protocols,
      apy,
      apyBase,
      apyFarm,
      tvl,
      tvlIncrease24H,
      rewards,
      rewardsIncrease24H,
      apyMean30,
    },
    sourcePage,
  }) => {
    const {
      colors: { alterText, subAccentMain },
    } = useTheme();

    const navigate = useNavigate();
    const defineColor = useColor();
    const protocolsNameMap = useAppSelector(selectProtocolNameMap);

    const onNavigateToPool = (): void =>
      navigate(`/market/pool/${name}`, { state: { sourcePage } });

    const iconSize = 20;

    const renderProtocols = (): (JSX.Element | null)[] => {
      return Array.from(protocols).map((protocol, index: number) => {
        if (index > 4) return null;
        return (
          <Block key={protocol + index} pos="relative" m={index ? '0 0 0 -8px' : '0'} p="3px 0 0">
            <CircleImage
              src={`${awsLink}/protocol-icons/${protocolsNameMap[protocol]}.png`}
              alt={protocol}
              onError={onImageError}
              w={`${iconSize}px`}
              h={`${iconSize}px`}
            />
          </Block>
        );
      });
    };

    const renderCurrencies = (): JSX.Element[] => {
      return tokenIds.map((address, index: number) => (
        <Block key={address + index} pos="relative" m={index ? '0 0 0 -8px' : '0'} p="3px 0 0">
          <CircleImage
            src={`${awsLink}/token-icons-small/${address}.png`}
            alt={address}
            onError={onImageError}
            w={`${iconSize}px`}
            h={`${iconSize}px`}
          />
        </Block>
      ));
    };

    return (
      <tr onClick={onNavigateToPool}>
        <td>
          <Row justify="flex-start" align="center">
            {renderCurrencies()}
            <Main m="0 0 0 12px" dotted={true} maxW="150px">
              {name.replaceAll('-', '/')}
            </Main>
          </Row>
        </td>
        <td>
          <Row justify="flex-start" align="center">
            {renderProtocols()}
            {protocols.length > 5 ? (
              <Circle
                bg={subAccentMain}
                w={`${iconSize}px`}
                h={`${iconSize}px`}
                m="0 0 0 -8px"
                style={{ zIndex: 1 }}
                align="center"
                justify="center"
              >
                <Tag>+{protocols.length - 5}</Tag>
              </Circle>
            ) : null}
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
          <Main color={defineColor(apyMean30)}>{definePlus(apyMean30, false, 2, 'percent')}</Main>
        </td>
        <td>
          <TooltipCell
            {...{
              heading: name,
              index: 0,
              id: 'fees',
              value: rewards,
              value24HIncreased: rewardsIncrease24H,
              valueName: 'Fees',
            }}
          />
        </td>
        <td>
          <TooltipCell
            {...{
              heading: name,
              index: 2,
              id: 'reserves',
              value: tvl,
              value24HIncreased: tvlIncrease24H,
              valueName: 'TVL',
            }}
          />
        </td>
        <td>
          <SvgContainer size={20} color={alterText} tf="rotate(-90deg)">
            {icons.arrow}
          </SvgContainer>
        </td>
      </tr>
    );
  }
);
