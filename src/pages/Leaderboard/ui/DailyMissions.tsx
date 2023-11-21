import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { H3, Input } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Buttons';

interface DailyMissionsProps {}

export const DailyMissions = memo<DailyMissionsProps>(() => {
  const { colors } = useTheme();

  const goToGalaxy = () =>
    window.open(`https://galxe.com/odysea/campaign/GC838Un2H8`, '_blank', 'noopener,noreferrer');

  return (
    <Card w="100%" p="76px 0 79px" h="calc(50% - 10px)">
      <Column justify="center" align="center">
        <SvgContainer m="-20px auto 0" size={62}>
          {icons.fullStar}
        </SvgContainer>
        <H3 ta="center" m="26px auto 12px">
          Complete the daily mission <br /> and collect more stardust
        </H3>
        <Input color={colors.alterText} ta="center" m="0 auto 16px">
          Stardust is the fuel for our mission and collecting it will <br /> have many benefits.
        </Input>
        <Row w="100%" justify="center">
          <Button w="200px" h="36px" p="0 10px 0 16px" onClick={goToGalaxy}>
            <Input m="0 6px 0 0">Complete Daily Missions</Input>
            <SvgContainer size={12}>{icons.externalLink}</SvgContainer>
          </Button>
        </Row>
      </Column>
    </Card>
  );
});
