import { FC, memo } from 'react';
import { useTheme } from 'styled-components';
import millify from 'millify';

import { icons } from '../../../../shared/Icons';
import { Button } from '../../../../shared/ui/Buttons';
import { Row, SvgContainer } from '../../../../shared/ui/Containers';
import { Main } from '../../../../shared/ui/Typography';

import { useColor } from '../../../../helpers/hooks';

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
    <Button w="180px" h="29px" p="0 10px" bg={`${defineColor(pnl)}10`} overflowHidden>
      <Row align="center" justify="space-between" w="100%">
        <Row>
          <Main m="0 5px 0 0" color={alterText}>
            P&L:
          </Main>
          <Main color={defineColor(pnl)}>
            {pnl > 0 ? `+$${millify(pnl)}` : pnl < 0 ? `-$${millify(pnl * -1)}` : 0}
          </Main>
        </Row>
        <SvgContainer size={15} tf={`rotate(${pnl > 0 ? 0 : 0.25}turn)`} stroke={defineColor(pnl)}>
          {chartArrow}
        </SvgContainer>
      </Row>
    </Button>
  );
});
