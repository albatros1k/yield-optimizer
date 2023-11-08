import { useTheme } from 'styled-components';

import { Column, Row } from '../../../shared/ui/Containers';
import { Main, Title } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';
import { Connector } from '../../../new-features/WalletConnection/ui/Connector';

import { options } from '../constants';
import { Option } from './Option';
import { Preview } from './styled';

const Welcome = () => {
  const {
    colors: { alterText },
  } = useTheme();

  const renderOptions = (): JSX.Element[] => options.map(op => <Option key={op.title} {...op} />);

  return (
    <Row w="100%" h="100%" overflowHidden>
      <Row w="50%" h="100%" p="0 0 60px">
        <Column h="100%">
          <Title m="0 0 24px">Welcome to Odysea</Title>
          <Main color={alterText} m="0 0 12px" maxW="400px">
            Odysea offers an intuitive on-chain asset management solution, tailor-made for
            effortless access to digital assets and DeFi within a unified application.
          </Main>
          <Main color={alterText} maxW="400px">
            Deploy capital strategically across protocols and vault enabled strategies.
          </Main>
          <Spacer space={42} />
          {renderOptions()}
          <Connector isWelcome />
        </Column>
      </Row>
      <Preview />
    </Row>
  );
};

export default Welcome;
