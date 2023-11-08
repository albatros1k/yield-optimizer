import { styled } from 'styled-components';

import { ScrollProps, block, flexProps, gridProps, scroll, transition } from '../../styles/mixins';
import { IBlock, IFlex, IGrid, IGridItem } from '../../styles/types';
import { growDown } from '../../styles/animations';

export interface IFlexIntersection extends IBlock, IFlex {}
export interface IGridIntersection extends IBlock, IGrid {}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
`;

export const Row = styled.section<IFlexIntersection>`
  ${flexProps}
  ${block}
`;

export const Column = styled.section<IFlexIntersection>`
  ${flexProps}
  ${block}
  flex-direction: column;
`;

export const Block = styled.div<IBlock>`
  ${block}
`;

export const Circle = styled(Row)<IFlexIntersection>`
  border-radius: 50%;
`;

export const Grid = styled.div<IGridIntersection & IBlock>`
  ${block}
  ${gridProps}
`;

export const Layout = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${({ theme: { zIndexes } }) => zIndexes.layout};
`;

export const GridItem = styled.div<IGridItem>`
  grid-column-start: ${({ colStart }) => colStart};
  grid-column-end: ${({ colEnd }) => colEnd};
`;

export const ContentWrapper = styled(Column)`
  flex-grow: 1;
  padding: ${({
    theme: {
      sizes: { DESKTOP },
    },
  }) => `0px 40px 0px ${DESKTOP.sidebar.width}px`};
  align-items: center;
`;

export const Card = styled.div<IBlock & { border?: string | null }>`
  ${block}
  background: ${({ bg, theme: { colors } }) => bg || colors.alterBg};
  border-radius: 6px;
  border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
`;

interface SvgContainerProps {
  m?: string | number;
  position: 'relative' | 'static' | 'fixed' | 'absolute';
  pointer: boolean;
  t: string | number;
  r: string | number;
  l: string | number;
  zIndex: number;
  size: number;
  tf: string;
  stroke: string;
  circle: string;
  strokeWidth?: number;
}

export const SvgContainer = styled.div<Partial<SvgContainerProps>>`
  display: flex;
  margin: ${({ m }) => m};
  position: ${({ position = 'relative' }) => position};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
  top: ${({ t = 'auto' }) => t};
  right: ${({ r = 'auto' }) => r};
  left: ${({ l = 'auto' }) => l};
  z-index: ${({ zIndex = 1 }) => zIndex};
  > svg {
    path {
      stroke: ${({ stroke }) => stroke};
      ${({ strokeWidth }) => (strokeWidth ? `stroke-width: ${strokeWidth};` : ``)}
    }
    circle {
      stroke: ${({ circle }) => circle};
    }
    width: ${({ size = 14 }) => `${size}px`};
    height: ${({ size = 14 }) => `${size}px`};
    transform: ${({ tf }) => tf};
    transition: all 0.25s linear;
  }
`;

export const ExpandedCardHeader = styled(Card)<{ open: boolean }>`
  ${transition}
  border-radius: ${({ open }) => (open ? '6px 6px 0 0' : '6px')};
  background: ${({ theme: { colors } }) => colors.alterBg};
  width: 100%;
`;

export const ExpandedCardContent = styled(Card)<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${growDown} 300ms ease-in-out forwards;
  transform-origin: top center;
  border-top: none;
  border-radius: 0 0 6px 6px;
`;

export const PositionGrid = styled(Grid)`
  ${transition}
  cursor: pointer;
  > * {
    cursor: pointer;
  }
  &:hover {
    background: ${({ theme: { colors } }) => colors.additionalBg};
  }
`;

export const ScrollContainer = styled.div<ScrollProps & { h: string; p?: string }>`
  ${scroll};
  overflow-y: scroll;
  max-height: ${({ h }) => h};
  padding: ${({ p }) => p};
`;
