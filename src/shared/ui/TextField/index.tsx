import { EventHandler, FC, memo } from 'react';
import { styled, useTheme } from 'styled-components';

import { Block } from '../Containers';
import { icons } from '../../Icons';

import { block, transition } from '../../styles/mixins';
import { IBlock } from '../../styles/types';
import { spin } from '../../styles/animations';

export const Spinner: FC<{ color?: string; size?: number }> = ({ color, size = 28 }) => {
  const {
    colors: { subAccentMain: mainBlue },
  } = useTheme();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.48 7.68018H15.52V11.5202H16.48V7.68018Z" fill={color || mainBlue} />
      <path
        d="M20.5757 9.03469L19.7443 8.55469L17.8243 11.8802L18.6557 12.3602L20.5757 9.03469Z"
        fill={color || mainBlue}
      />
      <path
        d="M23.4453 12.2557L22.9653 11.4243L19.6398 13.3443L20.1198 14.1757L23.4453 12.2557Z"
        fill={color || mainBlue}
      />
      <path d="M24.32 16.48V15.52H20.48V16.48H24.32Z" fill={color || mainBlue} />
      <path
        d="M22.9653 20.5755L23.4453 19.7441L20.1198 17.8241L19.6398 18.6555L22.9653 20.5755Z"
        fill={color || mainBlue}
      />
      <path
        d="M19.7443 23.4453L20.5757 22.9653L18.6557 19.6398L17.8243 20.1198L19.7443 23.4453Z"
        fill={color || mainBlue}
      />
      <path d="M15.52 24.3198H16.48V20.4798H15.52V24.3198Z" fill={color || mainBlue} />
      <path
        d="M11.4243 22.9653L12.2557 23.4453L14.1757 20.1198L13.3443 19.6398L11.4243 22.9653Z"
        fill={color || mainBlue}
      />
      <path
        d="M8.55467 19.7443L9.03467 20.5757L12.3602 18.6557L11.8802 17.8243L8.55467 19.7443Z"
        fill={color || mainBlue}
      />
      <path d="M7.67999 15.52V16.48H11.52V15.52H7.67999Z" fill={color || mainBlue} />
      <path
        d="M9.03467 11.4245L8.55467 12.2559L11.8802 14.1759L12.3602 13.3445L9.03467 11.4245Z"
        fill={color || mainBlue}
      />
      <path
        d="M12.2557 8.55467L11.4243 9.03467L13.3443 12.3602L14.1757 11.8802L12.2557 8.55467Z"
        fill={color || mainBlue}
      />
    </svg>
  );
};

export const Input = styled.input.attrs(({ pattern = '^0x[a-fA-F0-9]{40}$' }) => ({
  pattern,
}))<IBlock>`
  ${block}
  ${transition}
  transition-property: border;
  border-radius: 4px;
  background: ${({ theme: { colors } }) => colors.bgColor};
  border: 1px solid ${({ theme: { colors } }) => colors.alterHelp};
  color: ${({ theme: { colors } }) => colors.textColor};
  font-weight: 300;
  font-size: ${({ theme: { fonts } }) => fonts.subtitle.size}px;
  &::placeholder {
    font-weight: 300;
    color: ${({ theme: { colors } }) => colors.alterText};
  }
  &:focus {
    border-color: ${({ theme: { colors } }) => colors.subAccentMain};
    + svg {
      * {
        stroke: ${({ theme: { colors } }) => colors.subAccentMain};
      }
    }
  }
  &:invalid {
    border-color: ${({ theme: { colors } }) => colors.red};
    + svg {
      * {
        stroke: ${({ theme: { colors } }) => colors.red};
      }
    }
  }
  &:-webkit-autofill {
    box-shadow: 0 0 0 30px ${({ theme: { colors } }) => colors.textColor} inset !important;
    -webkit-box-shadow: 0 0 0 30px ${({ theme: { colors } }) => colors.textColor} inset !important;
    -webkit-text-fill-color: ${({ theme: { colors } }) => colors.textColor}!important;
  }
  &[type='password'] {
    letter-spacing: 0.2em;
    &::placeholder {
      letter-spacing: normal;
    }
  }
`;

export const InputContainer = styled(Block)<{ iconSize?: number }>`
  > svg {
    width: ${({ iconSize = 20 }) => `${iconSize}px`};
    height: ${({ iconSize = 20 }) => `${iconSize}px`};
    position: absolute;
    left: ${({ iconSize = 20 }) => `${20 - iconSize / 2}px`};
    top: ${({ iconSize = 20 }) => `calc(50% - ${iconSize / 2}px)`};
    * {
      ${transition}
    }
  }
`;

const SpinContainer = styled(Block)<{ inputHeight: number }>`
  animation: ${spin} 2s infinite linear;
  top: ${({ inputHeight }) => `${(inputHeight - 28) / 2}px`};
  right: 6px;
`;

interface TextFieldProps {
  type?: string;
  placeholder: string;
  w?: string;
  defaultValue?: string;
  value?: string;
  onChange: EventHandler<any>;
  inputHeight?: number;
  iconSize?: number;
  icon?: JSX.Element | null;
  pattern?: string;
  onKeyDown?: EventHandler<any>;
  onFocus?: EventHandler<any>;
  onBlur?: EventHandler<any>;
  key?: string;
  loading?: boolean;
  noIcon?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  p?: string;
  autoFocus?: boolean;
}

export const TextField = memo<TextFieldProps>(
  ({
    type = 'text',
    placeholder,
    w,
    onChange,
    value,
    defaultValue,
    inputHeight,
    iconSize,
    icon,
    pattern,
    onKeyDown,
    loading,
    onFocus,
    onBlur,
    noIcon = false,
    disabled,
    autoComplete,
    p,
    autoFocus,
  }) => {
    const IconComponent = icon || icons.search;

    return (
      <InputContainer {...{ w, iconSize, pos: 'relative' }}>
        <Input
          {...{
            placeholder,
            w: '100%',
            p: loading ? '0 40px' : p ? p : noIcon ? '0 20px' : '0 20px 0 40px',
            onChange,
            value,
            defaultValue,
            h: `${inputHeight || 40}px`,
            pattern,
            type,
            onKeyDown,
            onFocus,
            onBlur,
            disabled,
            autoComplete,
            autoFocus,
          }}
        />
        {noIcon ? null : IconComponent}
        {loading ? (
          <SpinContainer inputHeight={inputHeight || 40} h="28px" w="28px" pos="absolute">
            <Spinner size={28} />
          </SpinContainer>
        ) : null}
      </InputContainer>
    );
  }
);
