import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

import { IBlock } from '../../styles/types';
import { block } from '../../styles/mixins';
import { Block } from '../Containers';

export const DefaultInput = styled.input<IBlock & { error?: boolean }>`
  ${block}
  display: flex;
  align-items: center;
  position: relative;
  all: unset;
  width: 100%;
  height: 100%;
  color: ${({ theme: { colors } }) => colors.textColor};
  font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
  border: ${({ error, theme }) => (error ? `1px solid ${theme.colors.red}` : 'none')};
  &::placeholder {
    font-weight: ${({ theme: { fonts } }) => fonts.h1.fontWeight};
    font-size: ${({ theme: { fonts } }) => fonts.h1.size + 'px'};
    color: ${({ theme: { colors } }) => colors.alterText};
  }
`;

export const MainInput = styled(DefaultInput)`
  font-weight: ${({ theme: { fonts } }) => fonts.main.fontWeight};
  font-size: ${({ theme: { fonts } }) => fonts.main.size + 'px'};
  &::placeholder {
    font-weight: ${({ theme: { fonts } }) => fonts.main.fontWeight};
    font-size: ${({ theme: { fonts } }) => fonts.main.size + 'px'};
  }
`;

export const WalletInput = styled(MainInput)<IBlock & { isValid: boolean }>`
  border: 1px solid
    ${({ isValid, theme: { colors } }) => (isValid ? colors.accentMain : colors.red)};
  height: 36px;
  border-radius: 6px;
  width: ${({ w }) => w};
  padding: 0 18px;
  background: ${({ theme: { colors } }) => colors.alterBg};
  &:placeholder-shown {
    border: 1px solid ${({ theme: { colors } }) => colors.alterHelp};
  }
`;

export const InputContainer = styled(Block)<IBlock & { hasBorder: boolean }>`
  display: flex;
  position: relative;
  &::after {
    content: '';
    width: 100%;
    height: ${({ hasBorder }) => Number(hasBorder)}px;
    left: 0;
    top: 28px;
    background-color: ${({ theme: { colors } }) => colors.alterHelp};
    position: absolute;
  }
`;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange?: (val: string) => void;
  hasBorder?: boolean;
  value?: string;
  w?: string;
  h?: string;
  m?: string;
}

export const Input = memo<InputProps>(
  ({ onChange, value, w = '256px', h = '28px', m = '0px', hasBorder = true, ...otherProps }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange?.(e.target.value);
    };

    return (
      <InputContainer {...{ w, m, h, hasBorder }}>
        <MainInput {...otherProps} value={value} onChange={onChangeHandler} p="0 20px" />
      </InputContainer>
    );
  }
);
