import { memo } from 'react';
import { useTheme } from 'styled-components';

import { selectChainById } from '../../../features/data/selectors/chains';
import { TokenEntity, isTokenErc20 } from '../../../features/data/entities/token';
import { AssetsImage } from '../../../components/AssetsImage';

import { LinkBtn } from '../../../shared/ui/Link';
import { Card, Row } from '../../../shared/ui/Containers';
import { Main, SubTitle } from '../../../shared/ui/Typography';

import { useAppSelector } from '../../../store';

interface TokenCardDisplayProps {
  token: TokenEntity;
  isLast: boolean;
}

export const TokenCardDisplay = memo<TokenCardDisplayProps>(({ token, isLast }) => {
  const chain = useAppSelector(state => selectChainById(state, token.chainId));
  const isErc20 = isTokenErc20(token);

  const isMultiple: boolean =
    [token.website, isErc20, token.documentation].filter(Boolean).length > 1;

  const { colors } = useTheme();

  return (
    <Card p="18px" m={isLast ? '0' : '0 0 20px'} bg={colors.alterBg}>
      <Row align="center" justify="space-between" w="100%" m="0 0 17px">
        <Row align="center" w="calc(50% - 5px)">
          <AssetsImage assetIds={[token.id]} chainId={chain.id} size={20} />
          <Main m="0 0 0 12px">{token.symbol}</Main>
        </Row>
        <Row w="calc(50% - 5px)" align="center" justify={isMultiple ? 'space-between' : 'flex-end'}>
          {token.website && <LinkBtn href={token.website} text="Website" />}
          {isErc20 && (
            <LinkBtn href={`${chain.explorerUrl}/token/${token.address}`} text="Contract" />
          )}
          {token.documentation && <LinkBtn href={token.documentation} text="Docs" />}
        </Row>
      </Row>
      <SubTitle color={colors.alterText}>
        {token.description ? token.description : 'No token description available'}
      </SubTitle>
    </Card>
  );
});
