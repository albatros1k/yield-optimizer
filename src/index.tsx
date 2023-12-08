import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import WoopraTracker from '@animalresearch/woopra-react';
import isPropValid from '@emotion/is-prop-valid';

// import { App } from './App';
import { persistor, store } from './store';

import './i18n';
import { NewApp } from './NewApp';
import { mainTheme } from './shared/styles/theme';

const theme = mainTheme;

function shouldForwardProp(propName, target) {
  if (typeof target === 'string') {
    return isPropValid(propName);
  }
  return true;
}

try {
  localStorage.setItem('uri', window.location.href);
} catch (e) {
  console.log(e);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render([
  <WoopraTracker
    key="woopra"
    config={{
      domain: import.meta.env.VITE_APP_APP_DOMAIN,
      outgoing_tracking: true,
      download_tracking: true,
      click_tracking: true,
    }}
  />,
  <StyleSheetManager key="styled-sheet" shouldForwardProp={shouldForwardProp}>
    <Provider key="redux-provider" store={store}>
      <ThemeProvider {...{ theme }}>
        <PersistGate loading={null} persistor={persistor}>
          <NewApp />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StyleSheetManager>,
]);
