import { memo, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import moment from 'moment';

import { icons } from '../../../shared/Icons';
import { Button } from '../../../shared/ui/Buttons';
import { Caption, H4 } from '../../../shared/ui/Typography';
import { Block, Column, Row, SvgContainer } from '../../../shared/ui/Containers';

import { TimeRemaining, calculateTimeRemaining } from '../lib/helpers';
import { MISSION_END_DAY_STORAGE_KEY } from '../lib/missions';

export interface MissionsProps {
  title: string;
  subtitle: string;
  link: string;
  duration: moment.Moment | null;
  icon: JSX.Element;
}

export const Missions = memo<MissionsProps>(({ title, subtitle, link, duration, icon }) => {
  const storedEndDate = localStorage.getItem(MISSION_END_DAY_STORAGE_KEY);
  const initialEndDate = storedEndDate ? moment(storedEndDate) : duration;

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    initialEndDate ? calculateTimeRemaining(initialEndDate) : null
  );

  const { colors } = useTheme();

  const goToGalaxy = () => window.open(`${link}`, '_blank', 'noopener,noreferrer');

  useEffect(() => {
    if (duration) {
      const timerInterval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(initialEndDate));
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [initialEndDate, duration]);

  return (
    <Button
      bg={`linear-gradient(264deg, ${colors.subAccentSecondary} 0%, #10B981 73.35%)`}
      w="360px"
      h="60px"
      overflowHidden
      onClick={goToGalaxy}
    >
      <Row w="100%" h="100%">
        <Block p="0 14px" h="100%" w="calc(100% / 3 * 2)">
          <Row h="100%" align="center">
            {icon}
            <Column m="0 0 0 10px">
              <H4 m="0 0 5px">{title}</H4>
              <Caption>{subtitle}</Caption>
            </Column>
          </Row>
        </Block>

        {duration ? (
          <Block h="100%" w="calc(100% / 3)" p="0 14px">
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
        ) : null}
      </Row>
    </Button>
  );
});
