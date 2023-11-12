// const consoleErr = console.error;
// const SUPPRESSED_WARNINGS = ['Warning: React does not recognize', 'Warning: Received', 'has been externalized for browser compatibility', 'Encountered two children with the same key', 'styled-components:'];

// console.error = function filterWarnings(msg, ...args) {
//    if (!SUPPRESSED_WARNINGS.some((entry) => msg && msg.includes && msg.includes(entry))) {
//     consoleErr(msg, ...args);
//    }
// };

// const consoleWarn = console.warn;

// console.warn = function filterWarnings(msg, ...args) {
//    if (!SUPPRESSED_WARNINGS.some((entry) => msg && msg.includes && msg.includes(entry))) {
//     consoleWarn(msg, ...args);
//    }
// };

import { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Header } from './widgets/Header';
import { Sidebar } from './widgets/Sidebar';
import { Footer } from './widgets/Footer';
import { Content } from './widgets/Content';

import { Main, Wrapper } from './shared/ui/Containers';
import { GlobalStyles } from './shared/styles/global';
import { Loader } from './shared/ui/Loaders';

import { Router } from './components/Router';
import { DefaultMeta } from './components/Meta';
import { ScrollToTop } from './components/ScrollToTop';

import { initHomeDataV4 } from './features/data/actions/scenarios';

import { store } from './store';
import { checkVaults } from './config/cheker';

import { Stepper } from './components/Stepper';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

export const NewApp = () => {
  useEffect(() => {
    initHomeDataV4(store);
    checkVaults();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <HelmetProvider>
        <Router>
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
        </Router>
      </HelmetProvider>
    </Suspense>
  );
};
