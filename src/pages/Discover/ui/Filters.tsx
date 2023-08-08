import { FC, Fragment, memo } from 'react';
import { ChainFilters } from './ChainFilters';

interface FiltersProps {}

export const Filters: FC<FiltersProps> = memo(() => {
  return (
    <Fragment>
      <ChainFilters />
    </Fragment>
  );
});
