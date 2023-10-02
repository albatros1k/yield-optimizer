import { styled } from 'styled-components';
import { FC } from 'react';

import { icons } from '../../Icons';
import { ButtonText } from '../Typography';
import { lineAnimation } from '../../styles/animations';

const LinkContainer = styled.a.attrs(() => ({ rel: 'noopener noreferrer', target: '_blank' }))`
  display: flex;
  position: relative;
  align-items: center;
  > svg {
    width: 12px;
    height: 12px;
    path {
      stroke: ${({ theme: { colors } }) => colors.alterText};
    }
  }
  transition: color 0.3s ease;
  &:hover::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    background: ${({ theme: { colors } }) => colors.textColor};
    height: 1px;
    animation: ${lineAnimation} 0.3s forwards;
  }
`;

interface LinkBtnProps {
  href: string;
  text: string;
}

export const LinkBtn: FC<LinkBtnProps> = ({ href, text }) => {
  const { externalLink } = icons;
  return (
    <LinkContainer href={href}>
      <ButtonText m="0 4px 0 0">{text}</ButtonText>
      {externalLink}
    </LinkContainer>
  );
};
