import { FC } from 'react';
import styled from 'styled-components';

import { Row } from '../../../shared/ui/Containers';
import { Caption } from '../../../shared/ui/Typography';

interface ISize {
  w?: string;
  h?: string;
}

export const NumberContainer = styled(Row)<ISize>`
  height: ${({ h = '22px' }) => h};
  width: ${({ w = '40px' }) => w};
  background: ${({ theme: { colors } }) => colors.alterText};
  padding: 0 6px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;

interface NumberInfoProps extends ISize {
  num: number;
}

export const NumberInfo: FC<NumberInfoProps> = ({ num = 0, w, h }) => {
  return (
    <NumberContainer {...{ w, h }}>
      <Caption>{num}</Caption>
    </NumberContainer>
  );
};
