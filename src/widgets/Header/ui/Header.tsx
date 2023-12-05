import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, Row } from '../../../shared/ui/Containers';
import { Image } from '../../../shared/ui/Images';

import logo from '../../../images/odysea-logos/OdyseaMVPLogo.png';

import { WalletConnection } from '../../../new-features/WalletConnection';
import { Airdrop } from '../../../new-features/Airdrop';

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
        <Grid
          maxW="1180px"
          w="100%"
          colTemplate="1fr 0.7fr"
          colGap="22px"
          rowTemplate="none"
          rowGap="0"
        >
          <div />
          <Row>
            <Airdrop />
            <WalletConnection />
          </Row>
        </Grid>
      </Row>
    </HeaderWrapper>
  );
};
