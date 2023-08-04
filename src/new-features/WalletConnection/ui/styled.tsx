import styled from 'styled-components';

import { Card, Row } from '../../../shared/ui/Containers';
import { growDown } from '../../../shared/styles/animations';

export const ChainMenu = styled(Card)<{ open: boolean; left?: number; top?: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${growDown} 300ms ease-in-out forwards;
  transform-origin: top center;
  z-index: ${({ theme: { zIndexes } }) => zIndexes.menu};
  top: ${({ top = 56 }) => `${top}px`};
  left: ${({ left = 0 }) => `${left}px`};
  background: ${({ theme: { colors } }) => colors.additionalBg};
  padding: 18px 16px;
`;

export const MenuOption = styled(Row)`
  cursor: pointer;
  * {
    cursor: pointer !important;
  }
  > p {
    transition: all 0.3s ease 0s;
  }
  > svg {
    transition: all 0.3s ease 0s;
  }
  &:hover {
    > p {
      transform: translateX(3px);
    }
    > svg {
      transform: scale(1.1);
    }
  }
`;
