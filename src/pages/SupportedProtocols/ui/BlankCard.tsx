import { memo } from 'react';

import { Card, Column } from '../../../shared/ui/Containers';
import { H2, SubTitle } from '../../../shared/ui/Typography';

export const BlankCard = memo(() => {
  return (
    <Card p="87px 0 107px">
      <Column align="center">
        <H2 m="0 0 16px" ta="center">
          Nothing found
        </H2>
        <SubTitle ta="center" w="250px">
          No results
        </SubTitle>
      </Column>
    </Card>
  );
});
