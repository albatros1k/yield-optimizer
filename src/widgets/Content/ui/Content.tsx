import { Suspense } from 'react';
import { Route, Switch } from 'react-router';

import { Column } from '../../../shared/ui/Containers';
import { ContentWrapper } from './styled';
import { TechLoader } from '../../../components/TechLoader';

import { DiscoverAsync as Discover } from '../../../pages/Discover';
import { VaultDetailsAsync as Vault } from '../../../pages/Vault';

export const Content = () => {
  return (
    <ContentWrapper>
      <Column maxW="1180px" w="100%">
        <Suspense fallback={<TechLoader />}>
          <Switch>
            <Route exact path="/">
              <Discover />
            </Route>
            <Route strict sensitive exact path={['/:network/vault/:id', '/vault/:id']}>
              <Vault />
            </Route>
            <Route>
              <div>Not Found</div>
            </Route>
          </Switch>
        </Suspense>
      </Column>
    </ContentWrapper>
  );
};
