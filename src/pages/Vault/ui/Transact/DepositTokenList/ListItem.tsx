import { memo, useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { TokenEntity } from '../../../../../features/data/entities/token';
import { ChainEntity } from '../../../../../features/data/entities/chain';

import { Row } from '../../../../../shared/ui/Containers';
import { Main } from '../../../../../shared/ui/Typography';

import { ListJoin } from '../../../../../components/ListJoin';
import { TokensImage } from '../../../../../components/TokenImage/TokenImage';

import { formatBigDecimals } from '../../../../../helpers/format';
import { ListItemContainer } from './styled';

export type ListItemProps = {
  tokenId: string;
  tokens: TokenEntity[];
  balance?: BigNumber;
  chainId: ChainEntity['id'];
  onSelect: (id: string) => void;
};

export const ListItem = memo<ListItemProps>(({ tokenId, tokens, balance, onSelect }) => {
  const handleClick = useCallback(() => onSelect(tokenId), [onSelect, tokenId]);

  const tokenSymbols = useMemo(() => tokens.map(token => token.symbol), [tokens]);
  return (
    <ListItemContainer onClick={handleClick}>
      <Row align="center">
        <TokensImage size={20} tokens={tokens} />
        <Main m="0 0 0 6px">
          <ListJoin items={tokenSymbols} />
        </Main>
      </Row>
      <Row align="center">{balance ? <Main>{formatBigDecimals(balance, 4)}</Main> : null}</Row>
    </ListItemContainer>
  );
});
