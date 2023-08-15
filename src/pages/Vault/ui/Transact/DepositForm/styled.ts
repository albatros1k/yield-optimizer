import { styled } from 'styled-components';

import { Card } from '../../../../../shared/ui/Containers';

export const ActionTable = styled(Card)`
  padding: 18px 24px;
  border: ${({ theme: { colors } }) => `1px solid ${colors.alterHelp}`};
`;
