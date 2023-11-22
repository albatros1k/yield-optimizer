import { Fragment } from 'react';

import { H2 } from '../../../shared/ui/Typography';
import { Column, Grid } from '../../../shared/ui/Containers';

import { DailyMissions } from './DailyMissions';
import { SrarDustInfo } from './SrarDustInfo';
import { UserList } from './UserList';

const Leaderboard = () => {
  return (
    <Fragment>
      <H2 m="0 0 32px">Odysea STARDUST Leaderboard</H2>
      <Grid
        w="100%"
        colTemplate="0.57fr 0.43fr"
        colGap="20px"
        rowGap="20px"
        rowTemplate="100%"
        align="flex-start"
      >
        <UserList />
        <Column h="100%" justify="space-between">
          <DailyMissions />
          <SrarDustInfo />
        </Column>
      </Grid>
    </Fragment>
  );
};

export default Leaderboard;
