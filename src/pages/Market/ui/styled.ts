import styled from 'styled-components';

import { center, transition } from '../../../shared/styles/mixins';
import { Card, Row } from '../../../shared/ui/Containers';

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

export const PaginatorRow = styled(Row)`
  .paginator {
    padding: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    > li {
      ${transition}
      border-radius:4px;
      min-width: 42px;
      height: 42px;
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.subAccentMain};
      color: ${({ theme }) => theme.colors.subAccentMain};
      margin-right: 10px;
      list-style-type: none;
      cursor: pointer;
      &:nth-last-child(2) {
        margin-right: 0;
      }
      &:first-child {
        margin: 0 auto 0 0;
      }
      &:last-child {
        margin: 0 0 0 auto;
      }
      &.selected {
        border-color: ${({ theme }) => theme.colors.alterText};
        color: ${({ theme }) => theme.colors.alterText};
      }
      &.disabled {
        border-color: ${({ theme }) => theme.colors.alterHelp};
        color: ${({ theme }) => theme.colors.alterHelp};
      }
      > a {
        ${center}
        min-width: 40px;
        height: 40px;
        font-size: 14px;
        padding: 0 5px;
      }
    }
  }
`;
