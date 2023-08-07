import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from '../../../shared/ui/Images';
import { Row } from '../../../shared/ui/Containers';

import logo from '../../../images/odysea-logos/odysea.svg';

import { Airdrop } from '../../../new-features/Airdrop';
import { WalletConnection } from '../../../new-features/WalletConnection';

import { HeaderWrapper } from './styled';

export const Header: FC = () => {
  return (
    <HeaderWrapper>
      <Row w="220px" p="0 27px">
        <NavLink to="/">
          <Logo src={logo} />
        </NavLink>
      </Row>
      <Row justify="center" style={{ flex: 1 }}>
        <Row w="100%" maxW="1180px" justify="flex-end">
          <Airdrop />
          <WalletConnection />
        </Row>
      </Row>
    </HeaderWrapper>
  );
};
