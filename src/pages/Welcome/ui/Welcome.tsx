import { useTheme } from 'styled-components';

import { Column, Row } from '../../../shared/ui/Containers';
import { Main, Title } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';
import { Connector } from '../../../new-features/WalletConnection/ui/Connector';

const Welcome = () => {
  const {
    colors: { alterText },
  } = useTheme();

  return (
    <Row w="100%" h="100%" justify="center">
      <Row h="100%" justify="center">
        <Column h="100%">
          <Title m="0 0 24px">Welcome to Odysea Trading</Title>
          <Main color={alterText} m="0 0 12px" maxW="800px">
            Simplify DeFi management with Odysea – the all-in-one platform for managing your
            positions across top protocols like AAVE and Uniswap.
          </Main>
          <Main color={alterText} maxW="400px">
            Create a smart wallet and streamline your portfolio. Try Odysea today.
          </Main>
          <Spacer space={42} />
          <Connector />
        </Column>
      </Row>
    </Row>
  );
};

export default Welcome;
