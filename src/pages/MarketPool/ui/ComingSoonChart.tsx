import { FC, memo } from 'react';

import { Image } from '../../../shared/ui/Images';
import { Button } from '../../../shared/ui/Buttons';
import { Card } from '../../../shared/ui/Containers';
import { Main, SubTitle } from '../../../shared/ui/Typography';

import mock from '../../../images/chart-mock.png';
import { BlurRow, ChartBlock } from './styled';

interface ComingSoonChartProps {
  heading: string;
  poolName: string;
  isSingleProtocol?: boolean;
}

export const ComingSoonChartProps: FC = memo<ComingSoonChartProps>(
  ({ heading, poolName, isSingleProtocol }) => {
    return (
      <Card p="25px 30px 20px" h="100%">
        <Main m="0 0 10px">{heading}</Main>
        <SubTitle m="0 0 18px">
          {poolName} {isSingleProtocol ? '' : `, by Protocols`}
        </SubTitle>
        <ChartBlock h="240px" pos="relative" w="100%" overflowHidden={true}>
          <Image src={mock} alt="mock" w="100%" />
          <BlurRow pos="absolute" w="100%" h="100%" align="center" justify="center">
            <Button p="0 18px" w="fit-content" h="32px">
              Coming Soon
            </Button>
          </BlurRow>
        </ChartBlock>
      </Card>
    );
  }
);
