import { styled } from 'styled-components';

import { Column } from '../../../shared/ui/Containers';

export const RiskContainer = styled(Column)<{ mb?: string }>`
  & > div:not(:last-child) {
    margin-bottom: ${({ mb = '20px' }) => mb};
  }
`;

export const BlurredOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
`;
