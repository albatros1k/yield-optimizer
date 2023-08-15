import { memo } from 'react';

import { SubTitle } from '../../../../../shared/ui/Typography';
import { TokenAmountFromEntity } from '../../../../../shared/ui/TokenAmount';

import { useAppSelector } from '../../../../../store';
import {
  selectTransactSelectedChainId,
  selectTransactSelectedTokenAddresses,
} from '../../../../../features/data/selectors/transact';
import { selectTokenByAddress } from '../../../../../features/data/selectors/tokens';
import { selectUserBalanceOfToken } from '../../../../../features/data/selectors/balance';

export const SelectedInWallet = memo(() => {
  const chainId = useAppSelector(selectTransactSelectedChainId);
  const tokenAddresses = useAppSelector(selectTransactSelectedTokenAddresses);

  const token = useAppSelector(state =>
    tokenAddresses.length && chainId
      ? selectTokenByAddress(state, chainId, tokenAddresses[0])
      : undefined
  );
  const balance = useAppSelector(state =>
    token ? selectUserBalanceOfToken(state, token.chainId, token.address) : undefined
  );

  if (!chainId || !tokenAddresses.length || !token || !balance) {
    return <SubTitle>0</SubTitle>;
  }

  return <TokenAmountFromEntity amount={balance} token={token} minShortPlaces={4} />;
});
