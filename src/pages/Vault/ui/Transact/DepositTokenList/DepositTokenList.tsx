import { memo, useState, useMemo, useCallback } from 'react';
import { useTheme } from 'styled-components';
import BigNumber from 'bignumber.js';

import { useAppDispatch, useAppSelector } from '../../../../../store';

import {
  selectTransactDepositTokensForChainIdWithBalances,
  selectTransactVaultId,
} from '../../../../../features/data/selectors/transact';
import { selectVaultById } from '../../../../../features/data/selectors/vaults';
import { ListItemProps } from '../../../../../features/vault/components/Actions/Transact/QuoteSelectStep/ListItem';
import { transactActions } from '../../../../../features/data/reducers/wallet/transact';

import { Input } from '../../../../../shared/ui/Inputs';
import { Column, Row } from '../../../../../shared/ui/Containers';
import { Caption, H3 } from '../../../../../shared/ui/Typography';
import { ToggleSwitcher } from '../../../../../shared/ui/Switcher';

import { ScrollContainer } from './styled';
import { ListItem } from './ListItem';

const DUST_HIDDEN_THRESHOLD = new BigNumber('0.01');

export const DepositTokenList = memo(() => {
  const vaultId = useAppSelector(selectTransactVaultId);
  const vault = useAppSelector(state => selectVaultById(state, vaultId));

  const [search, setSearch] = useState('');
  const [selectedChain] = useState(vault.chainId);
  const [dustHidden, setDustHidden] = useState(false);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const optionsForChain = useAppSelector(state =>
    selectTransactDepositTokensForChainIdWithBalances(state, selectedChain)
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

    if (dustHidden) {
      options = options.filter(option => option.balanceValue.gte(DUST_HIDDEN_THRESHOLD));
    }

    return options;
  }, [optionsForChain, search, dustHidden]);

  const handleTokenSelect = useCallback<ListItemProps['onSelect']>(
    tokenId => {
      dispatch(
        transactActions.selectToken({
          tokensId: tokenId,
          resetInput: true,
        })
      );
    },
    [dispatch]
  );

  const handleToggleDust = useCallback(() => {
    setDustHidden(prev => !prev);
  }, [setDustHidden]);

  return (
    <Column>
      <Row w="95%" justify="space-between" align="center">
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Search token by symbol"
          m="0 0 10px"
          w="80%"
        />
        <Row align="center">
          <Caption color={dustHidden ? colors.textColor : colors.alterText} m="0 5px 0 0">
            {dustHidden ? 'Show dust' : 'Hide dust'}
          </Caption>
          <ToggleSwitcher onChange={handleToggleDust} value={dustHidden} />
        </Row>
      </Row>

      <ScrollContainer>
        {filteredOptionsForChain.length ? (
          filteredOptionsForChain.map(option => (
            <ListItem
              key={option.id}
              tokenId={option.id}
              tokens={option.tokens}
              balance={option.balance}
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
