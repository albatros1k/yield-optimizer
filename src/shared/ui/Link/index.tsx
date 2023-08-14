import { styled } from 'styled-components';
import { FC } from 'react';

import { icons } from '../../Icons';
import { ButtonText } from '../Typography';

const LinkContainer = styled.a.attrs(() => ({ rel: 'noopener noreferrer', target: '_blank' }))`
  display: flex;
  align-items: center;
  > svg {
    width: 12px;
    height: 12px;
    path {
      stroke: ${({ theme: { colors } }) => colors.alterText};
    }
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
