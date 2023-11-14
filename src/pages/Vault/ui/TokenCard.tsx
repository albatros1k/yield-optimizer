import { memo, useEffect } from 'react';

import { ChainEntity } from '../../../features/data/entities/chain';
import { TokenEntity } from '../../../features/data/entities/token';
import { fetchAddressBookAction } from '../../../features/data/actions/tokens';
import { selectTokenFromAllChainsById } from '../../../features/data/selectors/tokens';
import { selectShouldInitAddressBook } from '../../../features/data/selectors/data-loader';

import { useAppDispatch, useAppSelector } from '../../../store';
import { TokenCardDisplay } from './TokenCardDisplay';

interface TokenCardProps {
  chainId: ChainEntity['id'];
  tokenId: TokenEntity['id'];
  isLast: boolean;
}

export const TokenCard = memo<TokenCardProps>(({ chainId, tokenId, isLast }) => {
  const token = useAppSelector(state => selectTokenFromAllChainsById(state, tokenId));

  const shouldInitAddressBook = useAppSelector(state =>
    selectShouldInitAddressBook(state, chainId)
  );
  // initialize addressbook
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldInitAddressBook) {
      dispatch(fetchAddressBookAction({ chainId: chainId }));
    }
  }, [dispatch, chainId, shouldInitAddressBook]);

  if (!token) return <></>;
  return <TokenCardDisplay token={token} isLast={isLast} />;
});
