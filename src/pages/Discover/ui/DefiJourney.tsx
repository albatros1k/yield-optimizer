import { FC, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Card } from '../../../shared/ui/Containers';
import { H1, H3, Main, SubTitle } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';
import { JourneyCardInfo } from '../types/journey';

export const DeFiJourney: FC = () => {
  const {
    colors: { alterText },
  } = useTheme();

  const cards = useMemo(() => {
    const cardInfo: JourneyCardInfo[] = [
      { title: 'Total Investors', value: '45,193', cords: { top: 45, right: 100 } },
      { title: 'Strateg', value: '38', cords: { top: 45, right: -200 } },
      { title: 'Total Value Locked', value: '$95,293,201', cords: { top: 135, right: 200 } },
      { title: 'Daily Volume', value: '$134,051', cords: { top: 135, right: -100 } },
    ];

    return cardInfo.map(card => <JourneyCard key={card.title} {...card} />);
  }, []);

  return (
    <Card w="100%" p="32px 40px 41px 40px" pos="relative" overflowHidden>
      <H1 m="0 0 18px">Discover Your DeFi Journey</H1>
      <Main color={alterText} m="0 0 32px">
        With Odysea Vaults. Explore, invest, and grow your <br /> assets in the exciting world of
        DeFi.
      </Main>
      <Button w="240px" h="42px">
        Create Smart Wallet
      </Button>

      {cards}
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
