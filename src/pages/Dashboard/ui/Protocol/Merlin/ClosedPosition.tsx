import { memo } from 'react';

import { Main } from '../../../../../shared/ui/Typography';
import { MultipleTokenIcons, TokenIcon } from '../../../../../shared/ui/Images';
import { GridItem, PositionGrid, Row } from '../../../../../shared/ui/Containers';

import {
  ITokenOverview,
  IUserTokenProtocolOverview,
} from '../../../../../features/data/apis/merlin/types/overview';
import { selectMerlinInfo } from '../../../../../features/data/selectors/merlin';

import { useAppSelector } from '../../../../../store';
import { gridColumnPattern } from '../../../lib/const';

import { useColor } from '../../../../../helpers/hooks';
import { definePlus } from '../../../../../helpers/merlinHelpers';

interface ClosedPositionProps {
  pos: ITokenOverview;
  protocolName: string;
  moduleName: string;
}

export const ClosedPosition = memo<ClosedPositionProps>(
  ({
    pos: { tokenAddress, underlyingTokens, userTokenProtocolOverviews },
    protocolName,
    moduleName,
  }) => {
    const { addressMap, poolInfo } = useAppSelector(selectMerlinInfo);
    const defineColor = useColor();

    const currentPoolInfo = poolInfo.find(({ protocol }) =>
      protocol.includes(`${protocolName}__${moduleName}`)
    );

    const { supplied, borrowed } = currentPoolInfo || { supplied: [], borrowed: [] };
    const activePositions = [...supplied, ...borrowed].filter(
      ({ address }) => address === tokenAddress
    );

    const activeYieldUsd = activePositions.reduce<number>(
      (total, { yieldUSD }) => (total += yieldUSD),
      0
    );
    const activePnlUsd = activePositions.reduce<number>(
      (total, { pnlUSD }) => (total += pnlUSD),
      0
    );

    const isLP: boolean = underlyingTokens?.length > 1;

    const lpNames: string = underlyingTokens
      .map(address => {
        const { symbol } = addressMap[address] || { symbol: 'Unknown' };
        return symbol;
      })
      .join(', ');

    const calcTotal = (
      key: keyof Pick<IUserTokenProtocolOverview, 'pnlUSD' | 'yieldUSD' | 'txFeeUSD'>
    ): number =>
      userTokenProtocolOverviews.reduce<number>((total, over) => (total += over[key]), 0);

    //New logic with excluding active from historical
    const totalYieldUSD = calcTotal('yieldUSD') - activeYieldUsd;
    const totalPnlUSD = calcTotal('pnlUSD') - activePnlUsd;

    return (
      <PositionGrid
        rowGap="0"
        colGap="2%"
        rowTemplate="auto"
        colTemplate={gridColumnPattern}
        p="22px 24px"
      >
        <Row align="center">
          {isLP ? (
            <MultipleTokenIcons addresses={underlyingTokens} size={24} />
          ) : (
            <TokenIcon address={underlyingTokens[0] || tokenAddress} w="24px" h="24px" />
          )}
          <Main maxW="100%" m="0 0 0 14px">
            {isLP ? lpNames : addressMap[underlyingTokens[0] || tokenAddress]?.symbol}
          </Main>
        </Row>
        <GridItem colStart={2} colEnd={4}>
          <Main dotted w="100%">
            {definePlus(calcTotal('txFeeUSD'), false)}
          </Main>
        </GridItem>
        <Main dotted color={defineColor(totalPnlUSD)}>
          {definePlus(totalPnlUSD)}
        </Main>
        <Main dotted color={defineColor(totalYieldUSD)}>
          {definePlus(totalYieldUSD)}
        </Main>
      </PositionGrid>
    );
  }
);
