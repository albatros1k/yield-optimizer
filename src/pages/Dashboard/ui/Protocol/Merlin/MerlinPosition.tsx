/* eslint-disable no-extra-boolean-cast */
import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import {
  IActivePosition,
  ISupplyBorrowReward,
} from '../../../../../features/data/apis/merlin/types/poolInfo';
import { selectMerlinInfo } from '../../../../../features/data/selectors/merlin';

import { useAppSelector } from '../../../../../store';

import { Column, PositionGrid, Row } from '../../../../../shared/ui/Containers';
import { MultipleTokenIcons, TokenIcon } from '../../../../../shared/ui/Images';
import { Main, SubTitle } from '../../../../../shared/ui/Typography';
import { Button } from '../../../../../shared/ui/Buttons';

import { definePlus } from '../../../../../helpers/merlinHelpers';
import { useColor } from '../../../../../helpers/hooks';

import { gridColumnPattern } from '../../../lib/const';

interface MerlinPositionProps {
  position: ISupplyBorrowReward;
  currentActivePositions?: IActivePosition[];
  protocol: string;
}

export const MerlinPosition: FC<MerlinPositionProps> = memo(
  ({ position: pos, currentActivePositions, protocol }) => {
    const {
      symbol,
      address,
      value,
      valueUSD,
      valuesByLPToken,
      protocolTokenAddress,
      pnlUSD,
      yieldUSD,
    } = pos;
    const { poolInfo } = useAppSelector(selectMerlinInfo);
    const {
      colors: { textColor, alterText, subAccentMain },
    } = useTheme();
    const defineColor = useColor();

    const { uniswapPooldata } = poolInfo?.find(pd => pd.protocol === protocol) || {
      uniswapPooldata: [],
    };
    const { maxPrice, minPrice, feeTier } =
      uniswapPooldata?.find(({ position }) => position === protocolTokenAddress) || {};

    const isLP: boolean = valuesByLPToken.length > 0;
    const lpAddresses: string[] = valuesByLPToken.map(({ address }) => address);
    const lpNames: string = valuesByLPToken.map(({ symbol }) => symbol).join(', ');

    const calcActive = (key: keyof IActivePosition): number =>
      currentActivePositions?.reduce<number>((total, pos) => (total += Number(pos[key])), 0) || 0;

    const renderLPBalances = (): JSX.Element[] =>
      valuesByLPToken.map(({ symbol, value }, index) => (
        <Main key={symbol + index} dotted={true} w="100%">{`${definePlus(
          value,
          false
        )} ${symbol}`}</Main>
      ));

    const totalYield: number = calcActive('yieldUSD') + yieldUSD;
    const totalPNL: number = calcActive('pnlUsd') + pnlUSD;

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
            <MultipleTokenIcons addresses={lpAddresses} size={24} />
          ) : (
            <TokenIcon w="24px" h="24px" address={address} />
          )}
          <Column w="100%" overflowHidden m="0 0 0 14px">
            <Row m="0 0 3px" w="100%" overflowHidden>
              <Main dotted>{isLP ? lpNames : symbol}</Main>
              {Boolean(feeTier) ? (
                <Main dotted m="0 0 0 3px">{`(${Number(feeTier)}%)`}</Main>
              ) : null}
            </Row>
            {minPrice || maxPrice ? (
              <SubTitle>
                Range:{' '}
                {`${Number(minPrice).toFixed(2) || '-'} – ${Number(maxPrice).toFixed(2) || '-'}`}
              </SubTitle>
            ) : null}
          </Column>
        </Row>
        <Column w="100%" overflowHidden>
          {isLP ? renderLPBalances() : <Main dotted={true}>{definePlus(value, false)}</Main>}
        </Column>
        <div />
        <Main dotted color={defineColor(totalPNL)}>
          {definePlus(totalPNL)}
        </Main>
        <Main dotted color={defineColor(totalYield)}>
          {definePlus(totalYield)}
        </Main>
        <Main color={alterText} dotted>
          —
        </Main>
        <Main dotted color={valueUSD ? textColor : alterText}>
          {definePlus(valueUSD, false)}
        </Main>
        <Row justify="flex-end">
          <Button bg="transparent" h="28px" w="150px" borderColor={subAccentMain}>
            Manage
          </Button>
        </Row>
      </PositionGrid>
    );
  }
);
