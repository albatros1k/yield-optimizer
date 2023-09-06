import { styled } from 'styled-components';
import { Row } from '../../../shared/ui/Containers';
import { center, transition } from '../../../shared/styles/mixins';

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
