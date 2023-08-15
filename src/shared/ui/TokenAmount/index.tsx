import { memo } from 'react';
import type { BigNumber } from 'bignumber.js';

import { formatFullBigNumber } from '../../../helpers/format';
import { SubTitle } from '../Typography';
import { useAppSelector } from '../../../store';
import { TokenEntity } from '../../../features/data/entities/token';
import { selectTokenPriceByAddress } from '../../../features/data/selectors/tokens';

export type TokenAmountProps = {
  amount: BigNumber;
  decimals: number;
  price: BigNumber;
  minShortPlaces?: number;
};
export const TokenAmount = memo<TokenAmountProps>(({ amount, decimals }) => {
  const fullAmount = formatFullBigNumber(amount, decimals);

  return <SubTitle>{fullAmount}</SubTitle>;
});

export type TokenAmountFromEntityProps = {
  amount: BigNumber;
  token: TokenEntity;
  minShortPlaces?: number;
};
export const TokenAmountFromEntity = memo<TokenAmountFromEntityProps>(
  ({ amount, token, minShortPlaces = 2 }) => {
    const price = useAppSelector(state =>
      selectTokenPriceByAddress(state, token.chainId, token.address)
    );
    return (
      <TokenAmount
        amount={amount}
        decimals={token.decimals}
        price={price}
        minShortPlaces={minShortPlaces}
      />
    );
  }
);
