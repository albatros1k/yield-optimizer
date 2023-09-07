import styled from 'styled-components';
import { center, transition } from '../../../shared/styles/mixins';
import { Block, Card, Layout, Row } from '../../../shared/ui/Containers';

export const PeriodButton = styled.button<{ is_active: boolean; h?: number }>`
  ${transition}
  cursor:pointer;
  height: ${({ h = 36 }) => `${h}px`};
  border-radius: 4px;
  font-size: 14px;
  background: ${({
    is_active,
    theme: {
      colors: { subAccentMain },
    },
  }) => (is_active ? `${subAccentMain}0d` : 'transparent')};
  color: ${({
    is_active,
    theme: {
      colors: { textColor, alterText },
    },
  }) => (is_active ? textColor : alterText)};
  border: 1px solid;
  border-color: ${({
    is_active,
    theme: {
      colors: { subAccentMain, alterText },
    },
  }) => (is_active ? subAccentMain : alterText)};
`;

export const ProtocolButton = styled(Row)<{ is_active: boolean; color: string }>`
  ${transition}
  cursor:pointer;
  height: 36px;
  border-radius: 4px;
  background: ${({
    is_active,
    color,
    theme: {
      colors: { alterHelp },
    },
  }) => (is_active ? `${color}0d` : alterHelp)};
  border: 1px solid;
  border-color: ${({
    is_active,
    color,
    theme: {
      colors: { alterText },
    },
  }) => (is_active ? color : alterText)};
  opacity: ${({ is_active }) => (is_active ? 1 : 0.8)};
  * {
    cursor: pointer;
  }
`;

export const CheckBlock = styled(Row)<{ is_active: boolean; color: string }>`
  border-left: 1px solid;
  border-color: ${({
    is_active,
    color,
    theme: {
      colors: { alterText },
    },
  }) => (is_active ? color : alterText)};
`;

export const ChartBlock = styled(Block)`
  border-radius: 6px;
  border: 1px dashed ${({ theme }) => theme.colors.alterHelp};
`;

export const ExpandedChartContainer = styled(Card)`
  width: calc(100vw - 100px);
  height: calc(100vh - 100px);
  top: 50px;
  left: 50px;
  z-index: 1001;
`;

export const CloseBlock = styled(Block)`
  cursor: pointer;
  right: 30px;
  top: 25px;
`;

export const BlurRow = styled(Row)`
  background: ${({ theme }) => theme.colors.bgColor + 'cc'};
  backdrop-filter: blur(5px);
  top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export const ModalLayout = styled(Layout)<{ show: boolean }>`
  ${center}
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.bgColor};
`;
