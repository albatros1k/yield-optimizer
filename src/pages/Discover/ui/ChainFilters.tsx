import { FC, memo, useCallback } from 'react';

import { ChainEntity } from '../../../features/data/entities/chain';
import { selectFilterChainIds } from '../../../features/data/selectors/filtered-vaults';
import { filteredVaultsActions } from '../../../features/data/reducers/filtered-vaults';

import { useAppDispatch, useAppSelector } from '../../../store';

import { ChainButtonSelector } from './ChainButtonSelector';

interface ChainFiltersProps {}

export const ChainFilters: FC<ChainFiltersProps> = memo(() => {
  const dispatch = useAppDispatch();
  const selectedChainIds = useAppSelector(selectFilterChainIds);

  const handleChainSelectorChange = useCallback(
    (selected: ChainEntity['id'][]) => {
      dispatch(filteredVaultsActions.setChainIds(selected));
    },
    [dispatch]
  );

  return <ChainButtonSelector selected={selectedChainIds} onChange={handleChainSelectorChange} />;
});
