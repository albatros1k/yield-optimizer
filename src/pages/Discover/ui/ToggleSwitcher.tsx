import { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';

import { Row } from '../../../shared/ui/Containers';
import { Main } from '../../../shared/ui/Typography';

import { Slider, SwitcherContainer } from './styled';
import { ToggleButtonsProps } from './ToggleButtons';

export const TripleSwitcher = memo<ToggleButtonsProps>(
  ({ value, options, onChange, untoggleValue }) => {
    const [index, setIndex] = useState<number>(0);
    const { colors } = useTheme();

    const optionsList = useMemo(
      () => Object.entries(options).map(([value, label]) => ({ value, label })),
      [options]
    );

    const handleClick = useCallback(
      (newValue: string) => {
        if (untoggleValue) {
          onChange(newValue === value ? untoggleValue : newValue);
        } else {
          onChange(newValue);
        }
      },
      [onChange, untoggleValue, value]
    );

    return (
      <SwitcherContainer>
        <Slider index={index} />
        {optionsList.map(({ value: optionValue, label }, i) => {
          const onClick = () => {
            handleClick(optionValue);
            setIndex(i);
          };
          const selected = value === optionValue;
          return (
            <Row key={optionValue} onClick={onClick} justify="center" pointer style={{ zIndex: 1 }}>
              <Main color={selected ? colors.textColor : colors.alterText}>{label}</Main>
            </Row>
          );
        })}
      </SwitcherContainer>
    );
  }
);
