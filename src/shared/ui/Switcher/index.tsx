import { memo, useCallback } from 'react';
import { styled, useTheme } from 'styled-components';

import { Circle, Grid, Row } from '../Containers';
import { Main } from '../Typography';
import { SmallLoader } from '../Loaders';

export const SwitcherContainer = styled(Grid)`
  width: 100%;
  height: 36px;
  background: ${({ theme: { colors } }) => colors.alterBg};
  border-radius: 6px;
  align-items: center;
`;

export const Slider = styled.div<{ isRotated: boolean }>`
  display: flex;
  position: absolute;
  left: ${({ isRotated }) => (isRotated ? '50%' : '0%')};
  transition: all 0.3s ease 0s;
  background: ${({ theme: { colors } }) => colors.alterHelp};
  border-radius: 4px;
  width: 50%;
  height: 100%;
`;

type TabProps = {
  value: string;
  label: string;
  onChange: (selected: string) => void;
  selected: boolean;
};

const Tab = memo<TabProps>(({ value, label, onChange, selected }) => {
  const { colors } = useTheme();

  const handleClick = useCallback(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <Row onClick={handleClick} justify="center" style={{ zIndex: 1 }} pointer>
      <Main color={selected ? colors.textColor : colors.alterText}>{label}</Main>
    </Row>
  );
});

type SwitcherProps = {
  selected: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const TabSwitcher = memo<SwitcherProps>(({ selected, options, onChange }) => {
  const isRotated = selected === options[1].value;
  return (
    <SwitcherContainer
      colTemplate={`repeat(${options.length},1fr)`}
      rowTemplate="none"
      colGap="0"
      rowGap="0"
      pos="relative"
    >
      <Slider isRotated={isRotated} />
      {options.map(({ value, label }) => (
        <Tab
          key={value}
          label={label}
          value={value}
          onChange={onChange}
          selected={selected === value}
        />
      ))}
    </SwitcherContainer>
  );
});

const SwitcherBlock = styled.div<{ isActive: boolean; disabled: boolean }>`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  display: flex;
  position: relative;
  width: 28px;
  height: 14px;
  border: 1px solid
    ${({ isActive, theme: { colors } }) => (isActive ? colors.subAccentMain : colors.alterHelp)};
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background: ${({ isActive }) => (isActive ? 'rgba(98, 93, 246, 0.15)' : 'transparent')};
`;

const CircleSlider = styled(Circle)<{ turned: boolean }>`
  position: absolute;
  width: 11px;
  height: 11px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  background: ${({ turned, theme: { colors } }) =>
    turned ? colors.subAccentMain : colors.alterHelp};
  top: 0.5px;
  left: ${({ turned }) => (turned ? '14.5px' : '0.5px')};
`;

interface ToggleSwitcherProps {
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const ToggleSwitcher = memo<ToggleSwitcherProps>(
  ({ value, onChange, disabled, loading }) => {
    if (loading) return <SmallLoader size={20} />;
    return (
      <SwitcherBlock onClick={onChange} isActive={value} disabled={!!disabled}>
        <CircleSlider turned={value} />
      </SwitcherBlock>
    );
  }
);
