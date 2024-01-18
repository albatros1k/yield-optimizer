import { TwitterShareButton } from 'react-share';
import styled from 'styled-components';

export const TwitterBtn = styled(TwitterShareButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 32px;
  background-color: ${({ theme: { colors } }) => colors.alterHelp} !important;
  border-radius: 6px;
  cursor: pointer;
`;
