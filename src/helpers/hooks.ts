import { useCallback, useState } from 'react';
import * as blockies from 'blockies-ts';

import { useAppSelector } from '../store';
import { selectWalletAddressIfKnown } from '../features/data/selectors/wallet';

export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback((): void => setValue(value => !value), []);

  return [value, toggleValue];
};

export const useBlockies = (): string => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);
  const blockiesIcon: string = blockies.create({ seed: walletAddress }).toDataURL();
  return blockiesIcon;
};
