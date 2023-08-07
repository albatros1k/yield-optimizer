import { Fragment } from 'react';

import { Spacer } from '../../../shared/ui/Spacer';

import { DeFiJourney } from './DefiJourney';
import { BestVaults } from './BestVaults';

const Discover = () => {
  return (
    <Fragment>
      <DeFiJourney />
      <Spacer space={52} />
      <BestVaults />
    </Fragment>
  );
};

export default Discover;
