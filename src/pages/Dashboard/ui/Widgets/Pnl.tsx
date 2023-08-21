import { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../../shared/Icons';
import { Button } from '../../../../shared/ui/Buttons';
import { Row, SvgContainer } from '../../../../shared/ui/Containers';
import { SubTitle } from '../../../../shared/ui/Typography';

import { useColor } from '../../../../helpers/hooks';
import { definePlus } from '../../../../helpers/merlinHelpers';

interface PnlProps {
  pnl: number;
}

export const Pnl: FC<PnlProps> = memo(({ pnl }) => {
  const {
    colors: { alterText },
  } = useTheme();
  const defineColor = useColor();

  const { chartArrow } = icons;

  return (
    <Button w="180px" h="29px" p="0 10px" bg={`${defineColor(pnl)}10`}>
      <Row align="center" justify="space-between" w="100%">
        <Row>
          <SubTitle m="0 5px 0 0" color={alterText}>
            P&L:
          </SubTitle>
          <SubTitle color={defineColor(pnl)}>{definePlus(pnl)}</SubTitle>
        </Row>
        <SvgContainer size={15} tf={`rotate(${pnl > 0 ? 0 : 0.25}turn)`} stroke={defineColor(pnl)}>
          {chartArrow}
        </SvgContainer>
      </Row>
    </Button>
  );
});
