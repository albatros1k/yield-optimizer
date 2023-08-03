import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

// import { App } from './App';
import { persistor, store } from './store';

import './i18n';
import { NewApp } from './NewApp';
import { mainTheme } from './shared/styles/theme';

const theme = mainTheme;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider {...{ theme }}>
      <PersistGate loading={null} persistor={persistor}>
        <NewApp />
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
