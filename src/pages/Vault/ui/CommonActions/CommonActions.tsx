import { memo, useCallback } from 'react';

import { ChainEntity } from '../../../../features/data/entities/chain';
import { selectChainById } from '../../../../features/data/selectors/chains';
import {
  askForNetworkChange,
  askForWalletConnection,
} from '../../../../features/data/actions/wallet';

import { useAppDispatch, useAppSelector } from '../../../../store';

import { Button } from '../../../../shared/ui/Buttons';

export const ActionConnect = memo(() => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(askForWalletConnection());
  }, [dispatch]);

  return (
    <Button w="100%" h="50px" onClick={handleClick}>
      Connect Wallet
    </Button>
  );
});

export type ActionSwitchProps = { chainId: ChainEntity['id'] };

export const ActionSwitch = memo<ActionSwitchProps>(({ chainId }) => {
  const dispatch = useAppDispatch();
  const chain = useAppSelector(state => selectChainById(state, chainId));

  const handleClick = useCallback(() => {
    dispatch(askForNetworkChange({ chainId }));
  }, [dispatch, chainId]);

  return <Button w="100%" h="50px" onClick={handleClick}>{`Switch to ${chain.name}`}</Button>;
});
