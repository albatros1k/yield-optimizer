import { memo } from 'react';
import { useHistory } from 'react-router';
import { useTheme } from 'styled-components';

import { Card, Column, SvgContainer } from '../../../shared/ui/Containers';
import { Image } from '../../../shared/ui/Images';
import { H1, Main } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { icons } from '../../../shared/Icons';

import notFound from '../../../images/404.png';

const NotFound = memo(() => {
  const { colors } = useTheme();

  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <Card w="100%" h="600px" pos="relative">
      <Column w="100%" h="100%" justify="center" align="center">
        <Image
          src={notFound}
          pos="absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
        <Column maxW="530px" justify="center" align="center" style={{ zIndex: 1 }}>
          <H1>Oops, Lost in Cyberspace!</H1>
          <Main m="16px 0 32px" ta="center">
            {`Oops! You've hit a dead end in the digital realm. While we untangle the wires, feel free
          to explore other pathways. Getting lost sometimes leads to the best discoveries.`}
          </Main>
          <Button
            borderColor={colors.textColor}
            bg="transparent"
            h="28px"
            w="156px"
            p="0 17px"
            color={colors.textColor}
            pointer
            onClick={goBack}
          >
            <SvgContainer size={10} m="0 6px 0 0" stroke={colors.textColor}>
              {icons.backarrow}
            </SvgContainer>
            Go Back
          </Button>
        </Column>
      </Column>
    </Card>
  );
});

export default NotFound;
