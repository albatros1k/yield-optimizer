import { styled } from 'styled-components';

import { IBlock } from '../../styles/types';
import { block } from '../../styles/mixins';

export const Image = styled.img<IBlock>`
  ${block}
  object-fit: cover;
  overflow: clip;
  overflow-clip-margin: content-box;
`;

export const Logo = styled(Image)`
  width: 140px;
  height: 64px;
`;

export const CircleImage = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`;

export const SquareImage = styled(Image)`
  border-radius: 4px;
`;
