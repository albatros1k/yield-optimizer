import { Suspense } from 'react';
import { Route, Switch } from 'react-router';

import { ContentWrapper } from './styled';

import { useAppSelector } from '../../../store';

import { Column } from '../../../shared/ui/Containers';
import { Loader } from '../../../shared/ui/Loaders';

import { selectWalletAddressIfKnown } from '../../../features/data/selectors/wallet';

import { DiscoverAsync as Discover } from '../../../pages/Discover';
import { VaultDetailsAsync as Vault } from '../../../pages/Vault';
import { DashboardAsync as Dashboard } from '../../../pages/Dashboard';
import { RewardsAsync as Rewards } from '../../../pages/Rewards';
import { DebtAsync as Debts } from '../../../pages/Debt';
import { WelcomeAsync as Welcome } from '../../../pages/Welcome';
import { SwapAsync as Swap } from '../../../pages/Swap';
import { NotFoundAsync as NotFound } from '../../../pages/NotFound';
import { MarketAsync as Market } from '../../../pages/Market';
import { MarketPoolsAsync as MarketPools } from '../../../pages/MarketPools';
import { MarketPoolAsync as MarketPool } from '../../../pages/MarketPool';
import { MarketPoolProtocolAsync as MarketPoolProtocol } from '../../../pages/MarketPoolProtocol';

export const Content = () => {
  const walletAddress = useAppSelector(selectWalletAddressIfKnown);

  return (
    <ContentWrapper>
      <Column maxW="1180px" w="100%">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Discover />
            </Route>
            <Route strict sensitive exact path={['/:network/vault/:id', '/vault/:id']}>
              <Vault />
            </Route>
            <Route path="/dashboard">{walletAddress ? <Dashboard /> : <Welcome />}</Route>
            <Route path="/rewards">{walletAddress ? <Rewards /> : <Welcome />}</Route>
            <Route path="/debts">{walletAddress ? <Debts /> : <Welcome />}</Route>
            <Route path="/swap">
              <Swap />
            </Route>
            <Route exact path="/market">
              <Market />
            </Route>
            <Route path="/market/pools">
              <MarketPools />
            </Route>
            <Route path="/market/pool/:pair">
              <MarketPool />
            </Route>
            <Route path="/market/pool/:pair/:poolId">
              <MarketPoolProtocol />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Column>
    </ContentWrapper>
  );
};
