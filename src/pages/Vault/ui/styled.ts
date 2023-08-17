import { styled } from 'styled-components';

import { Column } from '../../../shared/ui/Containers';

export const RiskContainer = styled(Column)<{ mb?: string }>`
  & > div:not(:last-child) {
    margin-bottom: ${({ mb = '20px' }) => mb};
  }
`;
