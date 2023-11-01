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
        </Router>
      </HelmetProvider>
    </Suspense>
  );
};
