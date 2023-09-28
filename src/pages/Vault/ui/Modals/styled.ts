import { styled } from 'styled-components';

import { center } from '../../../../shared/styles/mixins';

export const ProtocolSquare = styled.div<{ isDark: boolean }>`
  ${center}
  width: 20px;
  height: 20px;
  border: 1px solid rgba(130, 71, 229, 0.3);
  margin-left: 10px;
  border-radius: 2px;
  background: ${({ isDark }) => (isDark ? '#fff' : 'transparent')};
`;
