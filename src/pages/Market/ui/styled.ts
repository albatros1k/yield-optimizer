import styled from 'styled-components';

import { transition } from '../../../shared/styles/mixins';
import { Card } from '../../../shared/ui/Containers';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-wrap: break-word;
  * {
    box-sizing: border-box;
  }
  thead {
    height: 66px;
  }
  tr {
    position: relative;
    th,
    td {
      padding-right: 10px;
      word-break: break-all;
      overflow: hidden;
      &:first-child {
        padding-left: 30px;
        width: 230px;
      }
      &:last-child {
        padding-right: 30px;
        width: 50px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.alterHelp};
    }
  }
  tbody {
    tr {
      ${transition}
      cursor:pointer;
      height: 85px;
      &:last-child,
      &.unvisible {
        &::after {
          display: none;
        }
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.bgColor};
      }
    }
  }
`;

export const TypeButton = styled(Card)<{ isActive: boolean }>`
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.subAccentMain : theme.colors.alterHelp)};
  * {
    cursor: pointer;
  }
`;
