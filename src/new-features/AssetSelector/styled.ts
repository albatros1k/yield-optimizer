import styled from 'styled-components';

import { IFlex } from '../../shared/styles/types';
import { Card, Column } from '../../shared/ui/Containers';
import { ScrollProps, flexProps, scroll } from '../../shared/styles/mixins';

type SelectorContainerProps = {
  open: boolean;
  isActive?: boolean;
  isError?: boolean;
};

export const SelectorContainer = styled(Card)<SelectorContainerProps>`
  width: 100%;
  padding: 18px 24px;
  border-radius: ${({ open }) => (open ? '6px 6px 0 0' : '6px')};
  border: 1px solid
    ${({ isActive, isError, open, theme: { colors } }) =>
      isError ? colors.red : open || isActive ? colors.subAccentMain : colors.alterHelp};
`;

export const Menu = styled.div<{ open: SelectorContainerProps['open'] }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 86px;
  left: 0;
  border-radius: 0 0 6px 6px;
  transition: all 0.2s ease-out 0.05s;
  padding: ${({ open }) => (open ? '24px' : '0px')};
  background: ${({ theme: { colors } }) => colors.bgColor};
  z-index: ${({ theme: { zIndexes } }) => zIndexes.menu};
  max-height: ${({ open }) => (open ? '500px' : 0)};
  border: ${({ open }) => (open ? '1px' : '0px')} solid
    ${({ theme: { colors } }) => colors.subAccentMain};
`;

export const TokenInput = styled.input.attrs(() => ({}))`
  all: unset;
  font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
  color: ${({ theme: { colors } }) => colors.textColor};
  outline: none;
  width: 50%;
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.alterHelp};
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ScrollContainer = styled(Column)<ScrollProps>`
  ${scroll}
  max-height: 280px;
  width: 100%;
  overflow-y: auto;
`;

export const PositionContainer = styled(Card)<
  IFlex & { isActive: SelectorContainerProps['isActive'] }
>`
  ${flexProps}
  justify-content:space-between;
  align-items: center;
  min-height: 46px;
  border: 1px solid
    ${({ isActive, theme: { colors } }) => (isActive ? colors.subAccentMain : colors.alterHelp)};
  width: 95%;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    transform: translateX(3px);
  }
`;

export const FeerBtn = styled(Card)<{ isActive: SelectorContainerProps['isActive'] }>`
  border: 1px solid
    ${({ isActive, theme: { colors } }) => (isActive ? colors.subAccentMain : colors.alterHelp)};
`;
