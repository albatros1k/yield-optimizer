import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { selectFilterVaultType } from '../../../features/data/selectors/filtered-vaults';
import {
  FilteredVaultsState,
  filteredVaultsActions,
} from '../../../features/data/reducers/filtered-vaults';
import { TYPE_OPTIONS } from '../../../features/home/components/Filters/components/VaultTypeFilters/type-options';

import { ToggleButtonsProps } from '../../../components/ToggleButtons';
import { useAppDispatch, useAppSelector } from '../../../store';

import { TripleSwitcher } from './ToggleSwitcher';

export const VaultTypeFilter = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const options: Record<string, string> = useMemo(
    () => Object.fromEntries(Object.entries(TYPE_OPTIONS).map(([key, label]) => [key, t(label)])),
    [t]
  );
  const value = useAppSelector(selectFilterVaultType);

  const handleChange = useCallback<ToggleButtonsProps['onChange']>(
    value => {
      dispatch(filteredVaultsActions.setVaultType(value as FilteredVaultsState['vaultType']));
    },
    [dispatch]
  );

  return <TripleSwitcher value={value} options={options} onChange={handleChange} />;
});
