import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../../../shared/ui/Buttons';
import { Row, SvgContainer } from '../../../../shared/ui/Containers';
import { SubTitle } from '../../../../shared/ui/Typography';
import { icons } from '../../../../shared/Icons';

import { definePlus } from '../../../../helpers/merlinHelpers';

interface RewardsProps {
  rewards: number;
}

export const Rewards: FC<RewardsProps> = memo(({ rewards }) => {
  const {
    colors: { alterText, subAccentMain },
  } = useTheme();

  const { star } = icons;

  return (
    <Button w="180px" h="29px" p="0 10px" bg={`${subAccentMain}10`}>
      <Row align="center" justify="space-between" w="100%">
        <Row>
          <SubTitle m="0 5px 0 0" color={alterText}>
            Rewards:
          </SubTitle>
          <SubTitle>{definePlus(rewards, false)}</SubTitle>
        </Row>
        <SvgContainer stroke={subAccentMain} size={15}>
          {star}
        </SvgContainer>
      </Row>
    </Button>
  );
});
