import { Fragment } from 'react';

import { H2 } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';

import { Filters } from './Filters';
import { VaultList } from './VaultList';
import { SortHeading } from './SortHeading';

export const AllVaults = () => {
  return (
    <Fragment>
      <H2 m="0 0 32px">All Vaults & Strategies</H2>
      <Filters />
      <Spacer space={32} />
      <SortHeading />
      <VaultList />
    </Fragment>
  );
};
