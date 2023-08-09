import { memo, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../../shared/ui/Buttons';
import { Row } from '../../../shared/ui/Containers';
import { Main } from '../../../shared/ui/Typography';

import { ToggleButtonProps } from '../../../components/ToggleButtons';

export const ToggleButton = memo<ToggleButtonProps & { selected: boolean }>(function ToggleButton({
  value,
  label,
  onClick,
  selected,
}) {
  const {
    colors: { textColor, alterText, alterBg },
  } = useTheme();

  const handleClick = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <Button bg={alterBg} w="fit-content" h="42px" m="0 10px 0 0" p="0 20px" onClick={handleClick}>
      <Main color={selected ? textColor : alterText}>{label}</Main>
    </Button>
  );
});

export interface ToggleButtonsProps {
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
  untoggleValue?: string;
}

export const ToggleButtons = memo<ToggleButtonsProps>(
  ({ value, options, onChange, untoggleValue }) => {
    const optionsList = useMemo(
      () => Object.entries(options).map(([value, label]) => ({ value, label })),
      [options]
    );

    const handleClick = useCallback(
      newValue => {
        if (untoggleValue) {
          onChange(newValue === value ? untoggleValue : newValue);
        } else {
          onChange(newValue);
        }
      },
      [onChange, untoggleValue, value]
    );

    return (
      <Row>
        {optionsList.map(({ value: optionValue, label }) => (
          <ToggleButton
            key={optionValue}
            value={optionValue}
            label={label}
            onClick={handleClick}
            selected={value === optionValue}
          />
        ))}
      </Row>
    );
  }
);
