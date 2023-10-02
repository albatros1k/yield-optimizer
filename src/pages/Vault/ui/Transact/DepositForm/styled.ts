import { styled } from 'styled-components';

import { Card } from '../../../../../shared/ui/Containers';
import { SubTitle } from '../../../../../shared/ui/Typography';
import { lineAnimation } from '../../../../../shared/styles/animations';

export const ActionTable = styled(Card)`
  padding: 18px 24px;
  border: ${({ theme: { colors } }) => `1px solid ${colors.alterHelp}`};
`;

export const MaxTitle = styled(SubTitle)`
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.subAccentSecondary};
  &:hover::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    background: ${({ theme: { colors } }) => colors.subAccentSecondary};
    height: 1px;
    animation: ${lineAnimation} 0.3s forwards;
  }
`;
