import { memo, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import moment from 'moment';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { Caption, H4 } from '../../../shared/ui/Typography';
import { Block, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { ReactComponent as Clous } from '../../../images/claus.svg';
import { TimeRemaining, calculateTimeRemaining } from '../lib/helpers';
import { CHRISTMAS_END_DAY_STORAGE_KEY, FIXED_END_DATE } from '../lib/period';

export const ChristmasMissions = memo(() => {
  const storedEndDate = localStorage.getItem(CHRISTMAS_END_DAY_STORAGE_KEY);
  const initialEndDate = storedEndDate ? moment(storedEndDate) : FIXED_END_DATE;
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(initialEndDate)
  );

  const { colors } = useTheme();

  const goToGalaxy = () =>
    window.open(`https://odysea.finance/snow-aliens-nft`, '_blank', 'noopener,noreferrer');

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(initialEndDate));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialEndDate]);

  return (
    <Button w="360px" h="60px" overflowHidden onClick={goToGalaxy}>
      <Row w="100%" h="100%">
        <Block
          p="0 14px"
          bg={`linear-gradient(264deg, ${colors.subAccentSecondary} 0%, #10B981 73.35%)`}
          h="100%"
          w="calc(100% / 3 * 2)"
        >
          <Row h="100%" align="center">
            <Clous />
            <Column m="0 0 0 10px">
              <H4 m="0 0 5px">Christmas Mission</H4>
              <Caption>
                Reward: <span style={{ fontWeight: 700 }}>NFT</span> +{' '}
                <span style={{ fontWeight: 700 }}>400 STARDUST</span>
              </Caption>
            </Column>
          </Row>
        </Block>
        <Block
          bg={`linear-gradient(264deg, ${colors.subAccentSecondary} 0%, #10B981 73.35%)`}
          h="100%"
          w="calc(100% / 3)"
          p="0 14px"
        >
          <Row h="100%" w="100%" align="center">
            <Column m="0 12px 0 0">
              <H4 m="0 0 5px">
                {timeRemaining.days} Day{timeRemaining.days > 1 ? 's' : ''}
              </H4>
              <Caption>
                {timeRemaining.hours}h {timeRemaining.minutes}m
              </Caption>
            </Column>
            <SvgContainer stroke={colors.textColor} size={24} opacity={0.3}>
              {icons.clock}
            </SvgContainer>
          </Row>
        </Block>
      </Row>
    </Button>
  );
});
