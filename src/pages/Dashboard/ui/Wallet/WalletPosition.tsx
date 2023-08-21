import { memo, useMemo } from 'react';

import { Main } from '../../../../shared/ui/Typography';
import { PositionGrid, Row } from '../../../../shared/ui/Containers';
import { TokenIcon } from '../../../../shared/ui/Images';

import { IUserBalance } from '../../../../features/data/reducers/merlin';
import { WalletPositionIndicators } from '../../types';

import { gridColumnPattern } from '../../lib/const';

import { definePlus } from '../../../../helpers/merlinHelpers';
import { useColor } from '../../../../helpers/hooks';

interface WalletPositionProps {
  position: IUserBalance;
}

export const WalletPosition = memo<WalletPositionProps>(({ position }) => {
  const { token_address, symbol, balance, decimals, current, priceChange24h } = position;

  const defineColor = useColor();

  const { tokenBalance, fiatBalance, priceChangePercent } =
    useMemo<WalletPositionIndicators>(() => {
      const tokenBalance: number = Number(balance) / Math.pow(10, decimals);
      const fiatBalance: number = tokenBalance * Number(current);
      const priceChangePercent: number = (Number(priceChange24h) / Number(current)) * 100;
      return { tokenBalance, fiatBalance, priceChangePercent };
    }, [balance, current, decimals, priceChange24h]);

  return (
    <PositionGrid
      rowGap="0"
      colGap="2%"
      rowTemplate="auto"
      colTemplate={gridColumnPattern}
      p="22px 24px"
    >
      <Row align="center">
        <TokenIcon w="24px" h="24px" address={token_address} m="0 14px 0 0" />
        <Main dotted>{symbol}</Main>
      </Row>
      <Main dotted>{definePlus(tokenBalance, false)}</Main>
      <Main dotted>{definePlus(Number(current), false)}</Main>
      <Main dotted color={defineColor(Number(priceChange24h))}>
        {isNaN(priceChangePercent) || !priceChangePercent
          ? '-'
          : `${priceChangePercent.toFixed(2)}%`}
      </Main>
      <div />
      <div />
      <Main dotted={true}>{definePlus(fiatBalance, false)}</Main>
    </PositionGrid>
  );
});
