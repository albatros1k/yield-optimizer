import { styled } from 'styled-components';

import { ButtonText } from '../Typography';
import { center } from '../../styles/mixins';
import { memo } from 'react';

export const LinearContainer = styled.div<{ h?: number; m?: string }>`
  display: flex;
  width: 100%;
  height: ${({ h = 30 }) => `${h}px`};
  background: ${({ theme: { colors } }) => colors.alterHelp};
  border-radius: 6px;
  position: relative;
  margin: ${({ m }) => m};
`;

const ChartBar = styled.div<{ percent: number }>`
  ${center}
  background-color: ${({ theme: { colors } }) => colors.subAccentSecondary};
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  border-radius: 6px;
  transition: all 0.3s ease-out 0s;
`;

interface LinearChartProps {
  value: number;
  maxValue: number;
  m?: string;
}

export const LinearChart = memo<LinearChartProps>(({ value, maxValue, m = '0px' }) => {
  const percent = (value / maxValue) * 100;
  return (
    <LinearContainer m={m}>
      <ChartBar percent={percent}>{percent > 1 ? <ButtonText>{value}</ButtonText> : null}</ChartBar>
    </LinearContainer>
  );
});
