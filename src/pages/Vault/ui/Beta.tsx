import { memo } from 'react';
import { useTheme } from 'styled-components';

import { Card } from '../../../shared/ui/Containers';
import { H1, Main } from '../../../shared/ui/Typography';

export const Beta = memo(() => {
  const { chartColors } = useTheme();
  return (
    <Card w="100%" p="25px">
      <H1 m="0 0 10px" color={chartColors.chartOrange}>
        Warning
      </H1>

      <Main>
        This is a beta version, and engaging with this service carries inherent risks. Proceed with
        caution and understand that any trading decisions made based on information provided here
        are at your own risk. Exercise due diligence and consider consulting with a financial
        advisor before making any investment decisions.
      </Main>
    </Card>
  );
});
