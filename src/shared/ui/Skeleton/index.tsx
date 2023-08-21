import styled from 'styled-components';

import { Block } from '../Containers';
import { growHeight, growWidth } from '../../styles/animations';

export const SkeletonContent = styled(Block)`
  background: ${({ theme: { colors } }): string => colors.bgColor};
  border-radius: 6px;
  animation: ${growWidth} 1.5s infinite;
`;

export const GraySkeletonContent = styled(SkeletonContent)`
  background: ${({ theme: { colors } }) => colors.alterHelp};
`;

export const SkeletonCircle = styled(Block)`
  background: ${({ theme: { colors } }): string => colors.bgColor};
  border-radius: 50%;
`;

export const SkeletonContentVertical = styled(Block)`
  background: ${({ theme: { colors } }): string => colors.bgColor};
  border-radius: 6px;
  animation: ${growHeight} 1.5s infinite;
`;
