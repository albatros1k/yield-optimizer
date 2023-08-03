import styled from 'styled-components';

import { block, dots } from '../../styles/mixins';
import { IBlock } from '../../styles/types';

export const Title = styled.h1<{ dotted?: boolean }>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.title.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.title.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.title.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const H1 = styled.h1<IBlock>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.h1.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const H2 = styled.h2<IBlock>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h2.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h2.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.h2.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const H3 = styled.h3<IBlock>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h3.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h3.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.h3.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const H4 = styled.h3<IBlock>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h4.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h4.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.h4.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const Nav = styled.p<IBlock & { upper?: boolean }>`
  ${block}
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.nav.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.nav.size + 'px'};
  text-transform: ${({ upper = false }) => (upper ? 'uppercase' : 'auto')};
  font-family: ${({ theme: { fonts } }) => fonts.nav.fontFamily};
  ${({ dotted }) => (dotted ? dots : '')};
`;

export const Main = styled(Nav)`
  font-weight: ${({ theme: { fonts } }) => fonts.main.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.main.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.main.fontFamily};
`;

export const DataTitle = styled(Main)`
  font-weight: ${({ theme: { fonts } }) => fonts.dataTitle.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.dataTitle.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.dataTitle.fontFamily};
`;

export const ButtonText = styled(Main)`
  font-weight: ${({ theme: { fonts } }) => fonts.button.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.button.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.button.fontFamily};
`;

export const SubTitle = styled(Main)`
  font-weight: ${({ theme: { fonts } }) => fonts.subtitle.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.subtitle.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.subtitle.fontFamily};
`;

export const Input = styled(SubTitle)`
  font-weight: ${({ theme: { fonts } }) => fonts.input.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.input.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.input.fontFamily};
`;

export const Caption = styled(Input)`
  font-weight: ${({ theme: { fonts } }) => fonts.caption.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.caption.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.caption.fontFamily};
`;

export const Tag = styled(Caption)`
  font-weight: ${({ theme: { fonts } }) => fonts.tag.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.tag.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.tag.fontFamily};
`;
