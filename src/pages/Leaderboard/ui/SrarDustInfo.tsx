import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card, Column } from '../../../shared/ui/Containers';
import { H3, Input } from '../../../shared/ui/Typography';

export const SrarDustInfo = memo(() => {
  const { colors } = useTheme();

  return (
    <Card w="100%" p="138px 0 147px" h="calc(50% - 10px)">
      <Column align="center" justify="center">
        <H3 m="0 0 12px">What is STARDUST?</H3>
        <Input ta="center" maxW="300px" color={colors.alterText}>
          Stardust is a unique loyalty points system designed to recognize and reward platform users
          who actively engage and consistently return, offering them a combination of social and
          gamified benefits.
        </Input>
      </Column>
    </Card>
  );
});
