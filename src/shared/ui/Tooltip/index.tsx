import { FC } from 'react';
import { styled, useTheme } from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { Row } from '../Containers';
import { icons } from '../../Icons';
import { SubTitle } from '../Typography';

export const TooltipRow = styled(Row)<{ size: number }>`
  * {
    word-break: normal;
  }
  > svg {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    path {
      stroke: ${({ theme: { colors } }) => colors.alterText};
    }
  }
`;

interface InfoTooltipProps {
  iconColor?: string;
  iconSize?: number;
  m?: string;
  id: string;
  text?: string;
  Component?: JSX.Element;
  place?: 'top' | 'right' | 'bottom' | 'left';
  icon?: JSX.Element;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({
  m = '0',
  id,
  text,
  place = 'top',
  Component,
  iconSize = 9,
  icon,
}) => {
  const { colors } = useTheme();

  return (
    <TooltipRow
      w="20px"
      h="20px"
      align="center"
      justify="center"
      m={m}
      pointer={true}
      data-tip
      data-for={id}
      size={iconSize}
    >
      {icon || icons.info}
      <ReactTooltip
        backgroundColor={colors.bgColor}
        id={id}
        place={place}
        type="light"
        effect="solid"
        border={true}
        borderColor={colors.bgColor}
        arrowColor={colors.bgColor}
      >
        {Component || (
          <SubTitle maxW="250px" color={colors.textColor}>
            {text}
          </SubTitle>
        )}
      </ReactTooltip>
    </TooltipRow>
  );
};
