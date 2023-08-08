import { Fragment } from 'react';

import { H2 } from '../../../shared/ui/Typography';

import { Filters } from './Filters';

export const AllVaults = () => {
  return (
    <Fragment>
      <H2 m="0 0 32px">All Vaults & Strategies</H2>
      <Filters />
    </Fragment>
  );
};
