import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Column, Grid } from '../../../shared/ui/Containers';
import { H3, SubTitle } from '../../../shared/ui/Typography';

import { ABOUT } from '../../../config/about';
import { VaultEntity } from '../../../features/data/entities/vault';

interface AboutStrategyProps {
  vaultId: VaultEntity['id'];
}

export const AboutStrategy = memo<AboutStrategyProps>(({ vaultId }) => {
  const { colors } = useTheme();

  const { steps, explanation } = ABOUT[vaultId];

  return (
    <Card p="25px" w="100%">
      <H3 color={colors.alterText} m="0 0 24px">
        About Strategy
      </H3>
      <Grid
        w="100%"
        colTemplate="repeat(2,1fr)"
        rowTemplate="auto"
        colGap="60px"
        rowGap="none"
        minH="auto"
      >
        <Column h="100%">
          {explanation.map((text, index, { length }) => (
            <SubTitle key={text} m={length - index === 1 ? 0 : '0 0 10px'}>
              {text}
            </SubTitle>
          ))}
        </Column>
        <Column h="100%">
          <SubTitle m="0 0 10px">There are {steps.length} steps in the strategy:</SubTitle>
          {steps.map((step, index) => (
            <SubTitle key={step} m="0 0 7px">
              {index + 1}. {step}
            </SubTitle>
          ))}
        </Column>
      </Grid>
    </Card>
  );
});
