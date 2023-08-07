import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IBlock, IFlex } from '../../../shared/styles/types';
import { block, center, flexProps } from '../../../shared/styles/mixins';

export const Aside = styled.aside`
  width: ${({ theme: { sizes } }) => sizes.DESKTOP.sidebar.width}px;
  padding: 20px 40px;
`;

const svgStyles = css<{ ishouse?: number }>`
  p {
    color: ${({ theme: { colors } }) => colors.textColor};
  }
  nav {
    > svg {
      path {
        stroke: ${({ theme: { colors } }) => colors.textColor};
        ${({ ishouse = false, theme: { colors } }) =>
          `${ishouse ? `fill: ${colors.textColor}` : ''}`}
      }
      rect {
        stroke-width: 0.5px;
      }
      circle {
        stroke: ${({ theme: { colors } }) => colors.textColor};
      }
    }
  }
`;

export const LinkContainer = styled(NavLink)<IFlex & { m?: string; ishouse?: number }>`
  ${flexProps}
  transition: all 0.3s ease 0s;
  user-select: none;
  margin: ${({ m = 0 }) => m};
  &:hover {
    ${svgStyles}
    transform: translateX(3px);
  }
  > svg {
    path {
      stroke: ${({ theme: { colors } }) => colors.alterBg};
    }
  }
  &.active {
    ${svgStyles}
    nav {
      background: ${({ theme: { colors } }) => colors.accentMain};
    }
  }
`;

export const IconContainer = styled.nav<
  IBlock & { size?: number; tf?: string; borderColor?: string; stroke?: string; br?: number }
>`
  ${center}
  ${block}
  border-radius: ${({ br = 6 }) => br}px;
  background: ${({ bg, theme: { colors } }) => bg || colors.alterBg};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  > svg {
    transition: all 0.3s ease 0s;
    width: ${({ size = 14 }) => size}px;
    height: ${({ size = 14 }) => size}px;
    transform: ${({ tf = 'none' }) => tf};
    path {
      stroke: ${({ stroke }) => stroke};
    }
  }
`;
