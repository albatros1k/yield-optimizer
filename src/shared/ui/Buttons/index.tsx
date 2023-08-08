import { styled } from 'styled-components';

import { IBlock } from '../../styles/types';
import { block, center, transition } from '../../styles/mixins';

export const Button = styled.button<IBlock & { borderColor?: string }>`
  ${block}
  ${center}
  ${transition}
  background: ${({ bg, theme: { colors } }) => bg || colors.accentMain};
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.button.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.button.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.button.fontFamily};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  border-radius: ${({ br = 6 }) => br}px;
  cursor: pointer;
  text-align: center;
  &:hover {
    opacity: 0.85;
  }
  &:active {
    transform: scale(1.02);
  }
  &:disabled {
    background: ${({ theme: { colors } }) => colors.alterHelp};
    color: ${({ theme: { colors } }) => colors.alterText};
  }
`;

export const ChainBtn = styled(Button)<{ selected: boolean }>`
  ${({ selected }) =>
    !selected &&
    `
      & .bg {
      fill: #2e324c;
    }
      & .fg {
      fill: #1b1e31;
    }
  `}
`;
