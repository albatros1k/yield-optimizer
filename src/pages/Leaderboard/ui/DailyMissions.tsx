import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Column, SvgContainer } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { H3, Input } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';

import { ChristmasMissions } from './Christmas';
import { MoreMissions } from './MoreMissions';

export const DailyMissions = memo(() => {
  const { colors } = useTheme();

  return (
    <Card w="100%" p="76px 0 79px" h="calc(50% - 10px)">
      <Column justify="center" align="center">
        <SvgContainer m="-20px auto 0" size={62}>
          {icons.fullStar}
        </SvgContainer>
        <H3 ta="center" m="26px auto 12px">
          Complete missions for STARDUST
        </H3>
        <Input color={colors.alterText} ta="center" m="0 auto 30px">
          Stardust is the fuel for our mission and collecting it will <br /> have many benefits.
        </Input>
        <ChristmasMissions />
        <Spacer />
        <MoreMissions />
      </Column>
    </Card>
  );
});
