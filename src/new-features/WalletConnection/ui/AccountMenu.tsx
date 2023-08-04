import { FC, Fragment, memo, useState } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { SubTitle } from '../../../shared/ui/Typography';
import { Layout } from '../../../shared/ui/Containers';
import { Line } from '../../../shared/ui/Spacer';

import { ChainMenu, MenuOption } from './styled';
import { ACCOUNT_CENTER_WIDTH, MY_MERLIN_URL } from '../lib/constants';

import { useAppDispatch, useAppSelector } from '../../../store';

import { doDisconnectWallet } from '../../../features/data/actions/wallet';
import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';

interface AccountMenuProps {
  open: boolean;
  toggleOpen: () => void;
}

const { logout, copy, externalLink, chevron } = icons;

export const AccountMenu: FC<AccountMenuProps> = memo(({ open, toggleOpen }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const dispatch = useAppDispatch();

  const {
    colors: { red },
  } = useTheme();

  const onCopyAddress = async (): Promise<void> => {
    await navigator.clipboard.writeText(walletAddress).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  const checkWallet = (): void => {
    window.open(`${MY_MERLIN_URL}/dashboard/${walletAddress}`, '_blank', 'noopener');
  };

  const disconnectWallet = (): void => {
    dispatch(doDisconnectWallet());
  };

  return (
    <Fragment>
      <ChainMenu w={`${ACCOUNT_CENTER_WIDTH}px`} open={open} onClick={e => e.stopPropagation()}>
        <MenuOption justify="space-between" align="center" m="0 0 18px" onClick={onCopyAddress}>
          <SubTitle>{isCopied ? 'Copied' : 'Copy wallet address'} </SubTitle>
          {isCopied ? chevron : copy}
        </MenuOption>
        <MenuOption justify="space-between" align="center" onClick={checkWallet}>
          <SubTitle>Check wallet on MyMerlin</SubTitle>
          {externalLink}
        </MenuOption>
        <Line m="18px 0" />
        <MenuOption justify="space-between" align="center" onClick={disconnectWallet}>
          <SubTitle color={red}>Disconnect wallet</SubTitle>
          {logout}
        </MenuOption>
      </ChainMenu>
      {open && <Layout onClick={toggleOpen} />}
    </Fragment>
  );
});
