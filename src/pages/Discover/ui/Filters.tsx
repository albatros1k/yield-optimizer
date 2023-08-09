import { FC, Fragment, memo } from 'react';

import { Spacer } from '../../../shared/ui/Spacer';
import { Grid, GridItem } from '../../../shared/ui/Containers';

import { ChainFilters } from './ChainFilters';
import { CategoryFilter } from './CategoryFilter';
import { VaultTypeFilter } from './VaultTypeFilter';

interface FiltersProps {}

export const Filters: FC<FiltersProps> = memo(() => {
  return (
    <Fragment>
      <ChainFilters />
      <Spacer />
      <Grid w="100%" colTemplate="repeat(4, 1fr)" rowTemplate="none" colGap="20px" rowGap="none">
        <GridItem colStart={1} colEnd={4}>
          <CategoryFilter />
        </GridItem>
        <VaultTypeFilter />
      </Grid>
    </Fragment>
  );
});
