import styled from 'styled-components';

export const Spacer = styled.div<{ space?: number }>`
  height: ${({ space = 20 }) => space}px;
  width: 100%;
`;

export const Line = styled.div<{ m?: string }>`
  width: 100%;
  margin: ${({ m }) => m || '0'};
  border-top: 1px solid ${({ theme: { colors } }) => colors.alterHelp};
`;

export const VerticalLine = styled.div<{ m?: string }>`
  height: 100%;
  margin: ${({ m }) => m || '0'};
  border-left: 1px solid ${({ theme: { colors } }) => colors.alterHelp};
`;
