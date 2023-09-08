import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Card, Row } from '../../../shared/ui/Containers';
import { ButtonText, H1, H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { JourneyCardInfo } from '../types/journey';
import { icons } from '../../../shared/Icons';
import { Image } from '../../../shared/ui/Images';

import cosmos from '../../../images/cosmos.png';

export const DeFiJourney: FC = () => {
  const {
    colors: { alterText, bgColor },
  } = useTheme();

  return (
    <Card w="100%" p="32px 40px 41px 40px" pos="relative" overflowHidden>
      <H1 m="0 0 18px">Discover Your DeFi Journey</H1>
      <Main color={alterText} m="0 0 32px">
        With Odysea Vaults. Explore, invest, and grow your <br /> assets in the exciting world of
        DeFi.
      </Main>
      <Button w="240px" h="42px" bg={bgColor} p="0 18px">
        <Row w="100%" justify="space-between" align="center">
          <ButtonText color={alterText}>More Vaults in Progress</ButtonText>
          {icons.clock}
        </Row>
      </Button>
      <Image
        src={cosmos}
        style={{ position: 'absolute', top: 0, right: 0, filter: 'brightness(40%)' }}
      />
    </Card>
  );
};

export const JourneyCard: FC<JourneyCardInfo> = ({ title, value, cords }) => {
  const {
    colors: { bgColor, alterText },
  } = useTheme();
  return (
    <Card p="13px 18px" bg={bgColor} w="280px" pos="absolute" style={cords}>
      <SubTitle color={alterText} m="0 0 6px">
        {title}
      </SubTitle>
      <H3>{value}</H3>
    </Card>
  );
};
