import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { selectFilterVaultCategory } from '../../../features/data/selectors/filtered-vaults';
import {
  FilteredVaultsState,
  filteredVaultsActions,
} from '../../../features/data/reducers/filtered-vaults';
import { CATEGORY_OPTIONS } from '../../../features/home/components/Filters/components/VaultCategoryFilters/category-options';

import { ToggleButtonsProps } from '../../../components/ToggleButtons';
import { ToggleButtons } from './ToggleButtons';

import { useAppDispatch, useAppSelector } from '../../../store';

export const CategoryFilter = memo(() => {
  const allKey = 'all';

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const options: Record<string, string> = useMemo(() => {
    const { beefy, ...withoutBeefy } = CATEGORY_OPTIONS; // eslint-disable-line
    return Object.fromEntries(
      Object.entries(withoutBeefy)
        .filter(([key]) => key !== allKey)
        .map(([key, label]) => [key, t(label)])
    );
  }, [t]);

  const value = useAppSelector(selectFilterVaultCategory);

  const handleChange = useCallback<ToggleButtonsProps['onChange']>(
    value => {
      dispatch(
        filteredVaultsActions.setVaultCategory(value as FilteredVaultsState['vaultCategory'])
      );
    },
    [dispatch]
  );

  return (
    <ToggleButtons value={value} options={options} onChange={handleChange} untoggleValue={allKey} />
  );
});
