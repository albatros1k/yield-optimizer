import { css } from 'styled-components';

import { IBlock, IFlex, IGrid } from './types';

export const flexProps = css<IFlex>`
  display: flex;
  align-items: ${({ align = 'flex-start' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  flex-wrap: ${({ flexWrap = 'nowrap' }) => flexWrap};
`;

export const block = css<IBlock>`
  width: ${({ w = 'auto' }) => w};
  height: ${({ h = 'auto' }) => h};
  padding: ${({ p = 0 }) => p};
  margin: ${({ m = 0 }) => m};
  overflow: ${({ overflowHidden, auto }) =>
    overflowHidden ? 'hidden' : auto ? 'auto' : 'visible'};
  position: ${({ pos = 'static' }) => pos};
  max-width: ${({ maxW }) => maxW || 'none'};
  background: ${({ bg }) => bg || 'transparent'};
  text-align: ${({ ta }) => ta || 'left'};
  opacity: ${({ opacity = 1 }) => opacity};
  min-height: ${({ minH = '0' }) => minH};
  border-radius: ${({ br = 0 }) => `${br}px`};
  ${({ pointer = false }) => pointer && `cursor:pointer;*{cursor:pointer}`}
`;

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const gridProps = css<IGrid>`
  display: grid;
  grid-template-rows: ${({ rowTemplate = 'none' }) => rowTemplate};
  grid-template-columns: ${({ colTemplate = 'none' }) => colTemplate};
  column-gap: ${({ colGap = '0' }) => colGap};
  row-gap: ${({ rowGap = '0' }) => rowGap};
  align-items: ${({ align = 'center' }) => align};
`;

export const transition = css`
  transition: 0.15s ease-out all;
`;

export const dots = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface ScrollProps {
  trackColor?: string;
  barWidth?: number;
  barHeight?: number;
}

export const scroll = css<ScrollProps>`
  &&::-webkit-scrollbar-track {
    background-color: ${({ trackColor = 'transparent' }) => trackColor};
    border-radius: 14px;
  }
  &&::-webkit-scrollbar {
    width: ${({ barWidth = 6 }) => `${barWidth}px`};
    height: ${({ barHeight = 2 }) => `${barHeight}px`};
    border-radius: 14px;
    background-color: ${({ theme: { colors } }) => colors.alterHelp};
  }
  &&::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { colors } }) => colors.subAccentMain};
    border-radius: 14px;
  }
`;
