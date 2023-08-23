import { useTheme } from 'styled-components';

import { Column, Row } from '../../../shared/ui/Containers';
import { Main, Title } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';
import { Connector } from '../../../new-features/WalletConnection/ui/Connector';
import { Image } from '../../../shared/ui/Images';

import preview from '../../../images/preview.png';
import { options } from '../constants';
import { Option } from './Option';

const Welcome = () => {
  const {
    colors: { alterText },
  } = useTheme();

  const renderOptions = (): JSX.Element[] => options.map(op => <Option key={op.title} {...op} />);

  return (
    <Row w="100%" h="100%" p="0 0 60px">
      <Row w="50%" h="100%">
        <Column h="100%">
          <Title m="0 0 24px">Welcome to Odysea Trading</Title>
          <Main color={alterText} m="0 0 12px" maxW="400px">
            Simplify DeFi management with Odysea – the all-in-one platform for managing your
            positions across top protocols like AAVE and Uniswap.
          </Main>
          <Main color={alterText} maxW="400px">
            Create a smart wallet and streamline your portfolio. Try Odysea today.
          </Main>
          <Spacer space={42} />
          {renderOptions()}
          <Connector isWelcome />
        </Column>
      </Row>
      <Row pos="relative" w="50%" h="100%">
        <Image src={preview} alt="preview" w="100%" pos="absolute" style={{ top: 0, right: 0 }} />
      </Row>
    </Row>
  );
};

export default Welcome;
