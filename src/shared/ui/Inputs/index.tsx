import { styled } from 'styled-components';

import { IBlock } from '../../styles/types';
import { block } from '../../styles/mixins';

export const DefaultInput = styled.input<IBlock & { error?: boolean }>`
  ${block}
  display: flex;
  align-items: center;
  position: relative;
  all: unset;
  width: 100%;
  height: 100%;
  color: ${({ theme: { colors } }) => colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
  border: ${({ error, theme }) => (error ? `1px solid ${theme.colors.red}` : 'none')};
  &::placeholder {
    font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
    font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
    color: ${({ theme: { colors } }) => colors.alterText};
  }
`;
