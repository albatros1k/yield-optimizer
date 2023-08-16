import { styled } from 'styled-components';

import { ScrollProps, flexProps, scroll } from '../../../../../shared/styles/mixins';
import { Card, Column } from '../../../../../shared/ui/Containers';
import { IFlex } from '../../../../../shared/styles/types';

export const ScrollContainer = styled(Column)<ScrollProps>`
  max-height: 280px;
  width: 100%;
  overflow-y: auto;
  ${scroll}
  & > div:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ListItemContainer = styled(Card)<IFlex>`
  ${flexProps}
  justify-content:space-between;
  align-items: center;
  min-height: 46px;
  border: 1px solid ${({ theme: { colors } }) => colors.alterHelp};
  width: 95%;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    transform: translateX(3px);
  }
`;
