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

const CustomTooltip = styled(ReactTooltip)<{ maxW: string; p: string }>`
  max-width: ${({ maxW }) => maxW};
  padding: ${({ p }) => p};
  visibility: visible;
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
  maxW?: string;
  p?: string;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({
  m = '0',
  id,
  text,
  place = 'top',
  Component,
  iconSize = 9,
  icon,
  maxW = '220px',
  p = '8px 21px',
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
      <CustomTooltip
        maxW={maxW}
        backgroundColor={colors.additionalBg}
        id={id}
        place={place}
        type="dark"
        effect="solid"
        p={p}
      >
        {Component || (
          <SubTitle maxW="250px" color={colors.textColor}>
            {text}
          </SubTitle>
        )}
      </CustomTooltip>
    </TooltipRow>
  );
};
