import { FC, MouseEventHandler } from 'react';
import { styled, useTheme } from 'styled-components';

import { SubTitle } from '../Typography';
import { transition } from '../../styles/mixins';
import { InfoTooltip } from '../Tooltip';
import { SvgContainer } from '../Containers';
import { icons } from '../../Icons';

export const ClickableLabel = styled.button<{ is_asc: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  > * {
    cursor: pointer;
  }
  &:hover {
    ${SubTitle} {
      ${transition}
      color: ${({ theme: { colors } }) => colors.textColor};
    }
  }
  svg {
    ${transition}
    transform: ${({ is_asc }) => (is_asc ? 'none' : 'rotate(180deg)')};
  }
`;

interface SortLabelProps {
  title: string;
  is_active: boolean;
  is_asc: boolean;
  cb: MouseEventHandler;
  disabled?: boolean;
  info?: string;
}

export const SortLabel: FC<SortLabelProps> = ({
  title,
  is_active,
  is_asc,
  cb,
  disabled = false,
  info,
}) => {
  const { colors } = useTheme();

  return (
    <ClickableLabel onClick={cb} is_asc={is_asc} disabled={disabled}>
      <SubTitle
        dotted={true}
        color={is_active ? colors.textColor : colors.alterText}
        m={is_active ? '0 7px 0 0' : '0'}
      >
        {title}
      </SubTitle>
      {is_active ? <SvgContainer>{icons.arrow}</SvgContainer> : null}
      {info ? (
        <InfoTooltip
          text={info}
          id={info}
          iconColor={is_active ? colors.textColor : colors.alterText}
        />
      ) : null}
    </ClickableLabel>
  );
};
