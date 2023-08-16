import { memo, useState, useMemo, useCallback } from 'react';

import { Input } from '../../../../../shared/ui/Inputs';
import { H3 } from '../../../../../shared/ui/Typography';
import { Column } from '../../../../../shared/ui/Containers';

import { useAppDispatch, useAppSelector } from '../../../../../store';
import {
  selectTransactVaultId,
  selectTransactWithdrawTokensForChain,
} from '../../../../../features/data/selectors/transact';
import { selectVaultById } from '../../../../../features/data/selectors/vaults';
import { ListItemProps } from '../../../../../features/vault/components/Actions/Transact/QuoteSelectStep/ListItem';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';

import { ScrollContainer } from '../DepositTokenList/styled';
import { ListItem } from '../DepositTokenList/ListItem';

export const WithdrawTokenList = memo(() => {
  const dispatch = useAppDispatch();
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  const [selectedChain] = useState(vault.chainId);
  const [search, setSearch] = useState('');

  const optionsForChain = useAppSelector(state =>
    selectTransactWithdrawTokensForChain(state, selectedChain)
  );

  const filteredOptionsForChain = useMemo(() => {
    let options = optionsForChain;

    if (search.length) {
      options = options.filter(option =>
        option.tokens
          .map(token => token.symbol)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return options;
  }, [optionsForChain, search]);

  const handleTokenSelect = useCallback<ListItemProps['onSelect']>(
    tokenId => {
      dispatch(
        transactActions.selectToken({
          tokensId: tokenId,
          resetInput: false,
        })
      );
    },
    [dispatch]
  );

  return (
    <Column>
      <Input
        value={search}
        onChange={setSearch}
        placeholder="Search token by symbol"
        m="0 0 10px"
        w="100%"
      />
      <ScrollContainer>
        {filteredOptionsForChain.length ? (
          filteredOptionsForChain.map(option => (
            <ListItem
              key={option.id}
              tokenId={option.id}
              tokens={option.tokens}
              chainId={selectedChain}
              onSelect={handleTokenSelect}
            />
          ))
        ) : (
          <H3>No results</H3>
        )}
      </ScrollContainer>
    </Column>
  );
});
