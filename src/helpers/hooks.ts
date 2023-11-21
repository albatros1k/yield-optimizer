import { useCallback, useState } from 'react';
import * as blockies from 'blockies-ts';

import { useAppSelector } from '../store';
import { selectWalletAddressIfKnown } from '../features/data/selectors/wallet';
import { useTheme } from 'styled-components';

export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback((): void => setValue(value => !value), []);

  return [value, toggleValue];
};

export const useBlockies = (address?: string): string => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const blockiesIcon: string = blockies.create({ seed: address || walletAddress }).toDataURL();
  return blockiesIcon;
};

export const useColor = (): ((v: number) => string) => {
  const { colors } = useTheme();
  const defineColor = (value: number): string =>
    value > 0 ? colors.subAccentSecondary : value < 0 ? colors.red : colors.alterText;
  return defineColor;
};
