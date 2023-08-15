import { memo, useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import type { InputBaseProps } from '@material-ui/core/InputBase/InputBase';

import { BIG_ZERO } from '../../../../../helpers/big-number';
import { DefaultInput } from '../../../../../shared/ui/Inputs';

function isValidNumberInputString(value: string): boolean {
  const regex = new RegExp(`^[0-9]*\\.?[0-9]*$`);
  return !!value.match(regex);
}

function numberInputStringToNumber(value: string): BigNumber {
  const parsedText = value.replace(/[^0-9.]+/g, '').replace(/\.$/, '');
  return new BigNumber(parsedText);
}

function numberToString(value: BigNumber, maxDecimals: number): string {
  if (value.lte(BIG_ZERO)) {
    return '';
  }

  return value.decimalPlaces(maxDecimals, BigNumber.ROUND_FLOOR).toString(10);
}

export type AmountInputProps = {
  value: BigNumber;
  maxValue?: BigNumber;
  maxDecimals?: number;
  onChange: (value: BigNumber, isMax: boolean) => void;
  error?: boolean;
};

export const AmountInput = memo<AmountInputProps>(function AmountInput({
  value,
  maxValue,
  onChange,
  maxDecimals = 2,
  error = false,
}) {
  const [input, setInput] = useState(() => {
    return numberToString(value, maxDecimals);
  });

  const handleChange = useCallback<InputBaseProps['onChange']>(
    e => {
      const rawInput = e.target.value;

      // empty
      if (rawInput.length === 0) {
        setInput('');
        onChange(BIG_ZERO, false);
        return;
      }

      if (rawInput === '.') {
        setInput('0.');
        onChange(BIG_ZERO, false);
        return;
      }

      // Don't let user type if invalid number input
      if (!isValidNumberInputString(rawInput)) {
        return;
      }

      // Convert string input to number
      const parsedNumber = numberInputStringToNumber(rawInput);

      // Check valid number
      if (parsedNumber.isNaN() || !parsedNumber.isFinite() || parsedNumber.isNegative()) {
        setInput('');
        onChange(BIG_ZERO, false);
        return;
      }

      // Can't go above max
      if (maxValue && parsedNumber.gt(maxValue)) {
        setInput(numberToString(maxValue, maxDecimals));
        onChange(maxValue, true);
        return;
      }

      // Raise changed event
      setInput(rawInput);
      onChange(parsedNumber, maxValue && parsedNumber.gte(maxValue));
    },
    [setInput, maxDecimals, onChange, maxValue]
  );

  const handleBlur = useCallback<InputBaseProps['onBlur']>(
    e => {
      const rawInput = e.target.value;

      if (rawInput.length === 0) {
        return;
      }

      if (rawInput === '.') {
        setInput('');
      } else {
        const parsedNumber = numberInputStringToNumber(rawInput);
        setInput(numberToString(parsedNumber, maxDecimals));
      }
    },
    [setInput, maxDecimals]
  );

  useEffect(() => {
    setInput(numberToString(value, maxDecimals));
  }, [value, setInput, maxDecimals]);

  useEffect(() => {
    if (maxValue && value.gt(maxValue)) {
      onChange(maxValue, true);
    }
  }, [value, maxValue, onChange]);

  return (
    <DefaultInput
      value={input}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      placeholder="0"
      inputMode="decimal"
      autoFocus
    />
  );
});
