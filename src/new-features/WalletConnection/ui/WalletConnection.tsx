import { useEffect } from 'react';

import {
  selectIsWalletConnected,
  selectWalletAddressIfKnown,
} from '../../../features/data/selectors/wallet';
import { fetchWalletTimeline } from '../../../features/data/actions/analytics';

import { useAppDispatch, useAppSelector } from '../../../store';

import { Connector } from './Connector';
import { AccountCenter } from './AccountCenter';

export const WalletConnection = () => {
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchWalletTimeline({ address: walletAddress }));
    }
  }, [dispatch, walletAddress]);

  if (isWalletConnected) return <AccountCenter />;
  return <Connector />;
};
