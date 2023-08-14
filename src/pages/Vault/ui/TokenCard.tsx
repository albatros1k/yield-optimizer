import { memo, useEffect } from 'react';

import { ChainEntity } from '../../../features/data/entities/chain';
import { TokenEntity } from '../../../features/data/entities/token';
import { fetchAddressBookAction } from '../../../features/data/actions/tokens';
import { selectIsTokenLoaded, selectTokenById } from '../../../features/data/selectors/tokens';
import {
  selectIsAddressBookLoaded,
  selectShouldInitAddressBook,
} from '../../../features/data/selectors/data-loader';

import { useAppDispatch, useAppSelector } from '../../../store';
import { TokenCardDisplay } from './TokenCardDisplay';

interface TokenCardProps {
  chainId: ChainEntity['id'];
  tokenId: TokenEntity['id'];
  isLast: boolean;
}

export const TokenCard = memo<TokenCardProps>(({ chainId, tokenId, isLast }) => {
  const tokenLoaded = useAppSelector(
    state =>
      (selectIsAddressBookLoaded(state, chainId) && selectIsTokenLoaded(state, chainId, tokenId)) ||
      false
  );
  const token = useAppSelector(state =>
    tokenLoaded ? selectTokenById(state, chainId, tokenId) : null
  );
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

  // sometimes we have mooX tokens in the asset list
  // so we never know if a token will ever load or not
  // see: vault beets-sound-of-moosic
  if (!tokenLoaded || !token) {
    return <></>;
  }

  return <TokenCardDisplay token={token} isLast={isLast} />;
});
