import { Fragment } from 'react';

import { Spacer } from '../../../shared/ui/Spacer';

import { DeFiJourney } from './DefiJourney';
import { BestVaults } from './BestVaults';
import { AllVaults } from './AllVaults';

const Discover = () => {
  return (
    <Fragment>
      <DeFiJourney />
      <Spacer space={52} />
      <BestVaults />
      <Spacer space={52} />
      <AllVaults />
    </Fragment>
  );
};

export default Discover;
