import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

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
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/:network/vault/:id" element={<Vault />} />
            <Route path="/vault/:id" element={<Vault />} />
            <Route path="/dashboard" element={walletAddress ? <Dashboard /> : <Welcome />} />
            <Route path="/rewards" element={walletAddress ? <Rewards /> : <Welcome />} />
            <Route path="/debts" element={walletAddress ? <Debts /> : <Welcome />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/market" element={<Market />} />
            <Route path="/market/pools" element={<MarketPools />} />
            <Route path="/market/pool/:pair" element={<MarketPool />} />
            <Route path="/market/pool/:pair/:poolId" element={<MarketPoolProtocol />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Column>
    </ContentWrapper>
  );
};
