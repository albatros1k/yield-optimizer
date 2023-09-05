import { memo, useState } from 'react';
import { styled, useTheme } from 'styled-components';

import { icons } from '../../Icons';
import { RadioButton } from '../Buttons';
import { SmallLoader } from '../Loaders';
import { SubTitle } from '../Typography';
import { Block, Card, Row, SvgContainer } from '../Containers';

import { growDown } from '../../styles/animations';
import { transition } from '../../styles/mixins';

export const ListItem = styled(Row)<{ horizontalPadding: number }>`
  ${transition}
  * {
    cursor: pointer !important;
  }
  &:hover {
    background: ${({ horizontalPadding, theme: { colors } }) =>
      horizontalPadding ? colors.alterHelp : 'transparent'};
  }
  &::after {
    content: '';
    width: ${({ horizontalPadding }) => `calc(100% - ${horizontalPadding * 2}px)`};
    height: 1px;
    position: absolute;
    left: ${({ horizontalPadding }) => `${horizontalPadding}px`};
    bottom: 0;
    background: ${({ theme: { colors } }) => colors.bgColor};
  }
  &:last-child {
    &::after {
      display: none;
    }
  }
`;

interface DropDownContainer {
  is_menu_open: boolean;
  z_index?: number;
  disabled?: boolean;
}

export const DropDownContainer = styled(Row)<DropDownContainer>`
  ${transition}

  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ disabled, theme: { colors } }) =>
    disabled ? colors.alterHelp : colors.alterBg};
  border: 1px solid;
  border-color: ${({ is_menu_open, theme: { colors } }) =>
    is_menu_open ? colors.subAccentMain : colors.alterText};
  z-index: ${({ z_index }) => z_index || 'auto'};
  > svg {
    ${transition}
    transform: ${({ is_menu_open }) => (is_menu_open ? 'rotate(180deg)' : 'none')};
  }

  &:disabled {
    background-color: ${({ theme: { colors } }) => colors.alterHelp};
    border-color: ${({ theme: { colors } }) => colors.alterText};
    > svg {
      * {
        ${transition}
        stroke: ${({ theme: { colors } }) => colors.alterText};
      }
    }
  }
  * {
    cursor: pointer;
  }
`;

interface MenuProps {
  open: boolean;
  left?: number;
  top?: number;
  growUp?: boolean;
}

export const MenuContainer = styled(Card)<MenuProps>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${growDown} 300ms ease-in-out forwards;
  transform-origin: ${({ growUp }) => (growUp ? 'bottom' : 'top')} center;
  z-index: 1001;
  top: ${({ top = 45 }) => `${top}px`};
  left: ${({ left = -85 }) => `${left}px`};
  max-height: 257px;
  overflow-y: scroll;
`;

interface DropDownProps {
  label: string;
  valuesMap: { [key: string]: string };
  value: string;
  disabled?: boolean;
  onChange: (newValue: any) => void;
  m?: string;
  h?: number;
  w?: number;
  p?: string;
  optionPadding?: string;
  fullWidth?: boolean;
  loading?: boolean;
  labelPrefix?: string;
}

export const DropDown = memo<DropDownProps>(
  ({
    label,
    m,
    h = 50,
    w = 210,
    valuesMap,
    value,
    disabled,
    onChange,
    p = '10px 15px 10px 20px',
    optionPadding = '0 20px',
    fullWidth = false,
    loading = false,
    labelPrefix = '',
  }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { colors } = useTheme();

    const onChangeOpen = (val: boolean) => (): void => setOpen(val);

    const onSelect = (newValue: string) => (): void => {
      onChange(newValue);
    };

    const renderValues = (): JSX.Element[] => {
      return Object.entries(valuesMap).map(([key, val]: [string, string], i: number) => {
        return (
          <ListItem
            horizontalPadding={20}
            pos="relative"
            key={key + val + i}
            align="center"
            p={optionPadding}
            h="50px"
            w="100%"
            pointer={true}
            onClick={onSelect(key)}
            justify="flex-start"
          >
            <SubTitle maxW={`calc(100% - 22px)`} dotted={true} m="0 auto 0 0">
              {val}
            </SubTitle>
            <RadioButton is_active={key === value} />
          </ListItem>
        );
      });
    };

    return (
      <Block
        pos="relative"
        m={m}
        h={`${h}px`}
        w={fullWidth ? '100%' : `${w}px`}
        onMouseEnter={disabled || loading ? undefined : onChangeOpen(true)}
        onMouseLeave={disabled || loading ? undefined : onChangeOpen(false)}
      >
        <DropDownContainer
          z_index={open ? 1002 : undefined}
          pos="relative"
          is_menu_open={open}
          h="100%"
          p={p}
          w="100%"
          align="center"
          pointer={true}
        >
          <SubTitle
            color={disabled ? colors.alterText : colors.textColor}
            dotted={true}
            w={disabled ? '100%' : 'calc(100% - 30px)'}
          >
            {valuesMap[value] ? `${labelPrefix || ''}${valuesMap[value]}` : label}
          </SubTitle>
          {loading ? (
            <SmallLoader size={20} />
          ) : disabled ? null : (
            <SvgContainer stroke={open ? colors.subAccentMain : colors.textColor}>
              {icons.arrow}
            </SvgContainer>
          )}
        </DropDownContainer>
        <MenuContainer
          w="100%"
          top={h - 8}
          left={0}
          p="6px 0 0"
          pos="absolute"
          open={open && !loading}
        >
          {renderValues()}
        </MenuContainer>
      </Block>
    );
  }
);
