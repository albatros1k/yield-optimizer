import { FC } from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../../shared/ui/Buttons';
import { Row } from '../../../shared/ui/Containers';
import { icons } from '../../../shared/Icons';
import { H4 } from '../../../shared/ui/Typography';

const { airdrop, question } = icons;

export const Airdrop: FC = () => {
  const {
    colors: { accentMain },
  } = useTheme();

  return (
    <Button bg="transparent" borderColor={accentMain} w="180px" h="46px" p="0 16px" m="0 20px 0 0">
      <Row w="100%" h="100%" align="center" justify="space-between">
        <Row align="center">
          {airdrop}
          <H4 m="0 0 0 10px">Level 3</H4>
        </Row>
        {question}
      </Row>
    </Button>
  );
};
