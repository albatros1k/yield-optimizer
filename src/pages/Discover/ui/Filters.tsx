import { FC, Fragment, memo } from 'react';

import { Spacer } from '../../../shared/ui/Spacer';

import { ChainFilters } from './ChainFilters';
import { CategoryFilter } from './CategoryFilter';

interface FiltersProps {}

export const Filters: FC<FiltersProps> = memo(() => {
  return (
    <Fragment>
      <ChainFilters />
      <Spacer />
      <CategoryFilter />
    </Fragment>
  );
});
