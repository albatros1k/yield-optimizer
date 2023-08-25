import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Row } from '../../../shared/ui/Containers';
import { Image } from '../../../shared/ui/Images';

import logo from '../../../images/odysea-logos/odysea.png';

import { WalletConnection } from '../../../new-features/WalletConnection';

import { HeaderWrapper } from './styled';

export const Header: FC = () => {
  return (
    <HeaderWrapper>
      <Row w="220px" p="0 27px">
        <NavLink to="/">
          <Image src={logo} w="100%" h="100%" />
        </NavLink>
      </Row>
      <Row justify="center" style={{ flex: 1 }}>
        <Row w="100%" maxW="1180px" justify="flex-end">
          <WalletConnection />
        </Row>
      </Row>
    </HeaderWrapper>
  );
};
