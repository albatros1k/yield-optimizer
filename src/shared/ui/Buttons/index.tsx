import { styled, useTheme } from 'styled-components';
import { FC, MouseEventHandler } from 'react';

import { IBlock } from '../../styles/types';
import { block, center, transition } from '../../styles/mixins';

import { Row, SvgContainer } from '../Containers';
import { SubTitle } from '../Typography';
import { icons } from '../../Icons';

export const Button = styled.button<IBlock & { borderColor?: string }>`
  ${block}
  ${center}
  ${transition}
  background: ${({ bg, theme: { colors } }) => bg || colors.accentMain};
  color: ${({ color, theme: { colors } }) => color || colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.button.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.button.size + 'px'};
  font-family: ${({ theme: { fonts } }) => fonts.button.fontFamily};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  border-radius: ${({ br = 6 }) => br}px;
  cursor: pointer;
  text-align: center;
  &:hover {
    opacity: 0.85;
  }
  &:active {
    transform: scale(1.02);
  }
  &:disabled {
    background: ${({ theme: { colors } }) => colors.alterHelp};
    color: ${({ theme: { colors } }) => colors.alterText};
  }
`;

export const ChainBtn = styled(Button)<{ selected: boolean }>`
  ${({ selected }) =>
    !selected &&
    `
      & .bg {
      fill: #2e324c;
    }
      & .fg {
      fill: #1b1e31;
    }
  `}
`;

export const ExpandButtonContainer = styled.button<
  IBlock & { isOpen: boolean; w?: string; h?: string }
>`
  ${block}
  ${center}
  width: ${({ w = '200px' }) => w};
  height: ${({ h = '32px' }) => h};
  border-radius: 6px;
  background: ${({ isOpen, theme: { colors } }) =>
    isOpen ? `${colors.alterText}1A` : `${colors.subAccentMain}1A`};
  outline: none;
  border: none;
  padding: 0 12px;
  user-select: none;
  cursor: pointer;
  * {
    cursor: pointer;
  }
`;

interface ExpandButtonProps {
  onClick?: () => void;
  isOpen: boolean;
  text?: string;
  w?: string;
  m?: string;
  h?: string;
}

export const ExpandButton: FC<ExpandButtonProps> = ({
  onClick,
  isOpen,
  text,
  w,
  m = '0 0 0 30px',
  h,
}) => {
  const {
    colors: { subAccentMain, alterText },
  } = useTheme();

  return (
    <ExpandButtonContainer w={w} h={h} onClick={onClick} isOpen={isOpen} m={m}>
      <Row w="100%" align="center" justify="space-between">
        <SubTitle color={isOpen ? alterText : subAccentMain} dotted>
          {text}
        </SubTitle>
        <SvgContainer
          tf={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
          size={13}
          stroke={isOpen ? alterText : subAccentMain}
        >
          {icons.arrow}
        </SvgContainer>
      </Row>
    </ExpandButtonContainer>
  );
};

export const CircleOut = styled(Row)<{ is_active: boolean }>`
  ${transition}
  border-radius: 50%;
  border: 1px solid
    ${({ is_active, theme: { colors } }) => (is_active ? colors.subAccentMain : colors.alterHelp)};
`;

export const CircleIn = styled(Row)<{ is_active: boolean }>`
  ${transition}
  border-radius: 50%;
  background-color: ${({ is_active, theme: { colors } }) =>
    is_active ? colors.subAccentMain : 'transparent'};
`;

interface RadioButtonProps {
  is_active: boolean;
  cb?: MouseEventHandler;
}

export const RadioButton: FC<RadioButtonProps> = ({ is_active, cb }) => {
  const {
    fonts: {
      main: { size },
    },
  } = useTheme();

  return (
    <CircleOut
      pointer
      w={size + 'px'}
      h={size + 'px'}
      is_active={is_active}
      onClick={cb}
      align="center"
      justify="center"
    >
      <CircleIn pointer w={size / 2 + 'px'} h={size / 2 + 'px'} is_active={is_active} />
    </CircleOut>
  );
};
