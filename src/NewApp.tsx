// const consoleErr = console.error;
// const SUPPRESSED_WARNINGS = [
//   'Warning: React does not recognize',
//   'Warning: Received',
//   'has been externalized for browser compatibility',
//   'Encountered two children with the same key',
//   'styled-components:',
// ];

// console.error = function filterWarnings(msg, ...args) {
//   if (!SUPPRESSED_WARNINGS.some(entry => msg && msg.includes && msg.includes(entry))) {
//     consoleErr(msg, ...args);
//   }
// };

// const consoleWarn = console.warn;

// console.warn = function filterWarnings(msg, ...args) {
//   if (!SUPPRESSED_WARNINGS.some(entry => msg && msg.includes && msg.includes(entry))) {
//     consoleWarn(msg, ...args);
//   }
// };

import { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@material-ui/core';

import { Header } from './widgets/Header';
import { Sidebar } from './widgets/Sidebar';
import { Footer } from './widgets/Footer';
import { Content } from './widgets/Content';

import { Main, Wrapper } from './shared/ui/Containers';
import { GlobalStyles } from './shared/styles/global';
import { Loader } from './shared/ui/Loaders';
import { RouterListener } from './shared/lib/routerListener';

import { Router } from './components/Router';
import { DefaultMeta } from './components/Meta';
import { ScrollToTop } from './components/ScrollToTop';
import { Stepper } from './components/Stepper';

import { initHomeDataV4 } from './features/data/actions/scenarios';
import { selectWalletAddress } from './features/data/selectors/wallet';

import { CHRISTMAS_END_DAY_STORAGE_KEY, FIXED_END_DATE } from './pages/Leaderboard/lib/period';

import { store, useAppSelector } from './store';
import { checkVaults } from './config/cheker';
import { theme } from './theme';

export const NewApp = () => {
  const walletAddress = useAppSelector(selectWalletAddress);

  useEffect(() => {
    initHomeDataV4(store);
    checkVaults();

    // only for Christmas missions
    const storedEndDate = localStorage.getItem(CHRISTMAS_END_DAY_STORAGE_KEY);
    if (!storedEndDate) {
      localStorage.setItem(CHRISTMAS_END_DAY_STORAGE_KEY, FIXED_END_DATE.toISOString());
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        <Router>
          <RouterListener wallet={walletAddress}>
            <ScrollToTop />
            <DefaultMeta />
            <GlobalStyles />
            <Wrapper>
              <Header />
              <Main>
                <Sidebar />
                <Content />
              </Main>
              <Footer />
            </Wrapper>
            <ThemeProvider theme={theme}>
              <Stepper />
            </ThemeProvider>
          </RouterListener>
        </Router>
      </HelmetProvider>
    </Suspense>
  );
};
