import { memo, useCallback } from 'react';
import { styled, useTheme } from 'styled-components';

import { Grid, Row } from '../Containers';
import { Main } from '../Typography';

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
